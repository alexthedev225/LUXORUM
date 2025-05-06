import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function cacheGet<T>(key: string): Promise<T | null> {
  const data = await redis.get(key);
  return data as T;
}

export async function cacheSet(
  key: string,
  value: any,
  expireInSeconds?: number
) {
  if (expireInSeconds) {
    return redis.setex(key, expireInSeconds, value);
  }
  return redis.set(key, value);
}

export async function cacheDelete(key: string) {
  return redis.del(key);
}

export const redisClient = redis;
