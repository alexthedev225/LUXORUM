import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createSession } from "@/lib/session";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.email || !data.password) {
      return NextResponse.json(
        { error: "Données manquantes: email et password sont requis" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: data.email },
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
        role: true,
      },
    });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      );
    }

    const sessionId = await createSession(user.id, user.role);

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });

    response.cookies.set("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 24 heures
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la connexion" },
      { status: 500 }
    );
  }
}
