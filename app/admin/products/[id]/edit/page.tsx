// /app/admin/products/[id]/edit/page.tsx
import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { notFound } from "next/navigation";
import ProductEditForm from "./ProductEditForm";

interface ProductEditPageProps {
  params: { id: string };
}

export default async function ProductEditPage({
  params,
}: ProductEditPageProps) {
  const productId = Number(params.id);
  if (isNaN(productId)) return notFound();

  const productRaw = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!productRaw) return notFound();

  // Conversion manuelle avec typage strict
  const product = {
    id: productRaw.id,
    name: productRaw.name,
    description: productRaw.description,
    price:
      productRaw.price instanceof Decimal
        ? productRaw.price.toNumber()
        : Number(productRaw.price),
    stock: productRaw.stock,
    categoryId: productRaw.categoryId,
    images: productRaw.images,
  };

  return <ProductEditForm product={product} />;
}
