import { NextResponse } from "next/server";
import connect from "@/lib/mongoose";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validations/auth"; // Zod schema pour login
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { verifyRecaptchaToken } from "@/lib/recaptcha";
import { validateCsrfToken } from "@/lib/csrf";
import * as jose from "jose";

import User from "@/models/User";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "10 m"),
});

export async function POST(req: Request) {
  try {
    await connect();

    // 1. Limitation de tentative par IP + User-Agent
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

    // 2. Vérification CSRF
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

    // 3. Lecture du corps + vérif reCAPTCHA
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

    // 4. Validation Zod du login
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return NextResponse.json({ errors }, { status: 400 });
    }

    const { email, password } = result.data;

    // 5. Recherche utilisateur
    const user = await User.findOne({ email: email.toLowerCase() }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: "Identifiants invalides" },
        { status: 401 }
      );
    }

    // 6. Vérification du secret JWT
    if (!process.env.JWT_SECRET) {
      throw new Error(
        "JWT_SECRET non défini dans les variables d'environnement"
      );
    }

    // 7. Création du JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new jose.SignJWT({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret);

    // 8. Création de la réponse avec cookie sécurisé
    const response = NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 heures
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Erreur de connexion :", error);
    return NextResponse.json(
      { message: "Erreur lors de la connexion" },
      { status: 500 }
    );
  }
}
