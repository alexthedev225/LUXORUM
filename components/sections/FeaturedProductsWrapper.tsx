// FeaturedProductsWrapper.tsx
import FeaturedProductsClient from "./FeaturedProductsClient";
import { Product } from "@/data/products";

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/all`,
    {
      cache: "no-store", // Pas de cache, fetch à chaque fois
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  return data.products; // selon la forme de ta réponse API
}

export default async function FeaturedProductsWrapper() {
  const allProducts = await fetchProducts();
  // Prendre les 3 derniers produits (exemple, si triés du plus ancien au plus récent)
  const featuredProducts = allProducts.slice(-3).reverse();

  return <FeaturedProductsClient products={featuredProducts} />;
}
