// redis.ts
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

/**
 * Récupère une donnée depuis Redis et la cast au type T
 * @param key Clé Redis
 * @returns Valeur de type T ou null si non trouvée
 */
export async function cacheGet<T>(key: string): Promise<T | null> {
  const data = await redis.get(key);
  return data as T | null;
}

/**
 * Stocke une valeur dans Redis, avec expiration optionnelle
 * @param key Clé Redis
 * @param value Valeur à stocker
 * @param expireInSeconds Durée en secondes avant expiration (optionnel)
 */
export async function cacheSet<T>(
  key: string,
  value: T,
  expireInSeconds?: number
): Promise<void> {
  if (expireInSeconds) {
    await redis.setex(key, expireInSeconds, value);
  } else {
    await redis.set(key, value);
  }
}

/**
 * Supprime une clé dans Redis
 * @param key Clé Redis
 */
export async function cacheDelete(key: string): Promise<void> {
  await redis.del(key);
}

export const redisClient = redis;
