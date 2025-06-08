"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black rounded-2xl">
      {/* Layout en split-screen moderne */}
      <div className="container mx-auto px-6 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Colonne gauche - Contenu textuel */}
          <motion.div
            className="space-y-8 lg:pr-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge minimaliste */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="text-xs tracking-[0.3em] text-amber-300/90 uppercase font-medium">
                Maison Luxorum
              </span>
            </motion.div>

            {/* Titre épuré */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="cinzel-decorative-black text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="text-white/95">À propos</span>
              <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
                de LUXORUM
              </span>
            </motion.h1>

            {/* Description moderne */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6 max-w-lg"
            >
              <h2 className="text-xl md:text-2xl text-zinc-300/90 font-light leading-relaxed">
                L'excellence masculine redéfinie par le raffinement
              </h2>

              <p className="text-zinc-400/90 leading-relaxed">
                Une maison de bijoux dédiée à l'art de sublimer l'homme moderne.
                Chaque création marie l'intemporel au contemporain, forgée avec
                des matériaux d'exception.
              </p>
            </motion.div>

            {/* Stats ou points clés */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex space-x-12"
            >
              <div className="text-center">
                <div className="text-2xl font-light text-amber-300/90">
                  1999
                </div>
                <div className="text-xs text-zinc-400/90 uppercase tracking-wider">
                  Fondation
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-light text-amber-300/90">
                  100%
                </div>
                <div className="text-xs text-zinc-400/90 uppercase tracking-wider">
                  Artisanal
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-light text-amber-300/90">∞</div>
                <div className="text-xs text-zinc-400/90 uppercase tracking-wider">
                  Excellence
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Colonne droite - Image avec design moderne */}
          <motion.div
            className="relative lg:h-[70vh] h-[50vh]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Container principal avec bordure dorée subtile */}
            <div className="relative h-full w-full overflow-hidden rounded-sm border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
              {/* Image */}
              <Image
                src="/about.png"
                alt="LUXORUM Bijoux"
                fill
                className="object-cover"
                priority
              />

              {/* Overlay gradient moderne */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Texture subtile */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px]" />
            </div>

            {/* Élément décoratif moderne - Ligne dorée */}
            <motion.div
              className="absolute -bottom-4 -right-4 w-24 h-px bg-gradient-to-r from-transparent to-amber-400/60"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            />

            {/* Élément décoratif - Point d'accent */}
            <motion.div
              className="absolute -top-2 -left-2 w-2 h-2 bg-amber-400/40 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4, type: "spring" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Ligne de séparation en bas - Épurée */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "60px" }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
      </motion.div>

      {/* Effet d'ambiance minimaliste */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/5 to-transparent" />
    </section>
  );
}
