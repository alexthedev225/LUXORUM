import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
  from = 'Luxorum <noreply@luxorum.com>'
}: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return false;
  }
}

// Fonction utilitaire pour tester l'envoi
export async function testEmailService() {
  return sendEmail({
    to: 'test@example.com',
    subject: 'Test Email Service',
    html: '<h1>Test Email</h1><p>Si vous voyez cet email, le service fonctionne !</p>'
  });
}
