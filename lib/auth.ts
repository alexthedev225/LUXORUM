import jwt from "jsonwebtoken";

interface JWTPayload {
  userId: string;
  role: string;
  exp?: number;
}

export async function verifyAuth(token: string): Promise<JWTPayload> {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;

    // Vérifier si le token n'est pas expiré
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      throw new Error("Token expiré");
    }

    return payload;
  } catch (error) {
    throw new Error("Token invalide");
  }
}

// Utilitaire pour extraire les informations utilisateur des headers
export function getUserFromHeader(headers: Headers) {
  const userHeader = headers.get("user");
  if (!userHeader) return null;

  try {
    return JSON.parse(userHeader);
  } catch {
    return null;
  }
}
