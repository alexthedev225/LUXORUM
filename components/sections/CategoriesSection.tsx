"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Montres",
    description: "Chronographes & Automatiques",
    href: "/categories/montres",
    position: "Collection Horlogerie",
  },
  {
    name: "Colliers",
    description: "Chaînes & Pendentifs",
    href: "/categories/colliers",
    position: "Collection Prestige",
  },
  {
    name: "Bagues",
    description: "Chevalières & Alliances",
    href: "/categories/bagues",
    position: "Collection Exclusive",
  },
  {
    name: "Lunettes",
    description: "Optique & Solaire",
    href: "/categories/lunettes",
    position: "Collection Élégance",
  },
  {
    name: "Bracelets",
    description: "Joncs & Mailles",
    href: "/categories/bracelets",
    position: "Collection Signature",
  },
  {
    name: "Accessoires",
    description: "Pièces Uniques",
    href: "/categories/accessoires",
    position: "Collection Privée",
  },
];

export function CategoriesSection() {
  return (
    <section className="mt-10 py-32 bg-black rounded-2xl">
      <motion.div
        className="container mx-auto px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <header className="text-center mb-24 space-y-4">
          <motion.p
            className="text-zinc-400 uppercase tracking-[0.2em] text-xs font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Collections
          </motion.p>
          <motion.h2
            className="cinzel-decorative-black text-3xl md:text-4xl text-white font-light tracking-[-0.02em]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            L'excellence dans chaque détail
          </motion.h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 rounded-2xl overflow-hidden">
          {categories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Link href={category.href} className="block group">
                <div className="relative bg-zinc-900 h-full">
                  <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between min-h-[320px] transition-colors duration-500 group-hover:bg-zinc-800">
                    <div className="space-y-4">
                      <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase font-light">
                        {category.position}
                      </p>
                      <h3 className="text-2xl text-white font-light tracking-tight">
                        {category.name}
                      </h3>
                      <p className="text-zinc-400 font-light">
                        {category.description}
                      </p>
                    </div>

                    <div className="pt-8 mt-auto">
                      <span className="text-zinc-500 text-sm tracking-wider group-hover:text-white transition-colors duration-300">
                        Découvrir →
                      </span>
                    </div>

                    <div className="absolute inset-0 border border-zinc-800 pointer-events-none transition-all duration-500 group-hover:border-zinc-700" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
