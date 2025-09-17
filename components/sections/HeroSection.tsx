"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  // Variantes pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Image de fond avec effet subtil */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-luxury-bg.png" // Remplace par une image haute qualité (ex. : bijou ou texture luxe)
          alt="Hero Background"
          fill
          className="object-cover "
          priority
        />
        {/* Overlay pour assombrir l'image */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Contenu principal */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center space-y-8 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Titre principal */}
        <motion.h1
          className="font-serif uppercase tracking-tight text-white"
          style={{ fontSize: "clamp(3rem, 10vw, 7rem)", lineHeight: "1.1" }}
          variants={itemVariants}
        >
          LUXORUM
        </motion.h1>

        {/* Ligne dorée */}
        <motion.div
          className="w-32 h-[1px] bg-white"
          variants={itemVariants}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        {/* Sous-texte */}
        <motion.p
          className="text-white uppercase tracking-[0.4em] text-xs md:text-sm"
          variants={itemVariants}
        >
          Joaillerie d’exception
        </motion.p>

        {/* CTA */}
        <motion.div variants={itemVariants}>
          <Link
            href="/boutique"
            className="inline-block px-8 py-3 border border-white text-white rounded-none uppercase tracking-wider text-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
          >
            Découvrir la collection
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
