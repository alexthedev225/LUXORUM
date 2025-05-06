"use client";

import { motion } from "framer-motion";

export function ContactHero() {
  return (
    <section className="relative py-32 bg-black rounded-2xl overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="relative container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="cinzel-decorative-black text-4xl md:text-5xl lg:text-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
              Contactez-nous
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Nous serons heureux de répondre à vos questions et demandes
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
