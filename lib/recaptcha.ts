export async function verifyRecaptchaToken(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    throw new Error("La clé secrète reCAPTCHA n’est pas définie");
  }

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${encodeURIComponent(
          secretKey
        )}&response=${encodeURIComponent(token)}`,
      }
    );

    const data = await response.json();
    return data.success && data.score && data.score >= 0.5;
  } catch (error) {
    console.error("Erreur reCAPTCHA:", error);
    return false;
  }
}
