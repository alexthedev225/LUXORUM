"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "@/data/products";

type FeaturedProductsClientProps = {
  products: Product[];
};

export default function FeaturedProductsClient({
  products,
}: FeaturedProductsClientProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
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
          <h2 className="font-cinzel-decorative text-5xl lg:text-6xl font-light">
            <span className="cinzel-decorative-black bg-gradient-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent">
              Collection Signature
            </span>
          </h2>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
