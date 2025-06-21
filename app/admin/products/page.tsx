// app/admin/products/page.tsx
import ProductsClient from "./components/ProductsClient";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: number;
  category?: { id: number; name: string };
  discount?: number;
  createdAt: string;
  updatedAt: string;
};

const PRODUCTS_PER_PAGE = 6;

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const search = searchParams.search || "";

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/products?page=${page}&limit=${PRODUCTS_PER_PAGE}&search=${encodeURIComponent(
      search
    )}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Erreur récupération produits");
  }

  const data = await res.json();

  const products: Product[] = Array.isArray(data.products) ? data.products : [];

  return (
    <ProductsClient
      products={products}
      totalFiltered={data.pagination.total}
      currentPage={data.pagination.current}
      totalPages={data.pagination.pages}
      searchTerm={search}
    />
  );
}
