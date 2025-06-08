"use client";

import { useState, useEffect } from "react";
import type { Product, Category } from "./types";

export function useProducts(
  selectedCategoryName: string,
  categories: Category[]
) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllProducts() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/products/all");
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

        const data = await response.json();
        setAllProducts(data.products);
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }

    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (!selectedCategoryName || selectedCategoryName === "Tous") {
      setProducts(allProducts);
      return;
    }

    const found = categories.find((c) => c.name === selectedCategoryName);
    if (found) {
      setProducts(
        allProducts.filter((p) => {
          const catId =
            typeof p.category === "string"
              ? p.category
              : (p.category as Category)._id;
          return catId === found._id;
        })
      );
    } else {
      setProducts([]);
    }
  }, [selectedCategoryName, allProducts, categories]);

  return { products, loading, error };
}
