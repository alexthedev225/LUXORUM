"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { products, statsLabels } from "@/data/products";

const categories = [
  "Tous",
  "Montres",
  "Colliers",
  "Bagues",
  "Bracelets",
] as const;

type ProductGridProps = {
  defaultCategory?: string;
};

export function ProductGrid({ defaultCategory = "Tous" }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof categories)[number]
  >(defaultCategory as (typeof categories)[number]);

  useEffect(() => {
    if (defaultCategory && defaultCategory !== "Tous") {
      setSelectedCategory(defaultCategory as (typeof categories)[number]);
    }
  }, [defaultCategory]);

  const filteredProducts =
    selectedCategory === "Tous"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="">
      {/* Catégories - Masquer si une catégorie par défaut est fournie */}
      {!defaultCategory || defaultCategory === "Tous" ? (
        <div className="mb-12">
          <div className="">
            {/* Titre de la section modifié */}
            <motion.div
              className="text-center mb-12 space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="cinzel-decorative-black text-3xl md:text-4xl font-light tracking-tight">
                Nos Collections
              </h2>
            </motion.div>

            {/* Container des filtres */}
            <div className="bg-black/99 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800/50 overflow-hidden">
              <div className="flex flex-wrap gap-3 justify-center min-w-0">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`relative px-6 py-3 text-sm tracking-wider rounded-xl transition-all duration-500 overflow-hidden ${
                      selectedCategory === category
                        ? "text-amber-200"
                        : "text-zinc-400 hover:text-amber-200/80"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Fond actif */}
                    {selectedCategory === category && (
                      <motion.div
                        className="cursor-pointer absolute inset-0 bg-gradient-to-r from-amber-400/10 via-amber-400/15 to-amber-400/10 border border-amber-400/20 rounded-xl"
                        layoutId="activeCategory"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}

                    {/* Compteur de produits */}
                    <span className="cursor-pointer relative z-10 flex items-center gap-2">
                      {category}
                      {category !== "Tous" && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            selectedCategory === category
                              ? "bg-amber-400/20 text-amber-200"
                              : "bg-zinc-800 text-zinc-500"
                          }`}
                        >
                          {
                            products.filter((p) => p.category === category)
                              .length
                          }
                        </span>
                      )}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Grille de produits avec animation des filtres */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12 lg:gap-x-12 lg:gap-y-16"
          variants={container}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {filteredProducts.map((product) => (
            <motion.div key={product.id} variants={item}>
              <Link href={`/boutique/${product.id}`} className="group">
                <article className="relative bg-black/94 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-amber-400/20">
                  <div className="flex flex-col md:flex-row">
                    {/* Image Container */}
                    <div className="md:w-1/3 relative">
                      <div className="relative aspect-square md:aspect-[3/4] overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />

                        {/* Luxury Badge - Tag only */}
                        {product.tag && (
                          <div className="absolute top-3 right-3 md:top-3 md:left-3 z-10">
                            <div className="relative">
                              <span className="absolute inset-0 bg-black/40 backdrop-blur-md rounded-lg transform rotate-2 border border-amber-400/20" />
                              <span className="absolute inset-0 bg-gradient-to-r from-amber-200/10 via-amber-400/10 to-amber-200/10 rounded-lg transform -rotate-2" />
                              <span className="relative block px-3 py-1 text-[9px] tracking-[0.2em] uppercase bg-black/60 backdrop-blur-md rounded-lg border border-amber-400/30">
                                <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent font-light">
                                  {product.tag}
                                </span>
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content Container */}
                    <div className="md:w-2/3 p-6 md:p-8 space-y-6 bg-black/40">
                      {/* Header with Category */}
                      <div className="space-y-3">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-light">
                          {product.category}
                        </span>
                        <h3 className="font-cinzel-decorative text-xl md:text-2xl text-white">
                          {product.name}
                        </h3>
                        <p className="text-lg font-light text-amber-300/90">
                          {product.price.toLocaleString("fr-FR")} €
                        </p>
                      </div>

                      {/* Description */}
                      <div className="space-y-4">
                        <p className="text-sm text-zinc-400 font-light leading-relaxed">
                          {product.description}
                        </p>

                        {/* Caractéristiques */}
                        <div className="pt-4 border-t border-white/5">
                          <ul className="space-y-2">
                            <li className="flex items-center text-xs text-zinc-500">
                              <span className="w-24 text-zinc-400">
                                Matériaux
                              </span>
                              <span>{product.specifications.materials}</span>
                            </li>
                            <li className="flex items-center text-xs text-zinc-500">
                              <span className="w-24 text-zinc-400">
                                Finition
                              </span>
                              <span>{product.specifications.finish}</span>
                            </li>
                            <li className="flex items-center text-xs text-zinc-500">
                              <span className="w-24 text-zinc-400">
                                Certificat
                              </span>
                              <span>{product.specifications.certificate}</span>
                            </li>
                            {product.specifications.additionalDetails && (
                              <li className="flex items-start text-xs text-zinc-500">
                                <span className="w-24 text-zinc-400">
                                  Détails
                                </span>
                                <span className="flex flex-wrap gap-2">
                                  {product.specifications.additionalDetails.map(
                                    (detail, index) => (
                                      <span
                                        key={index}
                                        className="bg-zinc-900/50 px-2 py-1 rounded-full text-[10px]"
                                      >
                                        {detail}
                                      </span>
                                    )
                                  )}
                                </span>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Stats */}
                      {product.stats && (
                        <div className="pt-4 border-t border-white/5">
                          <ul className="space-y-2">
                            {Object.entries(product.stats).map(
                              ([stat, value]) => (
                                <li key={stat}>
                                  <div className="flex justify-between text-[10px] uppercase tracking-wider">
                                    <span className="text-zinc-200 font-medium">
                                      {
                                        statsLabels[
                                          stat as keyof typeof statsLabels
                                        ]
                                      }
                                    </span>
                                    <span className="text-amber-200 font-medium">
                                      {value}
                                    </span>
                                  </div>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                      {/* CTA */}
                      <div className="pt-4">
                        <span className="inline-flex items-center text-sm text-amber-300/80 group-hover:text-amber-300 transition-colors">
                          Découvrir
                          <svg
                            className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 border border-amber-400/0 opacity-0 group-hover:opacity-100 group-hover:border-amber-400/20 transition-all duration-500" />
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
