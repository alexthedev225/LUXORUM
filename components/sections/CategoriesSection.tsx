"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}
const Link: React.FC<LinkProps> = ({ href, children, className, ...props }) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

interface Category {
  name: string;
  description: string;
  href: string;
  position: string;
  image?: string; // Ajout d'une propriété image pour chaque catégorie
}

const categories: Category[] = [
  {
    name: "Montres",
    description: "Chronographes & Automatiques",
    href: "/boutique/categories/montres",
    position: "Collection Horlogerie",
    image: "/montres.png",
  },
  {
    name: "Colliers",
    description: "Chaînes & Pendentifs",
    href: "/boutique/categories/colliers",
    position: "Collection Prestige",
    image: "/colier.png",
  },
  {
    name: "Bagues",
    description: "Chevalières & Alliances",
    href: "/boutique/categories/bagues",
    position: "Collection Exclusive",
    image: "/bagues.png",
  },
  {
    name: "Bracelets",
    description: "Joncs & Mailles",
    href: "/boutique/categories/bracelets",
    position: "Collection Signature",
    image: "/bracelets.png",
  },
];

export function CategoriesSection() {
  // Animation variants
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
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header : concis, Gucci-inspired */}
        <motion.header
          className="text-center mb-12 lg:mb-16 space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Titre */}
          <motion.h2
            className="font-serif text-3xl lg:text-5xl font-light text-gray-900 uppercase tracking-wide"
            variants={itemVariants}
          >
            Nos Collections
          </motion.h2>

          {/* Sous-titre narratif */}
          <motion.p
            className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto font-sans tracking-wide leading-relaxed"
            variants={itemVariants}
          >
            Découvrez l’élégance intemporelle à travers nos univers joailliers,
            où chaque pièce incarne un savoir-faire d’exception.
          </motion.p>
        </motion.header>

        {/* Grille des catégories : visuelle, Gucci-style */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {categories.map((category, i) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <Link href={category.href} className="block">
                <div className="relative aspect-[3/4] overflow-hidden">
                  {/* Image de fond */}
                  <Image
                    src={category.image ?? "/placeholder.jpg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={i === 0}
                  />
                  {/* Overlay au survol */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Contenu superposé */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="space-y-2">
                      <span className="text-xs uppercase tracking-widest text-white font-sans">
                        {category.position}
                      </span>
                      <h3 className="font-serif text-2xl lg:text-3xl text-white uppercase tracking-tight">
                        {category.name}
                      </h3>
                      <div className="flex items-center gap-2 text-white group-hover:text-amber-400 transition-colors duration-300">
                        <span className="text-sm uppercase font-medium">
                          Découvrir
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
