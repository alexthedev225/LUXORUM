"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const Link = dynamic(() => import("next/link"));
const Image = dynamic(() => import("next/image"));

type Commitment = {
  icon?: ReactNode;
  title: string;
  description: string;
  href?: string;
  image?: string;
};

type CommitmentsProps = {
  commitments: Commitment[];
};

export function Commitments({ commitments }: CommitmentsProps) {
  return (
    <section className="relative w-full bg-gradient-to-b from-black via-zinc-950 to-black rounded-2xl overflow-hidden py-24 px-4 sm:px-6 lg:px-8 xl:px-24">
      {/* Décor arrière-plan */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-widest uppercase text-amber-300 font-medium">
            Notre Excellence
          </span>
          <h2 className="cinzel-decorative-black text-4xl md:text-5xl font-light mt-4 mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
              Nos Engagements
            </span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Des valeurs qui guident chaque geste, chaque création, chaque
            relation avec nos clients.
          </p>
        </motion.div>

        {/* Liste des engagements */}
        <div className="grid md:grid-cols-2 gap-10">
          {commitments.map((commitment, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative p-6 h-full bg-black/80 border border-zinc-800/50 rounded-2xl backdrop-blur-sm group-hover:border-amber-400/30 transition-all duration-500 group-hover:bg-black/60">
                {commitment.image ? (
                  <div className="mb-4 rounded-xl overflow-hidden shadow-sm">
                    <Image
                      src={commitment.image}
                      alt={commitment.title}
                      width={400}
                      height={240}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  </div>
                ) : (
                  <div className="mb-4 text-amber-400 text-4xl">
                    {commitment.icon}
                  </div>
                )}

                <h3 className="text-lg font-semibold text-amber-200 mb-2 group-hover:text-amber-300 transition-colors duration-500">
                  {commitment.href ? (
                    <Link href={commitment.href} className="hover:underline">
                      {commitment.title}
                    </Link>
                  ) : (
                    commitment.title
                  )}
                </h3>
                <p className="text-zinc-300/90 text-sm leading-relaxed group-hover:text-zinc-200/90 transition-colors duration-500">
                  {commitment.description}
                </p>

                {/* Overlay doré subtil en hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Ombre dorée floue en arrière-plan au hover */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/10 to-amber-300/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
