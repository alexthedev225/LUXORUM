// ProductGridWrapper.tsx (serveur)

import { ProductGrid } from "./ProductGrid";


async function fetchCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Erreur chargement catégories");
  return res.json();
}

async function fetchProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/all`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Erreur chargement produits");
  return res.json();
}

export default async function ProductGridWrapper() {
  const categories = await fetchCategories();
  const productsData = await fetchProducts();

  return (
    <ProductGrid
      categories={categories}
      allProducts={productsData.products}
      defaultCategory="Tous"
    />
  );
}
