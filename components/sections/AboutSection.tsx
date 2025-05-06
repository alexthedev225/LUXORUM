"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section className=" py-32 bg-black relative overflow-hidden rounded-2xl">
      <motion.div
        className="container px-8 mx-auto md:pr-8 lg:pl-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Contenu textuel */}

          {/* Image */}
          <motion.div
            className="relative aspect-[3/4] lg:aspect-[4/5]"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent z-10 " />
            <Image
              src="/hand.png"
              alt="Homme élégant portant des bijoux LUXORUM"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105 rounded-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <header className="space-y-3">
              <motion.p
                className="text-zinc-400 uppercase tracking-[0.2em] text-xs font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Depuis 2025
              </motion.p>
              <motion.h2
                className="cinzel-decorative-black text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                L'excellence
                <br />
                au masculin
              </motion.h2>
            </header>

            <div className="space-y-6 font-light">
              <motion.p
                className="text-zinc-300 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                LUXORUM incarne l'alliance parfaite entre tradition joaillière
                et modernité. Notre maison se dédie à l'homme contemporain qui
                assume son goût pour le raffinement et l'excellence.
              </motion.p>
              <motion.p
                className="text-zinc-400 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Chaque pièce LUXORUM est le fruit d'un savoir-faire artisanal
                exceptionnel, sélectionnée pour sa capacité à sublimer la
                personnalité de celui qui la porte. Notre vision : créer des
                bijoux qui deviennent les témoins silencieux de votre réussite.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Link
                href="/notre-histoire"
                className="inline-block group relative px-8 py-4 text-sm uppercase tracking-widest text-amber-200/80 hover:text-white transition-colors duration-500 "
              >
                <span className="relative z-10">Découvrir notre histoire</span>
                <div className="absolute inset-0 border border-amber-200/20 group-hover:border-amber-200/40 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-200/0 via-amber-200/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
