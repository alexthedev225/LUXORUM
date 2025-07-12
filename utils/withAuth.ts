import {
  getUserFromRequest,
  UserPayload,
} from "@/middleware/getUserFromRequest";
import { NextRequest, NextResponse } from "next/server";

type Handler = (
  req: NextRequest,
  user: UserPayload
) => Promise<Response | NextResponse>;

export async function withAuth(
  req: NextRequest,
  handler: Handler
): Promise<Response | NextResponse> {
  const userOrResponse = await getUserFromRequest(req);

  if (
    userOrResponse instanceof NextResponse &&
    (userOrResponse.status === 401 || userOrResponse.status === 403)
  ) {
    return userOrResponse;
  }

  // On est sûr que c’est un objet avec { user: UserPayload }
  const user = (userOrResponse as { user: UserPayload }).user;

  return handler(req, user);
}
