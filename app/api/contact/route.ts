import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const message = formData.get("message") as string | null;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tous les champs (name, email, message) sont requis" },
        { status: 400 }
      );
    }

    const content = `
      <h2 style="font-size: 1.25rem; color: #111827;">📬 Nouveau message de contact</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Message :</strong><br>${message}</p>
    `;

    const sent = await sendEmail({
      to: "bekanticode@gmail.com",
      subject: `Contact depuis le site - ${name}`,
      content,
    });

    return NextResponse.json({ success: sent }, { status: sent ? 200 : 500 });
  } catch (error) {
    console.error("Erreur POST /contact:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
