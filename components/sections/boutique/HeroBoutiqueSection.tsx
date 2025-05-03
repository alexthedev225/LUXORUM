"use client";

import { motion } from "framer-motion";

export function HeroBoutiqueSection() {
  return (
    <section className="relative py-32 overflow-hidden rounded-2xl">
      {/* Fond avec effet de profondeur */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/30 to-black" />
        <div
          className="absolute inset-0 mix-blend-overlay opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(212, 175, 55, 0.15), transparent 70%)",
          }}
        />
      </div>

      <div className="relative container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="cinzel-decorative-black text-3xl md:text-4xl lg:text-5xl  text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Découvrez notre collection d'excellence
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-zinc-300/80 font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Des créations joaillières pensées pour l'homme contemporain, entre
            force et élégance.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
