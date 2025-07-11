"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Image = dynamic(() => import("next/image"));

export function Philosophy() {
  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 xl:px-24 bg-gradient-to-b from-black via-zinc-950 to-black rounded-2xl overflow-hidden">
      {/* Gradient décoratif arrière-plan */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header centré */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-widest uppercase text-amber-300 font-medium">
            Notre Vision
          </span>
          <h2 className="cinzel-decorative-black text-4xl md:text-5xl font-light mt-4 tracking-tight">
            <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
              Notre Philosophie
            </span>
          </h2>
        </motion.div>

        {/* Grid asymétrique */}
        <div className="grid lg:grid-cols-3 gap-16 items-start">
          {/* Image immersive */}
          <motion.div
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative h-[500px] lg:h-[600px] overflow-hidden bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20 rounded-xl">
              <Image
                src="/artisan.png"
                alt="Artisan joaillier LUXORUM"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
              />

              {/* Overlay et texture */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:30px_30px]" />
            </div>

            {/* Accent graphique */}
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r border-b border-amber-400/30" />
          </motion.div>

          {/* Texte & Valeurs */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Paragraphe */}
            <div className="space-y-6">
              <p className="text-xl text-zinc-200 font-light ">
                Chez LUXORUM, chaque bijou raconte une histoire unique. Notre
                philosophie unit tradition joaillière et modernité.
              </p>
              <p className="text-base text-zinc-300/70 font-light leading-relaxed">
                Nos maîtres artisans perpétuent un savoir-faire centenaire,
                travaillant les matériaux les plus nobles pour créer des pièces
                d&apos;exception intemporelles.
              </p>
            </div>

            {/* Valeurs clés */}
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
                  <span className="text-sm text-zinc-300 uppercase tracking-wide">
                    {item.label}
                  </span>
                  <span className="text-xs text-amber-300 font-medium">
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

        {/* Citation */}
        <motion.div
          className="mt-20 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <blockquote className="text-zinc-100/90 font-light italic text-lg leading-relaxed">
            L&apos;art de la joaillerie ne se résume pas à assembler des matériaux
            précieux, c&apos;est créer une émotion qui transcende le temps.
          </blockquote>

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
