"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden rounded-2xl">
      {/* Fond statique luxueux */}
      <div className="absolute inset-0 bg-black">
        {/* Dégradé de base */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

        {/* Texture et overlay statiques */}
        <div className="absolute inset-0">
          {/* Texture subtile */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
            radial-gradient(circle at center, rgba(212, 175, 55, 0.15), transparent 60%),
            repeating-linear-gradient(45deg, rgba(212, 175, 55, 0.05) 0px, transparent 1px, transparent 2px)
          `,
            }}
          />
          {/* Overlay pour profondeur */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
      </div>

      {/* Contenu principal avec animations */}
      <motion.div
        className="relative z-10 text-center px-8 space-y-10 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Logo LUXORUM */}
        <div className="w-full overflow-visible">
          <h1 className="cinzel-decorative-black text-5xl md:text-6xl lg:text-7xl text-amber-200 tracking-tight break-words max-w-full font-bold">
            LUXORUM
          </h1>
        </div>

        {/* Sous-titre */}
        <motion.h2
          className="text-2xl md:text-3xl font-light tracking-[0.1em] text-white"
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
            <Link href="/boutique" className="flex items-center gap-3">
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
