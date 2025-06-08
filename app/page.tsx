import { HeroSection } from "@/components/sections/HeroSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { PromoBanner } from "@/components/sections/PromoBanner";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { AboutSection } from "@/components/sections/AboutSection";

type Product = {
  id: string | number;
  name: string;
  price: number;
  description: string;
  image: string;
  tag?: string;
  category: string;
  specifications: {
    collection: string;
    additionalDetails?: string[];
  };
  stats: Record<string, number>;
};

// Fonction utilitaire pour récupérer les produits côté serveur
async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/products/all`,
    {
      // Important: revalidate à 0 pour ne pas cacher la donnée (sinon Next.js fait un cache statique)
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des produits");
  }

  const data = await res.json();

  console.log("[fetchProducts] Données reçues depuis /api/products/all :", data);

  const products = data.products; // ou data.items selon ta réponse
  return products;
}


export default async function Home() {
  let products: Product[] = [];
  try {
    products = await fetchProducts();

    // Trier par id décroissant (les derniers produits)
    products = products.sort((a, b) => Number(b.id) - Number(a.id)).slice(0, 3);
  } catch (error) {
    console.error(error);
    // tu peux gérer une fallback UI ici si besoin
  }

  return (
    <main className="space-y-2">
      <div className="flex flex-col gap-2 mb-2">
        <HeroSection />
        <FeaturedProducts products={products} />
        <CategoriesSection />
        <AboutSection />
        <PromoBanner />
      </div>
    </main>
  );
}
