"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function PromoBanner() {
  return (
    <section className="relative overflow-hidden rounded-2xl">
      {/* Arrière-plan luxueux avec dégradé subtil */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-black to-black" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-200/10 via-transparent to-transparent" />
      </div>

      {/* Ligne décorative supérieure */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />

      <motion.div
        className="relative mx-auto max-w-screen-xl px-8 py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
          {/* Texte principal */}
          <motion.div
            className="flex-1 space-y-6 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="relative">
              <h2 className="cinzel-decorative-black text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white">
                Exprimez votre pouvoir
                <span className="block mt-3 text-amber-200/90">
                  avec élégance
                </span>
              </h2>
              <div className="absolute -left-8 top-0 w-1 h-full bg-amber-200/20 hidden md:block" />
            </div>
          </motion.div>

          {/* Bouton */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Button
              asChild
              className="relative group px-12 py-8 bg-transparent border border-amber-200/20 
                       hover:border-amber-200/40 text-amber-100 hover:text-white
                       uppercase tracking-widest text-sm font-light
                       transition-all duration-500"
            >
              <Link href="/boutique">
                <span className="relative z-10">Découvrir</span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-500 bg-gradient-to-r 
                              from-amber-200/10 via-amber-200/5 to-transparent"
                />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Ligne décorative inférieure */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />
    </section>
  );
}
