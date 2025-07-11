import { notFound } from "next/navigation";
import ProductEditForm from "./ProductEditForm";

interface Product {
  _id: string;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  category: string; // ou string | undefined selon ta data
  images?: string[] | null;
}



export default async function ProductEditPage(
  props: Promise<{ params: { id: string } }>
) {
  const { params } = await props;
  const productId = params.id;

  const res = await fetch(
    `${process.env.BASE_URL || ""}/api/products/${productId}`,
    { cache: "no-store" }
  );

  if (!res.ok) return notFound();

  const productRaw: Product = await res.json();

  const product = {
    id: productRaw._id,
    name: productRaw.name,
    description: productRaw.description,
    price: productRaw.price,
    stock: productRaw.stock,
    categoryId: productRaw.category,
    images: productRaw.images,
  };

  return <ProductEditForm product={product} />;
}
