"use client";

import React from "react";
import { motion } from "framer-motion";
import CategoryButton from "./ CategoryButton";

interface Category {
  _id: string;
  name: string;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategorySelector({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySelectorProps) {
  // Ajouter "Tous" en première position
  const allCategories = [{ _id: "all", name: "Tous" }, ...categories];

  return (
    <motion.div
      className="flex flex-wrap gap-4 mb-8"
      initial="hidden"
      animate="show"
      variants={{
        show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
      }}
    >
      {allCategories.map((cat) => (
        <CategoryButton
          key={cat._id}
          category={cat.name}
          isSelected={cat.name === selectedCategory}
          onClick={onSelectCategory}
        />
      ))}
    </motion.div>
  );
}
