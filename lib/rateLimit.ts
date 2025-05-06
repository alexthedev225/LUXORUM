import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requêtes par 10 secondes
});

export async function checkRateLimit(identifier: string) {
  const { success, limit, reset, remaining } = await rateLimiter.limit(
    identifier
  );
  return { success, limit, reset, remaining };
}
