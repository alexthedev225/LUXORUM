// /hooks/useCategories.ts
import { useState, useEffect } from "react";

export interface Category {
  _id: string;
  name: string;
}

// Cache simple côté module pour éviter rechargements inutiles
let cachedCategories: Category[] | null = null;

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(
    cachedCategories ?? []
  );
  const [loading, setLoading] = useState(!cachedCategories);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedCategories) return;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        const data: Category[] = await res.json();
        cachedCategories = data;
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { categories, loading, error };
}
