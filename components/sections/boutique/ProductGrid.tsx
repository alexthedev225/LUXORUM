"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Grid3X3, List, Search } from "lucide-react";
import CategoryButton from "./ CategoryButton";
import ProductCard from "./ProductCard";

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

interface Category {
  _id: string;
  name: string;
}

interface ProductGridProps {
  categories: Category[];
  allProducts: Product[];
  defaultCategory?: string;
  showCategoryButtons?: boolean;
  productCardVariant?: "boutique" | "categorie"; // <-- ajouté
}


const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
        ease: [0.4, 0, 0.6, 1],
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.92,
      filter: "blur(8px)",
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        filter: { duration: 0.6 },
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      filter: "blur(4px)",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.6, 1],
      },
    },
  },
  categoryButton: {
    hidden: { opacity: 0, y: -30, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  },
  header: {
    hidden: { opacity: 0, y: -50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
  glowOrb: {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
  countBadge: {
    hidden: { scale: 0, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.2,
      },
    },
  },
};

export function ProductGrid({
  categories,
  allProducts,
  defaultCategory = "Tous",
  showCategoryButtons = true,
  productCardVariant = "boutique", // valeur par défaut
}: ProductGridProps) {

  const [selectedCategory, setSelectedCategory] =
    useState<string>(defaultCategory);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Ajout de "Tous" comme avant
  const categoriesWithAll = useMemo(() => {
    if (!Array.isArray(categories) || categories.length === 0) {
      return [{ _id: "all", name: "Tous" }];
    }

    if (!categories.some((c) => c.name === "Tous")) {
      return [{ _id: "all", name: "Tous" }, ...categories];
    }

    return categories;
  }, [categories]);

 useEffect(() => {
   if (categoriesWithAll.length > 0) {
     // Si defaultCategory est dans la liste, on le met, sinon on met "Tous"
     const defaultExists = categoriesWithAll.some(
       (c) => c.name === defaultCategory
     );
     setSelectedCategory(defaultExists ? defaultCategory : "Tous");
   }
 }, [categoriesWithAll, defaultCategory]);


  const filteredProducts = useMemo(() => {
    if (selectedCategory === "Tous") return allProducts;

    return allProducts.filter((p) => {
      const categoryName =
        typeof p.category === "string" ? p.category : p.category?.name;

return categoryName?.toLowerCase() === selectedCategory.toLowerCase();
    });
  }, [selectedCategory, allProducts]);

console.log("Selected Category:", selectedCategory);
console.log("Filtered Products:", filteredProducts);

  const handleCategoryChange = async (category: string) => {
    if (category === selectedCategory) return;

    setIsTransitioning(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    setSelectedCategory(category);
    setIsTransitioning(false);
  };

  return (
    <div className=" relative overflow-hidden rounded-2xl">
      {/* Fond principal avec dégradés et textures */}
      <div className="absolute inset-0 bg-black" />

      {/* Orbes lumineux décoratifs */}
      <motion.div
        className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-t from-amber-400/5 to-transparent rounded-full blur-3xl"
        variants={ANIMATION_VARIANTS.glowOrb}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-t from-amber-400/3 to-transparent rounded-full blur-3xl"
        variants={ANIMATION_VARIANTS.glowOrb}
        animate="animate"
        style={{ animationDelay: "2s" }}
      />

      {/* Texture pointillée overlay */}
      {showCategoryButtons && (
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[length:60px_60px] opacity-20" />
      )}

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {showCategoryButtons ? (
          <>
            {/* En-tête avec catégories et contrôles */}
            <motion.div
              className="mb-16"
              initial="hidden"
              animate="show"
              variants={ANIMATION_VARIANTS.header}
            >
              {/* Titre principal avec icône */}
              <div className="text-center mb-12">
                <motion.div
                  className="inline-flex items-center gap-3 mb-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Sparkles className="text-amber-300 w-8 h-8" />
                  <h2 className="cinzel-decorative-black text-4xl sm:text-5xl font-serif bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text">
                    Collection Exclusive
                  </h2>
                  <Sparkles className="text-amber-300 w-8 h-8" />
                </motion.div>

                <p className="text-zinc-400/90 font-light tracking-[0.2em] text-sm sm:text-base mb-8">
                  Découvrez nos créations d'exception
                </p>

                {/* Compteur de produits avec badge animé */}
                <motion.div
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20 rounded-full px-6 py-3"
                  variants={ANIMATION_VARIANTS.countBadge}
                  initial="hidden"
                  animate="show"
                >
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  <span className="text-xs text-amber-300/90 tracking-[0.3em] font-medium">
                    {filteredProducts.length} CRÉATION
                    {filteredProducts.length > 1 ? "S" : ""}
                  </span>
                </motion.div>
              </div>

              {/* Contrôles de vue */}
              <div className="flex justify-center mb-8">
                <div className="bg-black/80 border border-zinc-800/50 rounded-full p-1.5 backdrop-blur-sm">
                  <div className="flex gap-1">
                    <motion.button
                      onClick={() => setViewMode("grid")}
                      className={`p-3 rounded-full transition-all duration-300 ${
                        viewMode === "grid"
                          ? "bg-amber-500 text-black shadow-lg shadow-amber-500/25"
                          : "text-zinc-400 hover:text-amber-300 hover:bg-zinc-800/50"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => setViewMode("list")}
                      className={`p-3 rounded-full transition-all duration-300 ${
                        viewMode === "list"
                          ? "bg-amber-500 text-black shadow-lg shadow-amber-500/25"
                          : "text-zinc-400 hover:text-amber-300 hover:bg-zinc-800/50"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <List className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Boutons de catégories */}
              <motion.div
                className="flex justify-center"
                variants={ANIMATION_VARIANTS.container}
                initial="hidden"
                animate="show"
              >
                <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
                  {categoriesWithAll.map((cat, index) => (
                    <motion.div
                      key={cat._id}
                      variants={ANIMATION_VARIANTS.categoryButton}
                      custom={index}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <CategoryButton
                        category={cat.name}
                        isSelected={selectedCategory === cat.name}
                        onClick={handleCategoryChange}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        ) : (
          <>
            {/* Version simplifiée sans catégories */}
            <motion.div
              className="mb-16 text-center"
              variants={ANIMATION_VARIANTS.header}
              initial="hidden"
              animate="show"
            >
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent" />
                <h2 className="text-4xl sm:text-5xl font-bold  bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text font-serif cinzel-decorative-black">
                  Notre sélection raffinée
                </h2>
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent" />
              </div>
              <p className="text-zinc-400/90 max-w-2xl mx-auto font-light tracking-[0.1em] text-base sm:text-lg">
                Découvrez une expérience épurée, concentrée sur l'essentiel de
                nos créations d'exception.
              </p>
            </motion.div>
          </>
        )}

        {/* Message d'état vide */}
        <AnimatePresence mode="wait">
          {Array.isArray(filteredProducts) && filteredProducts.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-zinc-800/50 rounded-2xl p-12 inline-block backdrop-blur-sm">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-amber-400/10 to-amber-600/5 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-amber-300/60" />
                </div>
                <p className="text-zinc-400/90 font-light tracking-wider text-lg mb-2">
                  Aucun produit trouvé
                </p>
                <p className="text-zinc-500/90 text-sm tracking-[0.1em]">
                  Essayez une autre catégorie pour découvrir nos créations
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grille de produits */}
        <AnimatePresence mode="wait">
          {Array.isArray(filteredProducts) &&
            filteredProducts.length > 0 &&
            !isTransitioning && (
              <motion.div
                key={`${selectedCategory}-${viewMode}`}
                className={`gap-8 ${
                  showCategoryButtons
                    ? viewMode === "grid"
                      ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                      : "grid grid-cols-1 max-w-4xl mx-auto"
                    : "grid grid-cols-1 max-w-4xl mx-auto"
                }`}
                variants={ANIMATION_VARIANTS.container}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    variants={ANIMATION_VARIANTS.item}
                    custom={index}
                    layout
                    whileHover={{ y: -4 }}
                    transition={{
                      layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                      y: { type: "spring", stiffness: 300, damping: 30 },
                    }}
                  >
                    <ProductCard
                      product={product}
                      variant={productCardVariant}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
        </AnimatePresence>

        {/* Indicateur de transition */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/30 rounded-2xl p-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                  <span className="text-amber-300/90 font-light tracking-[0.2em]">
                    CHARGEMENT...
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
