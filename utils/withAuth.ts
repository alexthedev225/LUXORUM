import {
  getUserFromRequest,
  UserPayload,
} from "@/middleware/getUserFromRequest";
import { NextRequest, NextResponse } from "next/server";

export async function withAuth(
  req: NextRequest,
  handler: (req: NextRequest, user: UserPayload) => Promise<Response>
): Promise<Response> {
  const userOrResponse = await getUserFromRequest(req);

  if (
    userOrResponse instanceof NextResponse &&
    (userOrResponse.status === 401 || userOrResponse.status === 403)
  ) {
    return userOrResponse;
  }

  return handler(req, (userOrResponse as { user: UserPayload }).user);
}
