"use client";

import React from "react";
import { motion } from "framer-motion";


export function AboutHero() {
  return (
    <section className="relative py-12 overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black rounded-2xl">
      <motion.div
        className="container relative z-10 px-6 mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-12">
          {/* Badge */}

          <motion.h1
            className="cinzel-decorative-black text-5xl lg:text-7xl font-light leading-[1.1] tracking-tight text-white/95"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="block">L’essence</span>
            <span className="block bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent mt-1">
              de LUXORUM
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl text-zinc-100 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            LUXORUM redéfinit l’excellence masculine à travers une joaillerie
            audacieuse, intemporelle et profondément ancrée dans l’élégance.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 py-8 border-y border-zinc-800/50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-center space-y-2">
              <div className="text-2xl font-light text-amber-300/90">1999</div>
              <div className="text-xs text-zinc-400/90 uppercase tracking-wider">
                Fondation
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-light text-amber-300/90">100%</div>
              <div className="text-xs text-zinc-400/90 uppercase tracking-wider">
                Artisanal
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-light text-amber-300/90">∞</div>
              <div className="text-xs text-zinc-400/90 uppercase tracking-wider">
                Excellence
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
