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



export default async function ProductEditPage({ params }: { params: { id: string } }) {
  const productId = await params.id;

  // Appel à ton API locale
  const res = await fetch(
    `${process.env.BASE_URL || ""}/api/products/${productId}`,
    {
      cache: "no-store", // désactive cache pour données à jour
    }
  );

  if (!res.ok) {
    return notFound();
  }

  const productRaw: Product = await res.json();

  // Si tu veux adapter le format, fais-le ici
  const product = {
    id: productRaw._id,
    name: productRaw.name,
    description: productRaw.description,
    price: productRaw.price,
    stock: productRaw.stock,
    categoryId: productRaw.category, // adapte selon champ category réel
    images: productRaw.images,
  };

  return <ProductEditForm product={product} />;
}
