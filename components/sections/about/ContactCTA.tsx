"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ContactCTA() {
  return (
    <section className="relative py-32 bg-black rounded-2xl overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
      </div>

      <div className="relative container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <h2 className="cinzel-decorative-black text-3xl md:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
              Votre histoire commence ici
            </span>
          </h2>
          <p className="text-lg text-zinc-400 font-light">
            Découvrez notre collection exclusive ou contactez-nous pour une
            création sur mesure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              asChild
              className="bg-amber-200/10 text-amber-200 hover:bg-amber-200/20 border border-amber-200/20"
            >
              <Link href="/contact">Nous contacter</Link>
            </Button>
            <Button
              asChild
              className="bg-transparent text-zinc-400 hover:text-amber-200 border border-zinc-800 hover:border-amber-200/20"
            >
              <Link href="/boutique">Explorer la boutique</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
