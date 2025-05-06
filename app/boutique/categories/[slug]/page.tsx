import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ProductGrid } from "@/components/sections/boutique/ProductGrid";

// Types
type Category = {
  name: string;
  description: string;
  slug: string;
  position: string;
  longDescription: string;
  imageHero?: string;
};

// Liste des catégories
const categories: Category[] = [
  {
    name: "Montres",
    description: "Chronographes & Automatiques",
    slug: "montres",
    position: "Collection Horlogerie",
    longDescription:
      "Notre collection de montres de luxe allie tradition horlogère et innovation technique...",
    imageHero: "/categories/montres-hero.jpg",
  },
  {
    name: "Colliers",
    description: "Chaînes & Pendentifs",
    slug: "colliers",
    position: "Collection Prestige",
    longDescription: "Une collection raffinée de colliers pour homme...",
    imageHero: "/categories/colliers-hero.jpg",
  },
  {
    name: "Bagues",
    description: "Chevalières & Alliances",
    slug: "bagues",
    position: "Collection Exclusive",
    longDescription:
      "Des bagues d'exception qui célèbrent l'art de la joaillerie masculine...",
    imageHero: "/categories/bagues-hero.jpg",
  },
  {
    name: "Bracelets",
    description: "Joncs & Mailles",
    slug: "bracelets",
    position: "Collection Signature",
    longDescription:
      "Une sélection de bracelets qui incarnent l'élégance masculine moderne...",
    imageHero: "/categories/bracelets-hero.jpg",
  },
  {
    name: "Accessoires",
    description: "Pièces Uniques",
    slug: "accessoires",
    position: "Collection Privée",
    longDescription:
      "Des accessoires de luxe qui complètent votre style avec distinction. Boutons de manchette, pinces à cravate et autres raffinements, chaque pièce est un témoignage de notre savoir-faire.",
    imageHero: "/categories/accessoires-hero.jpg",
  },
];

// Props du composant
type Props = {
  params: { slug: string };
};

// Génération des métadonnées
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categories.find((cat) => cat.slug === params.slug);

  if (!category) {
    return {
      title: "Catégorie non trouvée | LUXORUM",
    };
  }

  return {
    title: `${category.name} - ${category.position} | LUXORUM`,
    description: category.description,
  };
}

// Composant principal
export default function CategoryPage({ params }: Props) {
  const category = categories.find((cat) => cat.slug === params.slug);

  if (!category) {
    notFound();
  }

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

      {/* Grille de produits filtrée par catégorie */}
      <section className="container mx-auto px-6">
        <ProductGrid defaultCategory={category.name} />
      </section>
    </div>
  );
}
