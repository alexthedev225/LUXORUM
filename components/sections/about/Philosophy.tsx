"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Philosophy() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-zinc-950 to-black rounded-2xl">
      <div className="container mx-auto px-6">
        {/* Header centré */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-amber-300/90 font-medium">
            Notre Vision
          </span>
          <h2 className="cinzel-decorative-black text-4xl md:text-5xl font-light mt-4 tracking-tight">
            <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
              Notre Philosophie
            </span>
          </h2>
        </motion.div>

        {/* Layout asymétrique moderne */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Colonne 1 - Image principale */}
          <motion.div
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative h-[500px] lg:h-[600px] overflow-hidden bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20">
              <Image
                src="/artisan.png"
                alt="Artisan joaillier LUXORUM"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
              />

              {/* Overlay moderne */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

              {/* Texture subtile */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:30px_30px]" />
            </div>

            {/* Accent géométrique */}
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r border-b border-amber-400/30" />
          </motion.div>

          {/* Colonne 2 - Contenu textuel vertical */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Texte principal */}
            <div className="space-y-6">
              <p className="text-lg text-zinc-300/90 font-light leading-relaxed">
                Chez LUXORUM, chaque bijou raconte une histoire unique. Notre
                philosophie unit tradition joaillière et modernité.
              </p>

              <p className="text-zinc-400/90 font-light leading-relaxed text-sm">
                Nos maîtres artisans perpétuent un savoir-faire centenaire,
                travaillant les matériaux les plus nobles pour créer des pièces
                d'exception intemporelles.
              </p>
            </div>

            {/* Valeurs clés - Cards minimalistes */}
            <div className="space-y-4">
              {[
                { label: "Tradition", value: "Depuis 1999" },
                { label: "Excellence", value: "100% Artisanal" },
                { label: "Innovation", value: "Design Moderne" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex justify-between items-center py-3 border-b border-zinc-800/50 hover:border-amber-400/20 transition-colors duration-300"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <span className="text-sm text-zinc-400/90 uppercase tracking-wide">
                    {item.label}
                  </span>
                  <span className="text-xs text-amber-300/90 font-medium">
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Signature graphique */}
            <motion.div
              className="pt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-px bg-gradient-to-r from-amber-400/60 to-transparent" />
                <div className="w-1 h-1 bg-amber-400/60 rounded-full" />
                <div className="w-4 h-px bg-gradient-to-r from-amber-400/40 to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Citation en bas - Element décoratif */}
        <motion.div
          className="mt-20 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <blockquote className="text-zinc-400/90 font-light italic text-lg leading-relaxed">
            "L'art de la joaillerie ne se résume pas à assembler des matériaux
            précieux, c'est créer une émotion qui transcende le temps."
          </blockquote>

          {/* Ligne décorative */}
          <motion.div
            className="mt-6 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
