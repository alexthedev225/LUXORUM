"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { type Product, statsLabels } from "@/data/products";
import { Button } from "@/components/ui/button";

type Props = {
  product: Product;
};

export function ProductDetails({ product }: Props) {
  return (
    <section className="mb-10 rounded-2xl min-h-screen py-16 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
            {/* Section Carte Pokémon Luxe */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative group perspective-2000"
            >
              <div className="relative w-full aspect-[2.5/3.5] preserve-3d group-hover:rotate-y-6 transition-transform duration-700">
                {/* Fond et image */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent" />
                  </div>

                  {/* Contenu de la carte */}
                  <div className="absolute inset-[12px] rounded-xl border-2 border-amber-400/20 overflow-hidden">
                    {/* Image et Tag */}
                    <div className="relative h-[60%] rounded-t-lg overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transform-gpu transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Overlay et effets */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {product.tag && (
                        <div className="absolute top-4 right-4 z-10">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="px-3 py-1.5 rounded-lg bg-black/80 border border-amber-400/30"
                          >
                            <span className="text-xs tracking-wider bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                              {product.tag}
                            </span>
                          </motion.div>
                        </div>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="absolute bottom-0 inset-x-0 h-[40%] p-6 bg-black/80">
                      <h2 className="text-xl font-cinzel-decorative mb-4 text-center">
                        <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 bg-clip-text text-transparent">
                          {product.name}
                        </span>
                      </h2>

                      <div className="space-y-3">
                        {Object.entries(product.stats).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-3">
                            <span className="text-xs uppercase tracking-wider text-zinc-400 w-24">
                              {statsLabels[key as keyof typeof statsLabels]}
                            </span>
                            <div className="flex-1 h-1.5 bg-zinc-800/80 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${value}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-amber-400/60 to-amber-300/80"
                              />
                            </div>
                            <span className="text-xs text-amber-300/90 w-8 text-right">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Effets de brillance */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </motion.div>

            {/* Section Informations */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12"
            >
              {/* En-tête et Prix */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-sm tracking-[0.3em] uppercase text-zinc-400/90 font-light">
                    {product.category}
                  </span>
                  <h1 className="mt-4 cinzel-decorative-black text-5xl md:text-6xl xl:text-7xl text-white/95 tracking-tight">
                    <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
                      {product.name}
                    </span>
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-6"
                >
                  <p className="text-2xl font-light tracking-wide text-amber-300/90">
                    {product.price.toLocaleString("fr-FR")} €
                  </p>
                </motion.div>
              </div>

              {/* Description et Détails */}
              <div className="space-y-6">
                <p className="text-lg text-zinc-300/90 leading-relaxed font-light">
                  {product.description}
                </p>
                <div className="pt-6 border-t border-zinc-800/50">
                  <p className="text-sm text-zinc-400/90 leading-relaxed font-light">
                    {product.detailedDescription.replace(/\*\*/g, "")}
                  </p>
                </div>
              </div>

              {/* Spécifications */}
              <div className="space-y-6 border-t border-zinc-800/90 pt-8">
                <h2 className="text-xl font-cinzel-decorative text-white/95">
                  Caractéristiques
                </h2>
                <ul className="space-y-4">
                  <li className="flex justify-between">
                    <span className="text-zinc-400/90">Collection</span>
                    <span className="text-white/95">
                      {product.specifications.collection}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-zinc-400/90">Matériaux</span>
                    <span className="text-white/95">
                      {product.specifications.materials}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-zinc-400/90">Finition</span>
                    <span className="text-white/95">
                      {product.specifications.finish}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-zinc-400/90">Certificat</span>
                    <span className="text-white/95">
                      {product.specifications.certificate}
                    </span>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-8"
              >
                <Button className="w-full py-8 text-lg bg-gradient-to-r from-amber-400/10 via-amber-300/20 to-amber-400/10 hover:bg-amber-400/30 text-amber-200/95 border border-amber-400/30 hover:border-amber-400/50 transition-all duration-500">
                  Ajouter au panier
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
