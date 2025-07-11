"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="relative py-12 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden rounded-2xl mb-2">
      <motion.div
        className="container mx-auto px-6 relative z-10 max-w-2xl text-center space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-xs tracking-[0.3em] text-amber-300/90 uppercase font-light">
            Contact
          </span>
        </motion.div>

        {/* Titre */}
        <motion.h2
          className="cinzel-decorative-black text-5xl md:text-6xl lg:text-7xl font-light leading-[0.9] tracking-tight text-white/95 space-y-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="block">Créons</span>
          <span className="block bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
            ensemble
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-lg text-zinc-300/90 font-light leading-relaxed max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Une vision unique mérite une création exceptionnelle. Discutons de
          votre projet.
        </motion.p>

        {/* Boutons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
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

          <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
            <Button
              asChild
              variant="ghost"
              className="group px-0 py-4 text-zinc-400/90 hover:text-black font-medium"
            >
              <Link href="/boutique" className="flex items-center gap-2">
                <span className="border-b border-transparent group-hover:border-black transition-colors duration-300">
                  Voir la boutique
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
