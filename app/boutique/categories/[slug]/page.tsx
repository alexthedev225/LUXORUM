import { notFound } from "next/navigation";
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
  return data.products;
}

export default async function CategoryPage({ params }: Props) {
  function slugify(str: string) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  const categories = await fetchCategories();
  const category = categories.find((cat) => slugify(cat.name) === params.slug);

  if (!category) notFound();

  const allProducts = await fetchAllProducts();

  return (
    <div className="min-h-screen  mb-2">
      <section className="py-16 flex flex-col items-center text-center px-6 bg-gradient-to-b from-black via-zinc-950 to-black rounded-2xl">
        <span className="inline-block px-6 py-2 text-xs tracking-[0.3em] uppercase text-amber-300/90 border border-amber-400/20 rounded-full bg-black/80 backdrop-blur-sm">
          {category.position}
        </span>

        <h1 className="cinzel-decorative-black text-5xl md:text-6xl leading-tight bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent mt-6">
          {category.name}
        </h1>

        <p className="text-xl text-zinc-300/90 font-light max-w-3xl mt-4">
          {category.description}
        </p>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent my-6" />

        <div className="bg-black/40 rounded-2xl border border-zinc-800/50 p-8 max-w-4xl">
          <p className="text-lg text-zinc-300/90">{category.longDescription}</p>
        </div>
      </section>

      <section className="py-2">
        <ProductGrid
          categories={categories}
          allProducts={allProducts}
          defaultCategory={category.name}
          showCategoryButtons={false}
          productCardVariant="categorie"
        />
      </section>

   
    </div>
  );
}
