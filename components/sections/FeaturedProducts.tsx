"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products, Product, statsLabels } from "@/data/products";

// Sélection des 3 premiers produits pour la section Featured
const featuredProducts = products.slice(0, 3);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div variants={item}>
      <Link href={`/boutique/${product.id}`} className="group block">
        <article className="bg-black/90 backdrop-blur-xl rounded-2xl overflow-hidden border  border-amber-400/20">
          {/* Image Container */}
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            />
            {/* Overlay complexe */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black opacity-90" />

            {/* Badge */}
            {product.tag && (
              <div className="absolute top-4 left-4">
                <div className="relative">
                  <span className="absolute inset-0 bg-black/40 backdrop-blur-xl rounded-lg transform rotate-2" />
                  <span className="relative block px-3 py-1 text-[10px] tracking-[0.2em] uppercase bg-black/60 backdrop-blur-xl rounded-lg border border-amber-400/30">
                    <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
                      {product.tag}
                    </span>
                  </span>
                </div>
              </div>
            )}

            {/* Stats sur l'image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(product.stats).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-[10px] uppercase tracking-wider">
                      <span className="text-zinc-200 font-medium">
                        {statsLabels[key as keyof typeof statsLabels]}
                      </span>
                      <span className="text-amber-200/95 font-medium">
                        {value}
                      </span>
                    </div>
                    <div className="h-1 bg-zinc-800/99 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-amber-300/80 to-amber-500/80"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 border-t border-amber-400/20">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-100 font-light">
                    {product.category}
                  </p>
                  <h3 className="font-cinzel-decorative text-xl text-white group-hover:text-amber-200/95 transition-colors duration-300">
                    {product.name}
                  </h3>
                </div>
                <p className="text-lg font-light text-amber-300/95">
                  {product.price.toLocaleString("fr-FR")} €
                </p>
              </div>

              {/* Description ajoutée */}
              <p className="text-sm text-zinc-200 font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Collection tag et caractéristiques */}
            <div className="pt-4 flex flex-wrap gap-2">
              <span className="px-2 py-1 text-[10px] bg-amber-400/20 rounded-full text-amber-200">
                {product.specifications.collection}
              </span>
              {product.specifications.additionalDetails?.map(
                (detail, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-[10px] bg-zinc-800/60 rounded-full text-white"
                  >
                    {detail}
                  </span>
                )
              )}
            </div>

            {/* CTA */}
            <div className="pt-4 flex items-center justify-between">
              <span className="text-sm text-zinc-200/90 group-hover:text-amber-200/95 transition-colors duration-300">
                Découvrir →
              </span>
              <span className="text-xs text-zinc-200/90">
                #{String(product.id).padStart(3, "0")}
              </span>
            </div>
          </div>

          {/* Effet de bordure au hover */}
          <div className="absolute inset-0 border-2 border-amber-400/0 opacity-0 group-hover:opacity-100 group-hover:border-amber-400/20 transition-all duration-500 rounded-2xl" />
        </article>
      </Link>
    </motion.div>
  );
}

export function FeaturedProducts() {
  return (
    <section className="relative py-32 bg-black overflow-hidden rounded-2xl">
      {/* Fond avec effet de profondeur */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/30 to-black" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 via-transparent to-transparent" />
      </div>

      <motion.div
        className="container relative mx-auto px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <header className="text-center mb-20 space-y-4">
          <motion.span
            className="block text-xs tracking-[0.3em] text-zinc-500 uppercase"
            variants={item}
          >
            Pièces d'exception
          </motion.span>
          <motion.h2
            className="cinzel-decorative-black text-3xl md:text-4xl lg:text-5xl font-serif text-white font-light "
            variants={item}
          >
            Collection Signature
          </motion.h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
