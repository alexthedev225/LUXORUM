// middleware/getUserFromRequest.ts

import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const SECRET = process.env.JWT_SECRET!;
if (!SECRET) throw new Error("JWT_SECRET must be defined");

export interface UserPayload {
  userId: string;
  email?: string;
  role?: string;
}

export async function getUserFromRequest(
  req: NextRequest
): Promise<{ user: UserPayload } | NextResponse> {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Token manquant" }, { status: 401 });
    }

    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(SECRET)
    );

    // Ici on suppose que payload contient les champs attendus
    const userPayload: UserPayload = {
      userId: payload.userId as string,
      email: payload.email as string | undefined,
      role: payload.role as string | undefined,
    };

    return { user: userPayload };
  } catch (error) {
    console.error("Erreur de vérification du token :", error);
    return NextResponse.json(
      { message: "Token invalide ou expiré" },
      { status: 401 }
    );
  }
}
