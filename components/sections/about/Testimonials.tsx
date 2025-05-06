"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Les bijoux LUXORUM sont d'une qualité exceptionnelle et ajoutent une touche de raffinement incomparable à ma collection.",
    author: "Alexandre D.",
    title: "Entrepreneur",
  },
  {
    quote:
      "Un savoir-faire unique et une élégance intemporelle. Chaque pièce LUXORUM est un véritable chef-d'œuvre.",
    author: "Marc-Antoine B.",
    title: "Directeur Artistique",
  },
  {
    quote:
      "Le service est à la hauteur des créations : excellent, personnalisé et professionnel.",
    author: "Richard M.",
    title: "Collectionneur",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-32 bg-black rounded-2xl overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-20"
        >
          <h2 className="cinzel-decorative-black text-3xl md:text-4xl">
            <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
              Ils nous font confiance
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 rounded-xl border border-zinc-800/50"
            >
              <div className="space-y-4">
                <p className="text-lg text-zinc-300 font-light italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="text-amber-200/90">{testimonial.author}</p>
                  <p className="text-sm text-zinc-500">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
