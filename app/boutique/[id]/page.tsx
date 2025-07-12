import { ProductDetails } from "@/components/sections/boutique/ProductDetails";
import { notFound } from "next/navigation";


type Params = Promise<{ id: string }>;

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;

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

export default async function ProductPage(props: { params: Params }) {
  const params = await props.params;
  const res = await fetch(`${BASE_URL}/api/products/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const product = await res.json();

  return <ProductDetails product={product} />;
}
