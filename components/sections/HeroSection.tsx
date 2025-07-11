"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star, Gem } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative py-10 overflow-hidden rounded-2xl">
      {/* Fond luxueux avec géométrie moderne */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/35 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center z-0 blur-xs"
          style={{ backgroundImage: "url('/hero-luxury-bg.png')" }}
        />
      </div>

      {/* Layout principal en colonne sur mobile, ligne sur lg+ */}
      <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-between px-10 lg:px-20 py-12 sm:py-16 gap-12 lg:gap-0">
        {/* Colonne gauche - Contenu textuel */}
        <motion.div
          className="flex-1 space-y-8 text-center lg:text-left max-w-2xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Badge premium */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-amber-300/90" />
            <span className="text-xs tracking-[0.3em] text-white uppercase">
              Collection Exclusive
            </span>
          </motion.div>

          {/* Titre principal */}
          <div className="space-y-4">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <span className="cinzel-decorative-black block bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text">
                LUXORUM
              </span>
            </motion.h1>

            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-light text-white tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Maîtres Joaillers
            </motion.h2>
          </div>

          {/* Description raffinée */}
          <motion.p
            className="text-base sm:text-lg text-white leading-relaxed font-light max-w-lg mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Chaque création raconte une histoire d&apos;excellence et de raffinement.
            Découvrez des bijoux conçus pour l&apos;homme moderne qui ne fait aucun
            compromis sur l&apos;élégance.
          </motion.p>

          {/* Statistiques luxe */}
          <motion.div
            className="flex flex-wrap justify-center lg:justify-start gap-6 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.0 }}
          >
            <div className="text-center min-w-[60px]">
              <div className="text-xs sm:text-sm text-amber-300/90 font-medium">
                25+
              </div>
              <div className="text-xs sm:text-sm text-white tracking-wider uppercase">
                Années
              </div>
            </div>
            <div className="w-px h-6 sm:h-8 bg-zinc-800/50" />
            <div className="text-center min-w-[60px]">
              <div className="text-xs sm:text-sm text-amber-300/90 font-medium">
                18K
              </div>
              <div className="text-xs sm:text-sm text-white tracking-wider uppercase">
                Or Pur
              </div>
            </div>
            <div className="w-px h-6 sm:h-8 bg-zinc-800/50" />
            <div className="text-center min-w-[60px]">
              <div className="text-xs sm:text-sm text-amber-300/90 font-medium">
                ∞
              </div>
              <div className="text-xs sm:text-sm text-white tracking-wider uppercase">
                Garantie
              </div>
            </div>
          </motion.div>

          {/* CTA moderne */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Button
              asChild
              className="group relative overflow-hidden bg-amber-500 hover:bg-amber-600 text-black font-medium px-8 py-4 rounded-full transition-all duration-500"
            >
              <Link
                href="/boutique"
                className="flex items-center justify-center gap-3"
              >
                <span className="relative z-10">Découvrir la Collection</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="group border-amber-400/30 hover:border-amber-400/60 bg-black/60 hover:bg-black/80 text-white px-8 py-4 rounded-full transition-all duration-500"
            >
              <Link
                href="/a-propos"
                className="flex items-center justify-center gap-3"
              >
                <Star className="w-4 h-4 text-amber-300/90" />
                <span>Notre Histoire</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Colonne droite - Élément visuel */}
        <motion.div
          className="flex-1  justify-center lg:justify-end items-center mt-12 lg:mt-0 hidden lg:flex"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
            {/* Cercle principal avec rotation */}
            <motion.div
              className="relative w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
              {/* Anneaux */}
              <div className="absolute inset-0 rounded-full border border-amber-400/20">
                <div className="absolute inset-4 rounded-full border border-amber-400/10" />
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/30" />

                {/* Points décoratifs */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-amber-400/60 rounded-full" />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-amber-300/40 rounded-full" />
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-amber-400/50 rounded-full" />
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 w-2 h-2 bg-amber-300/60 rounded-full" />
              </div>
            </motion.div>

            {/* Logo central */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-center space-y-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Gem className="w-7 h-7 sm:w-8 sm:h-8 text-amber-200" />
                  <div className="w-8 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
                  <div className="text-xs tracking-[0.2em] text-white uppercase">
                    Since 1999
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Particules flottantes */}
            <motion.div
              className="absolute -top-3 -right-3 w-3 h-3 bg-amber-400/40 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 0,
              }}
            />
            <motion.div
              className="absolute -bottom-5 -left-5 w-2 h-2 bg-amber-300/30 rounded-full"
              animate={{
                y: [0, -8, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: 1,
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator subtil */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border border-amber-400/30 rounded-full flex justify-center"
          animate={{
            borderColor: [
              "rgba(251, 191, 36, 0.3)",
              "rgba(251, 191, 36, 0.6)",
              "rgba(251, 191, 36, 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <motion.div
            className="w-1 h-3 bg-amber-400/60 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
