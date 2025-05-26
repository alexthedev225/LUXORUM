"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Eye, Star, ShoppingBag, Zap } from "lucide-react";

interface ProductCategory {
  _id: string;
  name: string;
}

interface ProductSpecifications {
  materials?: string;
  finish?: string;
  certificate?: string;
  additionalDetails?: string[];
}

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  images: string[];
  category: ProductCategory | string;
  specifications?: ProductSpecifications;
}

interface ApiResponse {
  products: Product[];
  pagination: {
    total: number;
    pages: number;
    current: number;
    limit: number;
    hasMore: boolean;
  };
}

interface Category {
  _id: string;
  name: string;
}

interface ProductGridProps {
  defaultCategory?: string;
}

// Animation variants
const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
  categoryButton: {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
} as const;

function imageUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  if (path.startsWith("http") || path.startsWith("//")) return path;
  return baseUrl + path;
}


// Hook pour récupérer les catégories dynamiquement
function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

// Hook pour récupérer les produits selon catégorie (envoie l'_id de la catégorie au backend)
function useProducts(selectedCategoryName: string, categories: Category[]) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Trouver l'_id de la catégorie à partir du nom
      let categoryId = "";
      if (selectedCategoryName && selectedCategoryName !== "Tous") {
        const found = categories.find((c) => c.name === selectedCategoryName);
        if (found) categoryId = found._id;
      }

      // Construire la query string avec category=_id
      const categoryParam = categoryId
        ? `&category=${encodeURIComponent(categoryId)}`
        : "";

      const response = await fetch(
        `/api/products?page=1&limit=20${categoryParam}`
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? `Erreur: ${err.message}`
          : "Impossible de récupérer les produits.";

      setError(errorMessage);
      console.error("Erreur lors du chargement des produits:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategoryName, categories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

// Bouton catégorie
interface CategoryButtonProps {
  category: string;
  isSelected: boolean;
  onClick: (category: string) => void;
}

function CategoryButton({
  category,
  isSelected,
  onClick,
}: CategoryButtonProps) {
  return (
    <motion.button
      variants={ANIMATION_VARIANTS.categoryButton}
      onClick={() => onClick(category)}
      className={`group relative px-8 py-4 text-sm tracking-[0.3em] uppercase rounded-2xl 
        transition-all duration-700 overflow-hidden cursor-pointer backdrop-blur-sm
        border transition-colors ${
          isSelected
            ? "text-amber-300/90 border-amber-400/30 bg-gradient-to-br from-zinc-900 via-black to-zinc-900"
            : "text-zinc-400/90 border-zinc-800/50 bg-black/60 hover:text-amber-200/80 hover:border-amber-400/20"
        }`}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      whileTap={{ scale: 0.95 }}
      aria-pressed={isSelected}
      aria-label={`Filtrer par ${category}`}
    >
      {/* Overlay décoratif */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[length:20px_20px] opacity-40" />

      {isSelected && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent"
            layoutId="activeCategoryGlow"
            transition={{
              type: "spring",
              bounce: 0.15,
              duration: 0.8,
            }}
          />
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-amber-400/10 via-amber-400/5 to-amber-400/10 rounded-2xl blur-sm"
            layoutId="activeCategoryBorder"
            transition={{
              type: "spring",
              bounce: 0.15,
              duration: 0.8,
            }}
          />
        </>
      )}

      <span className="relative z-10 font-light">{category}</span>

      {/* Effet hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-400/0 to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.button>
  );
}

// Composant ProductImage avec overlay luxueux
function ProductImage({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 w-full h-full flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[length:30px_30px] opacity-20" />
        <span className="text-zinc-400/90 text-sm font-light tracking-wider relative z-10">
          Aucune image
        </span>
      </div>
    );
  }
  const fullSrc = imageUrl(src);
  console.log("Chargement de l'image:", fullSrc);

  return (
    <div className="relative overflow-hidden group/image">
      <Image
        src={fullSrc}
        alt={alt}
        fill
        className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {/* Overlay principal */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

      {/* Lueur dorée en hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Overlay décoratif */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[length:25px_25px] opacity-30" />

      {/* Icône hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
        <div className="bg-black/80 backdrop-blur-sm border border-amber-400/20 rounded-full p-4">
          <Eye className="w-6 h-6 text-amber-300/90" />
        </div>
      </div>
    </div>
  );
}

// Composant ProductSpecs amélioré
function ProductSpecs({
  specifications,
}: {
  specifications: ProductSpecifications;
}) {
  const specs = [
    { label: "Matériaux", value: specifications.materials, icon: Star },
    { label: "Finition", value: specifications.finish, icon: Zap },
    {
      label: "Certificat",
      value: specifications.certificate,
      icon: ShoppingBag,
    },
  ].filter((spec) => spec.value);

  if (specs.length === 0 && !specifications.additionalDetails?.length) {
    return null;
  }

  return (
    <motion.div
      className="pt-6 border-t border-amber-400/10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <h4 className="text-xs tracking-[0.3em] text-zinc-400/90 uppercase mb-4 font-light">
        Spécifications
      </h4>
      <div className="space-y-3">
        {specs.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center group/spec">
            <div className="flex items-center min-w-0 flex-1">
              <Icon className="w-3 h-3 text-amber-300/60 mr-3 flex-shrink-0" />
              <span className="text-xs text-zinc-400/90 w-20 flex-shrink-0 font-light">
                {label}
              </span>
              <span className="text-xs text-zinc-300/90 truncate group-hover/spec:text-white/95 transition-colors duration-300">
                {value}
              </span>
            </div>
          </div>
        ))}

        {specifications.additionalDetails && (
          <div className="pt-2">
            <div className="flex flex-wrap gap-2">
              {specifications.additionalDetails.map((detail, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="inline-block rounded-lg bg-gradient-to-br from-zinc-900 via-black to-zinc-900 
                    border border-amber-400/20 px-3 py-1.5 text-[10px] text-amber-300/90 
                    tracking-wider hover:border-amber-400/30 transition-colors duration-300"
                >
                  {detail}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Composant ProductCard luxueux
function ProductCard({ product }: { product: Product }) {
  const categoryName =
    typeof product.category === "string"
      ? product.category
      : product.category.name;

      

      
  return (
    <motion.div variants={ANIMATION_VARIANTS.item} className="group">
      <Link href={`/boutique/${product._id}`} className="block">
        <article
          className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 backdrop-blur-sm 
          rounded-3xl overflow-hidden border border-zinc-800/50 transition-all duration-700 
          hover:border-amber-400/30 hover:shadow-2xl hover:shadow-amber-400/5 group-hover:scale-[1.02]"
        >
          {/* Overlay décoratif principal */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[length:40px_40px] opacity-30" />

          {/* Lueur d'ambiance */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-400/0 via-amber-400/2 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl">
              {product.images && product.images.length > 0 ? (
                <div className="relative w-full h-full group">
                  {/* Image principale */}
                  <Image
                    src={imageUrl(product.images[0])}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />

                  {/* Overlay noir semi-transparent */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700 z-10" />

                  {/* Lueur dorée hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />

                  {/* Motif décoratif */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[length:25px_25px] opacity-30 z-30" />

                  {/* Icône Eye hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100 z-40">
                    <div className="bg-black/80 backdrop-blur-sm border border-amber-400/20 rounded-full p-4">
                      <Eye className="w-6 h-6 text-amber-300/90" />
                    </div>
                  </div>
                </div>
              ) : (
                // Fallback sans image
                <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 w-full h-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[length:30px_30px] opacity-20" />
                  <span className="text-zinc-400/90 text-sm font-light tracking-wider relative z-10">
                    Aucune image
                  </span>
                </div>
              )}

              {/* Badge catégorie sur l'image */}
              <div className="absolute top-4 left-4">
                <span
                  className="inline-block bg-black/80 backdrop-blur-sm border border-amber-400/20 
                  rounded-full px-4 py-2 text-[10px] tracking-[0.3em] uppercase text-amber-300/90 font-light"
                >
                  {categoryName}
                </span>
              </div>

              {/* Prix en overlay sur l'image */}
              <div className="absolute bottom-4 right-4">
                <div className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text">
                  <span className="text-xl font-light tracking-wider">
                    {product.price.toLocaleString("fr-FR")} €
                  </span>
                </div>
              </div>
            </div>

            {/* Contenu */}
            <div className="p-8 space-y-6 bg-black/40 backdrop-blur-sm">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-white/95 leading-tight group-hover:text-amber-100/95 transition-colors duration-500">
                  {product.name}
                </h3>

                {product.description && (
                  <p
                    className="text-sm text-zinc-300/90 font-light leading-relaxed line-clamp-2 
                    group-hover:text-zinc-200/95 transition-colors duration-500"
                  >
                    {product.description}
                  </p>
                )}
              </div>

              {product.specifications && (
                <ProductSpecs specifications={product.specifications} />
              )}

              {/* Indicateur d'interaction */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                <span className="text-xs tracking-[0.3em] text-zinc-400/90 uppercase font-light">
                  Voir détails
                </span>
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                  <div className="w-1 h-1 bg-amber-400/60 rounded-full animate-pulse"></div>
                  <div
                    className="w-1 h-1 bg-amber-400/40 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-amber-400/20 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bordure de lueur en hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-sm" />
        </article>
      </Link>
    </motion.div>
  );
}

// Composant principal ProductGrid
export function ProductGrid({ defaultCategory = "Tous" }: ProductGridProps) {
  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useCategories();

  // On insère "Tous" en première catégorie si pas déjà là
  const categoriesWithAll = useMemo(() => {
    const names = categories.map((c) => c.name);
    if (!names.includes("Tous")) {
      return [{ _id: "all", name: "Tous" }, ...categories];
    }
    return categories;
  }, [categories]);

  const [selectedCategory, setSelectedCategory] =
    useState<string>(defaultCategory);

  // Sync selectedCategory si la liste des catégories charge
  useEffect(() => {
    if (
      defaultCategory &&
      categoriesWithAll.find((c) => c.name === defaultCategory)
    ) {
      setSelectedCategory(defaultCategory);
    } else {
      setSelectedCategory("Tous");
    }
  }, [defaultCategory, categoriesWithAll]);

  // Chargement des produits en fonction de la catégorie sélectionnée
  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
    refetch,
  } = useProducts(selectedCategory, categoriesWithAll);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
      {/* Overlay décoratif de fond */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[length:60px_60px] opacity-20" />

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        {/* Section des catégories */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="show"
          variants={ANIMATION_VARIANTS.container}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text mb-4">
              Collection Exclusive
            </h2>
            <p className="text-zinc-400/90 font-light tracking-wider">
              Découvrez nos créations d'exception
            </p>
          </div>

          <div className="flex justify-center flex-wrap gap-6">
            {categoriesWithAll.map((cat) => (
              <CategoryButton
                key={cat._id}
                category={cat.name}
                isSelected={selectedCategory === cat.name}
                onClick={setSelectedCategory}
              />
            ))}
          </div>
        </motion.div>

        {/* États de chargement et erreurs */}
        {loadingCategories && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400/60"></div>
            <p className="text-zinc-400/90 mt-4 font-light tracking-wider">
              Chargement des catégories…
            </p>
          </div>
        )}

        {errorCategories && (
          <div className="text-center py-12">
            <p className="text-red-400/90 bg-red-900/20 border border-red-800/30 rounded-xl px-6 py-4 inline-block">
              {errorCategories}
            </p>
          </div>
        )}

        {loadingProducts && !errorProducts && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400/60 mb-6"></div>
            <p className="text-zinc-400/90 font-light tracking-wider text-lg">
              Chargement des produits…
            </p>
          </div>
        )}

        {errorProducts && (
          <div className="text-center py-12">
            <p className="text-red-400/90 bg-red-900/20 border border-red-800/30 rounded-xl px-6 py-4 inline-block">
              {errorProducts}
            </p>
          </div>
        )}

        {!loadingProducts && products.length === 0 && !errorProducts && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-zinc-800/50 rounded-2xl p-12 inline-block">
              <p className="text-zinc-400/90 font-light tracking-wider text-lg mb-2">
                Aucun produit trouvé
              </p>
              <p className="text-zinc-500/90 text-sm">
                Essayez une autre catégorie
              </p>
            </div>
          </motion.div>
        )}

        {/* Grille des produits */}
        {products.length > 0 && (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12"
            variants={ANIMATION_VARIANTS.container}
            initial="hidden"
            animate="show"
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
