"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function PromoBanner() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center space-y-6"
        >
          {/* Header */}
          <motion.div variants={containerVariants}>
            <motion.h2
              className="font-serif text-3xl lg:text-5xl font-light text-gray-900 uppercase tracking-wide"
              variants={itemVariants}
            >
              Exprimez Votre Élégance
            </motion.h2>
            <motion.p
              className="text-base lg:text-lg text-gray-600 max-w-xl mx-auto font-sans tracking-wide leading-relaxed"
              variants={itemVariants}
            >
              Découvrez des bijoux qui incarnent le pouvoir et la sophistication
              intemporelle.
            </motion.p>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants}>
            <Link
              href="/boutique"
              className="group inline-flex items-center gap-2 text-gray-700 hover:text-amber-400 transition-colors duration-300"
              aria-label="Découvrir la boutique LUXORUM"
            >
              <span className="text-sm uppercase font-medium tracking-wide">
                Découvrir la Boutique
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
