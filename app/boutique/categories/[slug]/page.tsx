import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ProductGrid } from "@/components/sections/boutique/ProductGrid";

// Types
type Category = {
  _id: string;
  name: string;
  description: string;
  slug: string;
  position: string;
  longDescription: string;
};

type Product = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  images: string[];
  category: Category | string;
};

type Props = {
  params: { slug: string };
};



// Fetch dynamique des catégories
async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Erreur chargement catégories");
  return res.json();
}
async function fetchAllProducts(): Promise<Product[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/all`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Erreur chargement produits");

  const data = await res.json();
  console.log("fetchAllProducts data:", data); // pour debug

  return data.products; // <-- ici on retourne le tableau !
}


export default async function CategoryPage({ params }: Props) {
  console.log("CategoryPage params.slug:", params.slug);

  function slugify(str: string) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // Récupère les catégories depuis l'API
  const categories = await fetchCategories();
  console.log("categories:", categories);

  // Recherche la catégorie dont le nom slugifié correspond au paramètre slug
  const category = categories.find((cat) => {
    const slugifiedName = slugify(cat.name);
    console.log(
      "Comparaison slug:",
      slugifiedName,
      "avec params.slug:",
      params.slug
    );
    return slugifiedName === params.slug;
  });

  if (!category) notFound();

  const allProducts = await fetchAllProducts();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative py-32 bg-black rounded-2xl overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <span className="block text-xs tracking-[0.3em] uppercase text-amber-200/70">
              {category.position}
            </span>

            <h1 className="cinzel-decorative-black text-4xl md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
                {category.name}
              </span>
            </h1>

            <p className="text-lg text-zinc-400 font-light max-w-2xl mx-auto">
              {category.description}
            </p>

            <div className="mt-12 pt-12 border-t border-zinc-800/50">
              <p className="text-zinc-300 leading-relaxed">
                {category.longDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ProductGrid reçoit tout, il filtre côté client */}
      <section className="container mx-auto px-6">
        <ProductGrid
          categories={categories}
          allProducts={allProducts}
          defaultCategory={category.name}
          showCategoryButtons={false} // Affiche les boutons de catégorie
        />
      </section>
    </div>
  );
}
