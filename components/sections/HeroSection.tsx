"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="rounded-2xl relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fond animé luxueux - z-index bas */}
      <div className="absolute inset-0 bg-black/95 z-0">
        {/* Dégradé de base */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black opacity-90" />

        {/* Textures et effets lumineux */}
        <div
          className="absolute inset-0 mix-blend-overlay opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, rgba(212, 175, 55, 0.15), transparent 60%),
              repeating-linear-gradient(45deg, rgba(212, 175, 55, 0.05) 0px, transparent 1px, transparent 2px)
            `,
          }}
        />

        {/* Brume dorée animée */}
        <div
          className="absolute inset-0 animate-pulse opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.3), transparent 70%)",
          }}
        />
      </div>

      {/* Contenu principal - z-index élevé */}
      <motion.div
        className="relative z-10 text-center px-8 space-y-10 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Logo LUXORUM avec effet amélioré */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          {/* Effet de lueur */}
          <div className="absolute -inset-x-8 -inset-y-4 bg-amber-400/10 blur-3xl rounded-full" />

          <h1 className="relative cinzel-decorative-black text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
            <span className="inline-block bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent animate-shimmer whitespace-nowrap px-4">
              LUXORUM
            </span>
          </h1>
        </motion.div>

        {/* Sous-titre avec z-index */}
        <motion.h2
          className="relative z-10 text-2xl md:text-3xl font-light tracking-[0.2em] text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          BIJOUX DE LUXE POUR HOMME
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          L'élégance masculine redéfinie à travers des pièces d'exception. Une
          collection qui allie raffinement contemporain et caractère affirmé.
        </motion.p>

        {/* Bouton CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="pt-8"
        >
          <Button
            asChild
            className="group relative overflow-hidden rounded-full bg-black/20 backdrop-blur-sm border border-amber-400/20 hover:border-amber-400/40 px-12 py-7 transition-all duration-500"
          >
            <Link href="/collections" className="flex items-center gap-3">
              <span className="relative z-10 text-lg text-amber-200 group-hover:text-amber-100 transition-colors">
                Explorer la collection
              </span>
              <ArrowRight className="w-5 h-5 text-amber-200 group-hover:text-amber-100 group-hover:translate-x-1 transition-all duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-amber-400/10 via-amber-300/5 to-transparent" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
