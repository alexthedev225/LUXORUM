import { ProductDetails } from "@/components/sections/boutique/ProductDetails";
import { products } from "@/data/products";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export function generateMetadata({ params }: Props) {
  const product = products.find((p) => p.id === parseInt(params.id));
  if (!product) return { title: "Produit non trouvé | LUXORUM" };

  return {
    title: `${product.name} | LUXORUM`,
    description: product.description,
  };
}

export default function ProductPage({ params }: Props) {
  const product = products.find((p) => p.id === parseInt(params.id));
  if (!product) return notFound();

  return <ProductDetails product={product} />;
}
