import { ProductDetails } from "@/components/sections/boutique/ProductDetails";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function generateMetadata({ params }: Props) {
  const res = await fetch(`${BASE_URL}/api/products/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return { title: "Produit non trouvé | LUXORUM" };
  }

  const product = await res.json();

  return {
    title: `${product.name} | LUXORUM`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const res = await fetch(`${BASE_URL}/api/products/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const product = await res.json();

  return <ProductDetails product={product} />;
}
