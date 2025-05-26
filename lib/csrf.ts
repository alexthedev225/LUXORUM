import { randomBytes } from "crypto";

export function generateCsrfToken(): string {
  return randomBytes(32).toString("hex");
}

export function validateCsrfToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false;
  return token === storedToken;
}

// Ajouter une fonction pour obtenir le token des cookies
export function getCsrfToken(): string {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrf-token="))
      ?.split("=")[1] || ""
  );
}
