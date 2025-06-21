import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

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

  return new Response(JSON.stringify({ success: sent }), {
    status: sent ? 200 : 500,
  });
}
