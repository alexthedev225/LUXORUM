// ContactCTA.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="relative py-32 overflow-hidden mb-2 rounded-2xl">
      {/* Fond minimaliste avec dégradé subtil */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      {/* Texture subtile */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Colonne gauche - Contenu */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-12"
            >
              {/* Badge moderne */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block"
              >
                <div className="px-4 py-2 rounded-full bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20">
                  <span className="text-xs tracking-[0.2em] uppercase text-amber-300/90 font-medium">
                    Contact
                  </span>
                </div>
              </motion.div>

              {/* Titre épuré */}
              <div className="space-y-6 cinzel-decorative-black">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-5xl lg:text-7xl xl:text-8xl font-light leading-[0.9] tracking-tight"
                >
                  <span className="block text-white/95">Créons</span>
                  <span className="block bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
                    ensemble
                  </span>
                </motion.h2>
              </div>

              {/* Description minimaliste */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-zinc-400 font-light leading-relaxed max-w-md"
              >
                Une vision unique mérite une création exceptionnelle. Discutons
                de votre projet.
              </motion.p>

              {/* Actions épurées */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {/* Bouton principal moderne */}
                <motion.div
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    asChild
                    className="group relative px-8 py-4 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-2xl transition-all duration-300 shadow-xl hover:shadow-amber-500/20"
                  >
                    <Link href="/contact" className="flex items-center gap-3">
                      <span>Démarrer un projet</span>
                      <motion.div
                        whileHover={{ x: 2, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </motion.div>
                    </Link>
                  </Button>
                </motion.div>

                {/* Lien secondaire minimaliste */}
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    asChild
                    variant="ghost"
                    className="group px-0 py-4 text-zinc-400/90 hover:text-amber-200/90 font-medium"
                  >
                    <Link href="/boutique" className="flex items-center gap-2">
                      <span className="border-b border-transparent group-hover:border-amber-400/40 transition-colors duration-300">
                        Voir la boutique
                      </span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Colonne droite - Élément visuel moderne */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 lg:h-[500px]"
            >
              {/* Forme géométrique moderne */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="relative"
                >
                  {/* Rectangle principal */}
                  <div className="w-72 h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-3xl border border-amber-400/20 backdrop-blur-sm" />

                  {/* Accent doré */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    className="absolute top-6 left-6 right-6 h-px bg-gradient-to-r from-amber-400/60 to-transparent"
                  />

                  {/* Points décoratifs */}
                  <div className="absolute top-8 left-8 flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
                        className="w-2 h-2 rounded-full bg-amber-400/40"
                      />
                    ))}
                  </div>

                  {/* Lueur d'ambiance */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent rounded-3xl" />
                </motion.div>
              </div>

              {/* Éléments flottants */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute top-12 right-12 w-16 h-16 bg-black/60 backdrop-blur-sm rounded-2xl border border-zinc-800/50 flex items-center justify-center"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-amber-400/60 to-amber-300/80 rounded-lg" />
              </motion.div>

              <motion.div
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute bottom-12 left-12 w-12 h-12 bg-black/60 backdrop-blur-sm rounded-xl border border-zinc-800/50"
              />
            </motion.div>
          </div>

          {/* Séparateur final minimaliste */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="mt-24 h-px bg-gradient-to-r from-transparent via-zinc-800/50 to-transparent transform origin-center"
          />
        </div>
      </div>
    </section>
  );
}
