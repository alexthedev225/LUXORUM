import { NextResponse } from "next/server";
import { generateCsrfToken } from "@/lib/csrf"; // ta fonction pour générer le token

export async function GET() {
  const token = generateCsrfToken();

  const res = NextResponse.json({ csrfToken: token });
  // mettre en cookie, maxAge, secure, sameSite etc selon besoin
  res.cookies.set("csrf-token", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // 1h
    path: "/",
    sameSite: "lax",
  });

  return res;
}
