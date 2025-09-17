"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function AboutSection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Légèrement plus espacé pour une entrée fluide
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // Plus de déplacement vertical pour dynamisme
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 }, // Zoom initial plus marqué
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-black/95 relative overflow-hidden">
      {/* Fond noir avec texture subtile */}
      <div className="absolute inset-0 bg-[url('/textures/metal-brushed.jpg')] bg-cover opacity-10" />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Image principale (60% de la grille) */}
            <motion.div
              className="lg:col-span-2 relative aspect-[3/4] transition-all duration-500 shadow-lg group"
              variants={imageVariants}
            >
              <Image
                src="/hand.jpg" // Image du mannequin homme de teint noir
                alt="Mannequin homme de teint noir portant des bijoux LUXORUM"
                fill
                className="object-cover  transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 66vw" // Ajusté pour 2/3 de la grille
                priority
              />
              {/* Overlay subtil au survol */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 " />
            </motion.div>

            {/* Contenu textuel (40% de la grille, chevauchement partiel) */}
            <motion.div
              className="lg:col-span-1 relative bg-black/90 backdrop-blur-sm p-6 lg:p-8  lg:-ml-24 z-20" // Chevauchement sur l’image
              variants={containerVariants}
            >
              {/* Header */}
              <motion.header className="space-y-4" variants={containerVariants}>
                <motion.h2
                  className="font-serif text-3xl lg:text-5xl font-light text-white uppercase tracking-wide" // Texte blanc pour contraste
                  variants={itemVariants}
                >
                  Notre Héritage
                </motion.h2>
                <motion.p
                  className="text-base lg:text-lg text-gray-300 max-w-md font-sans tracking-wide leading-relaxed"
                  variants={itemVariants}
                >
                  Une vision intemporelle où l’artisanat joaillier rencontre
                  l’élégance contemporaine.
                </motion.p>
              </motion.header>

              {/* Texte */}
              <motion.div
                className="space-y-4 mt-6"
                variants={containerVariants}
              >
                <motion.p
                  className="text-base lg:text-lg text-gray-300 font-sans leading-relaxed"
                  variants={itemVariants}
                >
                  LUXORUM incarne l’essence du raffinement, façonnant des bijoux
                  pour l’homme moderne avec un savoir-faire d’exception.
                </motion.p>
                <motion.p
                  className="text-base lg:text-lg text-gray-300 font-sans leading-relaxed"
                  variants={itemVariants}
                >
                  Chaque pièce célèbre une tradition audacieuse, conçue pour
                  transcender le temps et sublimer votre histoire.
                </motion.p>
              </motion.div>

              {/* CTA */}
              <motion.div className="mt-8" variants={itemVariants}>
                <Link
                  href="/a-propos"
                  className="group inline-flex items-center gap-2 text-white border border-white/80 px-4 py-2 rounded-md hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-300"
                >
                  <span className="text-sm uppercase font-medium tracking-wide">
                    Découvrir notre histoire
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
