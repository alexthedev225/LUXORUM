"use client";

import React from "react";
import ProductCard from "./ProductC";
import { motion } from "framer-motion";
import { ANIMATION_VARIANTS } from "./animationVariants";
import type { Product } from "./types";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={ANIMATION_VARIANTS.container}
      initial="hidden"
      animate="show"
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </motion.div>
  );
}
