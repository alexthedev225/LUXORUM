"use client";

import { motion } from "framer-motion";
import { useRef, useMemo } from "react";
import { FeaturedProductCard } from "./FeaturedProductCard";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: string;
  images: string[];
  category: {
    _id: string;
    name: string;
  };
  specifications: {
    materials: string;
    finish: string;
    certificate: string;
    collection: string;
    additionalDetails?: string[];
    stats: {
      craftsmanship: string;
      rarity: string;
      prestige: string;
      durability: string;
    };
    detailedDescription: string;
  };
  tag?: string;
  discount?: string;
};

type FeaturedProductsProps = {
  products: Product[];
};

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredProducts = useMemo(() => products.slice(0, 3), [products]);

  // Animation variants for smooth Gucci-inspired transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-24 bg-white" // Reduced padding for a tighter, Gucci-like feel
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header: concise, Gucci-inspired */}
        <motion.header
          className="text-center mb-12 lg:mb-16 space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Titre : bold, uppercase, serif */}
          <motion.h2
            className="font-serif text-3xl lg:text-5xl font-light text-gray-900 uppercase tracking-wide"
            variants={itemVariants}
          >
            Collection Signature
          </motion.h2>

          {/* Sous-titre : détaillé, narratif, sans-serif */}
          <motion.p
            className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto font-sans tracking-wide leading-relaxed"
            variants={itemVariants}
          >
            Découvrez une sélection exclusive de pièces uniques, où
            l’inspiration fusionne avec l’essence intemporelle de notre Maison.
          </motion.p>
        </motion.header>

        {/* Product grid: clean, image-focused */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10" // Tighter gaps for a refined look
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
            >
              <FeaturedProductCard product={product} index={index} compact />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
