import { useEffect, useState } from "react";

export type Category = {
  id: string;
  name: string;
  description?: string | null;
  slug: string;
  position: string;
  longDescription: string;
};

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading };
}
