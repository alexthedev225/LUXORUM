// Testimonials.tsx
"use client";

import { motion } from "framer-motion";



export function Testimonials({ testimonials }) {
  return (
    <section className="relative py-16 overflow-hidden bg-black rounded-2xl">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-16"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full border border-amber-400/20 bg-black/60">
            <span className="text-xs tracking-[0.3em] uppercase text-amber-300/90">
              Témoignages
            </span>
          </div>
          <h2 className="cinzel-decorative-black text-4xl md:text-5xl font-light">
            <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
              Ils nous font confiance
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative p-6 h-full bg-black/80 border border-zinc-800/50 rounded-2xl backdrop-blur-sm group-hover:border-amber-400/30 transition-all duration-500 group-hover:bg-black/60">
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                      className="text-amber-400/80 text-sm"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>

                <div className="space-y-4">
                  <p className="text-zinc-300/90 font-light italic leading-relaxed group-hover:text-zinc-200/90 transition-colors duration-500">
                    "{testimonial.quote}"
                  </p>
                  <div className="pt-3 border-t border-zinc-800/50">
                    <p className="text-amber-200/90 font-medium text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-zinc-400/90 tracking-wide">
                      {testimonial.title}
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/10 to-amber-300/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
