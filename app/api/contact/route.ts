// app/api/contact/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const data = await resend.emails.send({
      from: "Luxorum Contact <onboarding@resend.dev>",
      to: "bekanticode@gmail.com", // Change-le par ton adresse
      subject: `Nouveau message de ${name}`,
      reply_to: email,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Erreur Resend:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
