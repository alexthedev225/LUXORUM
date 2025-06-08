"use client";

import { motion } from "framer-motion";

export function Commitments({ commitments }) {
  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-zinc-950 to-black rounded-2xl">
      <div className="container mx-auto px-6">
        {/* Header épuré */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-amber-300/90 font-medium">
            Notre Excellence
          </span>
          <h2 className="cinzel-decorative-black text-4xl md:text-5xl font-light mt-4 mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
              Nos Engagements
            </span>
          </h2>
          <p className="text-zinc-400/90 font-light leading-relaxed max-w-2xl mx-auto">
            Des valeurs qui guident chaque geste, chaque création, chaque
            relation avec nos clients
          </p>
        </motion.div>

        {/* Grid moderne responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {commitments.map((commitment, index) => (
            <motion.div
              key={commitment.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              {/* Card moderne avec bordure subtile */}
              <div className="relative h-full p-8 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20 hover:border-amber-400/40 transition-all duration-500">
                {/* Icône avec animation subtile */}
                <motion.div
                  className="flex items-center justify-center w-12 h-12 mb-6 text-amber-300/90 group-hover:text-amber-300 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="text-2xl">{commitment.icon}</span>
                </motion.div>

                {/* Contenu */}
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-light text-white/95 tracking-wide">
                    {commitment.title}
                  </h3>

                  <p className="text-zinc-400/90 font-light leading-relaxed group-hover:text-zinc-300/95 transition-colors duration-300">
                    {commitment.description}
                  </p>
                </div>

                {/* Accent décoratif minimaliste */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-amber-400/60 to-transparent"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "30%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                />

                {/* Texture subtile au hover */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section CTA ou signature en bas */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="max-w-2xl mx-auto">
            <p className="text-zinc-400/90 font-light italic text-lg leading-relaxed mb-6">
              "Ces engagements ne sont pas simplement des promesses, ils sont
              l'essence même de LUXORUM"
            </p>

            {/* Signature graphique moderne */}
            <div className="flex items-center justify-center space-x-6">
              <motion.div
                className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400/40"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1 }}
              />
              <div className="w-2 h-2 bg-amber-400/60 rounded-full" />
              <motion.div
                className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400/40"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1 }}
              />                                                                                                        
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
