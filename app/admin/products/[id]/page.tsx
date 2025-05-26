// app/admin/products/[id]/page.tsx
import ProductEditForm from "./ProductEditForm";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: { _id: string; name: string };
  discount?: number;
  specifications?: any;
}

interface Params {
  id: string;
}

// Composant serveur par défaut (pas "use client")
export default async function ProductPage({ params }: { params: Params }) {
  const { id } = params;

  // Appel fetch côté serveur (avec URL absolue, adapter si besoin)
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/products/${id}`,
    {
      // Important : pour fetch côté serveur dans Next.js app router, disable cache pour données dynamiques
      cache: "no-store",
    }
  );

  if (!res.ok) {
    // Gérer erreur, tu peux faire un throw ou retourner un composant d'erreur
    throw new Error("Produit introuvable");
  }

  const product: Product = await res.json();

  // On passe les données au composant client
  return <ProductEditForm initialProduct={product} productId={id} />;
}
