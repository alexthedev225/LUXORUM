"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
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
  showCategoryButtons?: boolean; // <-- nouveau prop
}


const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  },
  categoryButton: {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

export function ProductGrid({
  categories,
  allProducts,
  defaultCategory = "Tous",
  showCategoryButtons,
}: ProductGridProps) {
  // Ajoute la catégorie "Tous" si elle n'existe pas déjà
  const categoriesWithAll = useMemo(() => {
    if (!Array.isArray(categories) || categories.length === 0) {
      return [{ _id: "all", name: "Tous" }];
    }

    if (!categories.some((c) => c.name === "Tous")) {
      return [{ _id: "all", name: "Tous" }, ...categories];
    }

    return categories;
  }, [categories]);

  const [selectedCategory, setSelectedCategory] =
    useState<string>(defaultCategory);

  // Sync selectedCategory avec defaultCategory si celui-ci change et existe
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

  // Filtrer les produits selon la catégorie sélectionnée
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "Tous") return allProducts;

    const cat = categoriesWithAll.find((c) => c.name === selectedCategory);
    if (!cat) return [];

    return allProducts.filter((p) => {
      const catId =
        typeof p.category === "string" ? p.category : p.category._id;
      return catId === cat._id;
    });
  }, [selectedCategory, allProducts, categoriesWithAll]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden rounded-2xl">
      {/* Fond décoratif */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[length:60px_60px] opacity-20" />

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        {/* Catégories */}
        {showCategoryButtons !== false && (
          <motion.div
            className="mb-16"
            initial="hidden"
            animate="show"
            variants={ANIMATION_VARIANTS.container}
          >
            <div className="text-center mb-12">
              <h2 className="cinzel-decorative-black text-4xl font-serif bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text mb-4">
                Collection Exclusive
              </h2>
              <p className="text-zinc-400/90 font-light tracking-wider">
                Découvrez nos créations d'exception
              </p>
            </div>

            <div className="flex justify-center flex-wrap gap-6">
              {categoriesWithAll.map((cat) => (
                <motion.div
                  key={cat._id}
                  variants={ANIMATION_VARIANTS.categoryButton}
                >
                  <CategoryButton
                    category={cat.name}
                    isSelected={selectedCategory === cat.name}
                    onClick={setSelectedCategory}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Message quand aucun produit */}
        {Array.isArray(filteredProducts) && filteredProducts.length === 0 && (
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
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 && (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12"
            variants={ANIMATION_VARIANTS.container}
            initial="hidden"
            animate="show"
          >
            {filteredProducts.map((product) => (
              <motion.div key={product._id} variants={ANIMATION_VARIANTS.item}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
