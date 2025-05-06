"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black">
      <div className="absolute inset-0">
        <Image
          src="/about.png"
          alt="LUXORUM Bijoux"
          fill
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      </div>

      <div className="relative container mx-auto px-6 py-32 text-center space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="cinzel-decorative-black text-4xl md:text-5xl lg:text-6xl"
        >
          <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
            À propos de LUXORUM
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-zinc-300 font-light tracking-wider max-w-3xl mx-auto"
        >
          L'élégance masculine redéfinie
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-zinc-400 leading-relaxed max-w-4xl mx-auto font-light"
        >
          LUXORUM est une marque de bijoux de luxe dédiée à l'élégance
          masculine. Nos créations, à la fois intemporelles et modernes, sont
          conçues avec des matériaux d'exception pour offrir un luxe ultime à
          chaque homme.
        </motion.p>
      </div>
    </section>
  );
}
