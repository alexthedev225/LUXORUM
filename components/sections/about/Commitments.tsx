"use client";

import { motion } from "framer-motion";

const commitments = [
  {
    title: "Éthique & Responsabilité",
    description:
      "Nous sélectionnons exclusivement des matériaux issus de sources éthiques et traçables, dans le respect des normes internationales.",
  },
  {
    title: "Artisanat d'Excellence",
    description:
      "Chaque pièce est façonnée par nos maîtres artisans, perpétuant un savoir-faire joaillier d'exception.",
  },
  {
    title: "Qualité Premium",
    description:
      "Nos créations sont soumises à des contrôles rigoureux pour garantir une qualité irréprochable.",
  },
  {
    title: "Innovation & Tradition",
    description:
      "Nous allions techniques traditionnelles et innovations modernes pour créer des pièces uniques.",
  },
];

export function Commitments() {
  return (
    <section className="relative py-32 bg-black rounded-2xl overflow-hidden">
      <div className="absolute inset-0">
        {/* Fond sophistiqué */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200/20 via-transparent to-transparent" />
      </div>

      <div className="relative container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* En-tête amélioré */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-24"
          >
            <span className="block text-xs tracking-[0.3em] uppercase text-amber-200/70">
              Notre Excellence
            </span>
            <h2 className="cinzel-decorative-black text-4xl md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
                Nos Engagements
              </span>
            </h2>
          </motion.div>

          {/* Grille d'engagements modernisée */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800/30 rounded-2xl overflow-hidden">
            {commitments.map((commitment, index) => (
              <motion.div
                key={commitment.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-black"
              >
                <div className="relative p-10 h-full transition-colors duration-500 group-hover:bg-zinc-900/50">
                  {/* Ligne décorative */}
                  <div className="absolute top-0 left-0 w-20 h-px bg-gradient-to-r from-amber-200/80 to-transparent" />

                  <div className="space-y-6">
                    <h3 className="text-xl md:text-2xl font-light tracking-wide text-amber-100/90 group-hover:text-amber-200/90 transition-colors duration-500">
                      {commitment.title}
                    </h3>
                    <p className="text-zinc-400 font-light leading-relaxed group-hover:text-zinc-300 transition-colors duration-500">
                      {commitment.description}
                    </p>
                  </div>

                  {/* Effet de hover */}
                  <div className="absolute inset-0 border border-zinc-800/50 pointer-events-none transition-colors duration-500 group-hover:border-amber-200/20" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
