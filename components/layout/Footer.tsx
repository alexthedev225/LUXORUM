"use client";

import Link from "next/link";
import { Instagram, Twitter, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const socialIcons = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-[#000000] pt-24 pb-12 rounded-tl-2xl rounded-tr-2xl mx-4 lg:mx-10">
      <div className="container mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {/* Branding */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <Link href="/" className="block">
              <h3 className="cinzel-decorative-black font-serif text-2xl text-amber-200/90 tracking-wide">
                LUXORUM
              </h3>
              <p className="mt-2 text-sm text-zinc-400 font-light tracking-wider">
                L'élégance au masculin
              </p>
            </Link>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] text-amber-200/70">
              Navigation
            </h4>
            <ul className="space-y-4">
              {["Boutique", "À propos", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 tracking-wide font-light"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Légal */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] text-amber-200/70">
              Légal
            </h4>
            <ul className="space-y-4">
              {["Mentions légales", "CGV", "Confidentialité"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 tracking-wide font-light"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] text-amber-200/70">
              Suivez-nous
            </h4>
            <div className="flex gap-6">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="group relative p-2"
                  aria-label={label}
                >
                  <div className="absolute inset-0 rounded-full border border-amber-200/0 group-hover:border-amber-200/20 transition-colors duration-300" />
                  <Icon className="h-5 w-5 text-zinc-400 group-hover:text-amber-200/90 transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-24 pt-8 border-t border-zinc-800"
        >
          <p className="text-center text-sm text-zinc-500 font-light tracking-wide">
            © {new Date().getFullYear()} LUXORUM. Tous droits réservés.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
