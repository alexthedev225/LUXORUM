"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Philosophy() {
  return (
    <section className="relative py-32 bg-black rounded-2xl overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contenu */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="cinzel-decorative-black text-3xl md:text-4xl tracking-tight">
              <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
                Notre Philosophie
              </span>
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-zinc-300 font-light leading-relaxed">
                Chez LUXORUM, nous croyons que chaque bijou raconte une histoire
                unique. Notre philosophie repose sur l'alliance parfaite entre
                tradition joaillière et modernité.
              </p>
              <p className="text-zinc-400 font-light leading-relaxed">
                Nos artisans perpétuent un savoir-faire centenaire, travaillant
                avec passion les matériaux les plus nobles pour créer des pièces
                d'exception qui traverseront les générations.
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[600px] rounded-2xl overflow-hidden"
          >
            <Image
              src="/artisan.png"
              alt="Artisan joaillier"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
