import { NextResponse } from "next/server";
import connect from "@/lib/mongoose";  // ta connexion Mongoose
import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/validations/auth";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { verifyRecaptchaToken } from "@/lib/recaptcha";
import { validateCsrfToken } from "@/lib/csrf";

import User from "@/models/User"; // <-- Import Mongoose model

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "10 m"),
});

export async function POST(req: Request) {
  try {
    await connect(); 
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const userAgent = req.headers.get("user-agent") ?? "unknown";
    const key = `${ip}-${userAgent}`;

    const { success, reset } = await ratelimit.limit(key);
    if (!success) {
      return NextResponse.json(
        { message: "Trop de tentatives, réessayez plus tard", reset },
        { status: 429 }
      );
    }

    const csrfTokenFromHeader = req.headers.get("x-csrf-token");
    const csrfTokenFromCookie = req.headers
      .get("cookie")
      ?.split("; ")
      .find((c) => c.startsWith("csrf-token="))
      ?.split("=")[1];

    if (!csrfTokenFromHeader || !csrfTokenFromCookie) {
      return NextResponse.json(
        { message: "Token CSRF manquant" },
        { status: 403 }
      );
    }

    if (!validateCsrfToken(csrfTokenFromHeader, csrfTokenFromCookie)) {
      return NextResponse.json(
        { message: "Token CSRF invalide" },
        { status: 403 }
      );
    }

    const body = await req.json();

    if (!body.recaptchaToken) {
      return NextResponse.json(
        { message: "Token reCAPTCHA manquant" },
        { status: 400 }
      );
    }
    const isHuman = await verifyRecaptchaToken(body.recaptchaToken);
    if (!isHuman) {
      return NextResponse.json(
        { message: "reCAPTCHA invalide ou suspect" },
        { status: 403 }
      );
    }

    const result = registerSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return NextResponse.json({ errors }, { status: 400 });
    }

    const { email, username, password, firstName, lastName } = result.data;

    // Vérification des doublons avec Mongoose
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
      ],
    }).exec();

    if (existingUser) {
      return NextResponse.json(
        { message: "Un compte avec ces informations existe déjà." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: hashedPassword,
      firstName: firstName || null,
      lastName: lastName || null,
    });

    await newUser.save();

    return NextResponse.json(
      {
        message: "Compte créé avec succès",
        user: {
          id: newUser._id,
          email: newUser.email,
          username: newUser.username,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Erreur lors de l'inscription" },
      { status: 500 }
    );
  }
}
