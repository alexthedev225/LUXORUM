"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Award, Sparkles, Users, Calendar } from "lucide-react";

// Simulation des composants manquants
const Image = ({ src, alt, fill, className, sizes, priority, ...props }) => (
  <img
    src={src || "/api/placeholder/600/800"}
    alt={alt}
    className={className}
    style={fill ? { width: "100%", height: "100%", objectFit: "cover" } : {}}
    {...props}
  />
);

const Link = ({ href, children, className, ...props }) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

export function AboutSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden rounded-2xl">
      {/* Fond décoratif sophistiqué */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:50px_50px] opacity-15" />
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-gradient-to-r from-amber-400/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-l from-amber-300/6 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <motion.div
        className="container px-8 mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
          {/* Contenu textuel enrichi */}
          <motion.div
            className="space-y-12 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {/* Header avec badge */}
            <header className="space-y-6">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Award className="w-4 h-4 text-amber-300/90" />
                <span className="text-xs tracking-[0.3em] text-zinc-400/90 uppercase font-light">
                  Depuis 2025
                </span>
              </motion.div>

              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <span className="cinzel-decorative-black block bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text">
                  L'excellence
                </span>
                <span className="block text-white/95 font-light text-2xl md:text-3xl mt-2 tracking-wide">
                  au masculin
                </span>
              </motion.h2>
            </header>

            {/* Contenu principal */}
            <div className="space-y-8">
              <motion.p
                className="text-lg text-zinc-300/90 leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                LUXORUM incarne l'alliance parfaite entre tradition joaillière
                et modernité. Notre maison se dédie à l'homme contemporain qui
                assume son goût pour le raffinement et l'excellence.
              </motion.p>

              <motion.p
                className="text-zinc-400/90 leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Chaque pièce LUXORUM est le fruit d'un savoir-faire artisanal
                exceptionnel, sélectionnée pour sa capacité à sublimer la
                personnalité de celui qui la porte. Notre vision : créer des
                bijoux qui deviennent les témoins silencieux de votre réussite.
              </motion.p>
            </div>

            {/* Statistiques élégantes */}
            <motion.div
              className="grid grid-cols-3 gap-8 py-8 border-y border-zinc-800/50"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <div className="text-center space-y-2">
                <div className="text-2xl text-amber-300/90 font-light">25+</div>
                <div className="text-xs text-zinc-400/90 tracking-wider uppercase">
                  Années
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl text-amber-300/90 font-light">18K</div>
                <div className="text-xs text-zinc-400/90 tracking-wider uppercase">
                  Or Pur
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl text-amber-300/90 font-light">∞</div>
                <div className="text-xs text-zinc-400/90 tracking-wider uppercase">
                  Prestige
                </div>
              </div>
            </motion.div>

            {/* CTA amélioré */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <Link
                href="/notre-histoire"
                className="group relative inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20 rounded-full hover:border-amber-400/40 transition-all duration-500 hover:shadow-lg hover:shadow-amber-400/10"
              >
                <span className="text-sm text-amber-200/90 group-hover:text-white tracking-wider uppercase font-medium">
                  Découvrir notre histoire
                </span>
                <ArrowRight className="w-4 h-4 text-amber-300/90 group-hover:translate-x-1 transition-transform duration-300" />

                {/* Effet de gradient au hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-amber-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image sophistiquée */}
          <motion.div
            className="relative aspect-[3/4] lg:aspect-[4/5] lg:order-2"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            {/* Container avec bordures dorées */}
            <div className="relative h-full rounded-2xl overflow-hidden border border-amber-400/20 hover:border-amber-400/30 transition-colors duration-700 group">
              {/* Overlay sophistiqué */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent z-20" />

              {/* Image principale */}
              <Image
                src="/hand.png"
                alt="Homme élégant portant des bijoux LUXORUM"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />

              {/* Éléments décoratifs */}
              <div className="absolute top-4 right-4 z-30">
                <motion.div
                  className="w-3 h-3 bg-amber-400/60 rounded-full"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              <div className="absolute bottom-4 left-4 z-30">
                <motion.div
                  className="w-2 h-2 bg-amber-300/40 rounded-full"
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: 1.5,
                  }}
                />
              </div>

              {/* Badge qualité sur l'image */}
              <motion.div
                className="absolute bottom-6 left-6 z-30 flex items-center gap-2 px-4 py-2 bg-black/80 border border-amber-400/30 rounded-full backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <Sparkles className="w-4 h-4 text-amber-300/90" />
                <span className="text-xs text-zinc-300/90 tracking-wider uppercase">
                  Artisanal
                </span>
              </motion.div>

              {/* Effet de lueur au hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none">
                <div className="absolute inset-px rounded-2xl bg-gradient-to-tr from-amber-400/10 via-transparent to-amber-300/5" />
              </div>
            </div>

            {/* Cadre décoratif externe */}
            <div className="absolute -inset-4 border border-zinc-800/30 rounded-3xl pointer-events-none" />
          </motion.div>
        </div>

        {/* Section valeurs ajoutée */}
        <motion.div
          className="mt-24 pt-16 border-t border-zinc-800/50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-amber-300/90" />
              </div>
              <h4 className="text-white/95 font-medium">Savoir-faire</h4>
              <p className="text-sm text-zinc-400/90 leading-relaxed">
                Artisans experts perpétuant des techniques séculaires
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-300/90" />
              </div>
              <h4 className="text-white/95 font-medium">Excellence</h4>
              <p className="text-sm text-zinc-400/90 leading-relaxed">
                Matériaux nobles et finitions irréprochables
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-amber-300/90" />
              </div>
              <h4 className="text-white/95 font-medium">Héritage</h4>
              <p className="text-sm text-zinc-400/90 leading-relaxed">
                Tradition joaillière transmise de génération en génération
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
