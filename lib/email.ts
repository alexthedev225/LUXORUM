// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Envoie un email HTML avec styling intégré (compatible production)
 */
export async function sendEmail({
  to,
  subject,
  content,
  from = "Luxorum <onboarding@resend.dev>",
}: {
  to: string;
  subject: string;
  content: string; // contenu HTML à injecter dans le template
  from?: string;
}) {
  const html = generateEmailTemplate(content);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erreur envoi email:", error);
    return false;
  }
}

/**
 * Génère le template HTML stylisé avec du contenu injecté
 */
function generateEmailTemplate(content: string): string {
  return `
    <div style="font-family: 'Segoe UI', sans-serif; background-color: #f9fafb; padding: 2rem;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background-color: #111827; padding: 1.5rem; text-align: center;">
          <h1 style="color: #facc15; font-size: 1.5rem; margin: 0;">Luxorum ✨</h1>
        </div>
        <div style="padding: 2rem;">
          ${content}
        </div>
        <div style="background-color: #f3f4f6; text-align: center; padding: 1rem;">
          <p style="font-size: 0.75rem; color: #6b7280;">© ${new Date().getFullYear()} Luxorum. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  `;
}
