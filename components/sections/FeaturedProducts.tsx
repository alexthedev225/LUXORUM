"use client";

import { motion } from "framer-motion";
import { useRef, useMemo } from "react";
import { Diamond } from "lucide-react";
import { FeaturedProductCard } from "./FeaturedProductCard";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: string; // Tu peux changer en number si tu préfères
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

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden rounded-2xl"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-6 z-10">
        <motion.header
          className="text-center mb-20 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400" />
            <Diamond className="w-5 h-5 text-amber-400" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400" />
          </div>

          <span className="block text-base tracking-[0.3em] text-zinc-400 uppercase">
            Excellence · Artisanat · Luxe
          </span>

          <h2 className="font-cinzel-decorative text-5xl lg:text-6xl font-light">
            <span className="cinzel-decorative-black bg-gradient-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent">
              Collection Signature
            </span>
          </h2>

          <p className="text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Découvrez nos créations d&apos;exception, où chaque détail raconte
            une histoire de perfection et d&apos;élégance intemporelle.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {featuredProducts.map((product, index) => (
            <FeaturedProductCard
              key={product._id}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
