"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Crown, Diamond, Watch, Gem } from "lucide-react";

// Simulation du composant Link de Next.js
const Link = ({ href, children, className, ...props }) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

const categories = [
  {
    name: "Montres",
    description: "Chronographes & Automatiques",
    href: "/boutique/categories/montres",
    position: "Collection Horlogerie",
    icon: Watch,
    gradient: "from-amber-400/10 via-amber-300/5 to-transparent",
    accent: "group-hover:shadow-amber-400/20",
  },
  {
    name: "Colliers",
    description: "Chaînes & Pendentifs",
    href: "/boutique/categories/colliers",
    position: "Collection Prestige",
    icon: Diamond,
    gradient: "from-amber-300/8 via-amber-400/4 to-transparent",
    accent: "group-hover:shadow-amber-300/25",
  },
  {
    name: "Bagues",
    description: "Chevalières & Alliances",
    href: "/boutique/categories/bagues",
    position: "Collection Exclusive",
    icon: Crown,
    gradient: "from-amber-400/12 via-amber-200/6 to-transparent",
    accent: "group-hover:shadow-amber-200/30",
  },
  {
    name: "Bracelets",
    description: "Joncs & Mailles",
    href: "/boutique/categories/bracelets",
    position: "Collection Signature",
    icon: Gem,
    gradient: "from-amber-300/10 via-amber-400/5 to-transparent",
    accent: "group-hover:shadow-amber-300/20",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-black via-zinc-950 to-black rounded-2xl relative overflow-hidden">
      {/* Fond décoratif subtil */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:60px_60px] opacity-10" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-l from-amber-400/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-r from-amber-300/4 to-transparent rounded-full blur-3xl" />
      </div>

      <motion.div
        className="container mx-auto px-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header élégant */}
        <header className="text-center mb-24 space-y-6">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-neutral-950 via-black to-neutral-950 border border-amber-400/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Crown className="w-4 h-4 text-amber-300/90" />
            <span className="text-xs tracking-[0.3em] text-zinc-400/90 uppercase font-light">
              Collections Exclusives
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="cinzel-decorative-black block bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text">
              L'excellence
            </span>
            <span className="block text-white/95 font-light text-2xl md:text-3xl mt-2 tracking-wide">
              dans chaque détail
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-zinc-300/90 leading-relaxed font-light max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Quatre univers d'exception où se rencontrent tradition artisanale et
            innovation contemporaine
          </motion.p>
        </header>

        {/* Grille des catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {categories.map((category, i) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.8 }}
                className="group"
              >
                <Link href={category.href} className="block">
                  <div
                    className={`relative bg-gradient-to-br from-neutral-950 via-black to-neutral-950 border border-amber-400/20 rounded-2xl overflow-hidden transition-all duration-700 hover:border-amber-400/40 hover:shadow-2xl ${category.accent}`}
                  >
                    {/* Gradient de fond au hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                    />

                    {/* Contenu principal */}
                    <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between min-h-[280px]">
                      {/* Header de la carte */}
                      <div className="space-y-6">
                        {/* Badge et icône */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs tracking-[0.3em] text-zinc-400/90 uppercase font-light">
                            {category.position}
                          </span>
                          <div className="p-2 rounded-full bg-black/60 border border-amber-400/20 group-hover:border-amber-400/40 transition-all duration-500">
                            <IconComponent className="w-5 h-5 text-amber-300/90 group-hover:text-amber-200 transition-colors duration-300" />
                          </div>
                        </div>

                        {/* Titre */}
                        <h3 className="cinzel-decorative-black text-3xl md:text-4xl font-bold text-white/95 group-hover:text-amber-200 transition-colors duration-500 tracking-tight">
                          {category.name}
                        </h3>

                        {/* Description */}
                        <p className="text-zinc-300/90 font-light text-lg leading-relaxed group-hover:text-white/95 transition-colors duration-300">
                          {category.description}
                        </p>
                      </div>

                      {/* Footer avec CTA */}
                      <div className="pt-8 mt-auto">
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-px bg-gradient-to-r from-amber-400/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                          <div className="flex items-center gap-3 text-zinc-400/90 group-hover:text-amber-200 transition-all duration-500">
                            <span className="text-sm tracking-wider font-medium uppercase">
                              Découvrir
                            </span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Effet de lueur subtile */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute inset-px rounded-2xl bg-gradient-to-br from-amber-400/10 via-transparent to-amber-300/5" />
                    </div>

                    {/* Points décoratifs */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute bottom-4 left-4 w-1 h-1 bg-amber-300/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Statistiques de prestige */}
        <motion.div
          className="flex flex-wrap justify-center gap-12 pt-20 mt-16 border-t border-zinc-800/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="text-center space-y-2">
            <div className="text-2xl text-amber-300/90 font-light">4</div>
            <div className="text-xs text-zinc-400/90 tracking-wider uppercase">
              Collections
            </div>
          </div>
          <div className="w-px h-12 bg-zinc-800/50" />
          <div className="text-center space-y-2">
            <div className="text-2xl text-amber-300/90 font-light">∞</div>
            <div className="text-xs text-zinc-400/90 tracking-wider uppercase">
              Possibilités
            </div>
          </div>
          <div className="w-px h-12 bg-zinc-800/50" />
          <div className="text-center space-y-2">
            <div className="text-2xl text-amber-300/90 font-light">100%</div>
            <div className="text-xs text-zinc-400/90 tracking-wider uppercase">
              Artisanal
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
