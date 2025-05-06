import { redisClient } from "./redis";

interface SessionData {
  userId: string;
  role: string;
  createdAt: number;
}

export async function createSession(
  userId: string,
  role: string
): Promise<string> {
  const sessionId = crypto.randomUUID();
  const sessionData: SessionData = {
    userId,
    role,
    createdAt: Date.now(),
  };

  await redisClient.setex(
    `session:${sessionId}`,
    86400,
    JSON.stringify(sessionData)
  ); // 24h
  return sessionId;
}

export async function getSession(
  sessionId: string
): Promise<SessionData | null> {
  const data = await redisClient.get(`session:${sessionId}`);
  return data ? JSON.parse(data) : null;
}

export async function destroySession(sessionId: string): Promise<void> {
  await redisClient.del(`session:${sessionId}`);
}
