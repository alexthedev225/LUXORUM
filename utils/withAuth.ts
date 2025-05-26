import {
  getUserFromRequest,
  UserPayload,
} from "@/middleware/getUserFromRequest";
import { NextResponse } from "next/server";

export async function withAuth(
  req: Request,
  handler: (req: Request, user: UserPayload) => Promise<Response>
): Promise<Response> {
  const userOrResponse = await getUserFromRequest(req as any);

  if (
    userOrResponse instanceof NextResponse &&
    (userOrResponse.status === 401 || userOrResponse.status === 403)
  ) {
    // Renvoyer la réponse 401/403 directement si pas authentifié
    return userOrResponse;
  }

  // user est bien présent, on appelle le handler avec l'user injecté
  return handler(req, (userOrResponse as { user: UserPayload }).user);
}
