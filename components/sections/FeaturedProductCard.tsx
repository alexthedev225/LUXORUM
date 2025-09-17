"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

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

type ProductCardProps = {
  product: Product;
  index: number;
  compact?: boolean;
};

export function FeaturedProductCard({
  product,
  index,
  compact,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Variantes pour animations fluides
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="group h-full"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/boutique/${product._id}`} className="block">
        <article
          className="flex flex-col h-full bg-white overflow-hidden transition-all duration-500"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image produit */}
          <div
            className={`relative overflow-hidden ${
              compact ? "h-80" : "aspect-[3/4]"
            }`} // Image plus grande, ratio élégant
          >
            <Image
              src={product.images?.[0] ?? "/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={index === 0}
            />
            {/* Overlay subtil pour contraste */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Tag (optionnel, discret) */}
            {product.tag && (
              <div className="absolute top-3 left-3">
                <span className="text-xs uppercase font-semibold text-white bg-black/60 px-2 py-1 rounded">
                  {product.tag}
                </span>
              </div>
            )}

            {/* Prix (minimal, en haut à droite) */}
            <div className="absolute top-3 right-3">
              <span className="text-sm font-semibold text-white bg-black/60 px-2 py-1 rounded">
                {product.price.toLocaleString("fr-FR")} €
              </span>
            </div>
          </div>

          {/* Contenu réduit pour un look Gucci */}
          <div className={`p-4 ${compact ? "space-y-2" : "space-y-3"} flex-1`}>
            {/* Catégorie (subtile) */}
            <span className="block text-xs uppercase tracking-widest text-gray-500 font-serif text-center">
              {product.category.name}
            </span>

            {/* Nom du produit */}
            <h3
              className={`font-serif uppercase text-center text-gray-900 ${
                compact ? "text-lg" : "text-xl"
              } tracking-tight`}
            >
              {product.name}
            </h3>

            {/* CTA discret */}
            <div className="flex justify-center mt-2">
              <span
                className={`text-sm uppercase tracking-wide font-medium text-gray-700 group-hover:text-amber-600 transition-colors duration-300 flex items-center gap-1 ${
                  isHovered ? "underline" : ""
                }`}
              >
                Découvrir
                <ArrowUpRight
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isHovered ? "translate-x-0.5 -translate-y-0.5" : ""
                  }`}
                />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
