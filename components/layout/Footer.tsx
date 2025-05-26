"use client";

import Link from "next/link";
import { Instagram, Twitter, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { useIsAuthOrAdminPage } from "@/hooks/useIsAuthPage";


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

  const footerLinks = {
    navigation: ["Boutique", "Collections", "À propos", "Contact"],
    legal: ["Mentions légales", "CGV", "Politique de confidentialité", "FAQ"],
  };
  const isAuthPage = useIsAuthOrAdminPage();

  if (isAuthPage) return null;
  return (
    <footer className="bg-black pt-24 pb-12 rounded-t-3xl">
      {/* Navigation et liens */}
      <div className="container mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Navigation */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] text-amber-200/70">
              Navigation
            </h4>
            <ul className="space-y-4">
              {footerLinks.navigation.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-zinc-400 hover:text-white tracking-wide font-light transition-colors"
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
              {footerLinks.legal.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-zinc-400 hover:text-white tracking-wide font-light transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] text-amber-200/70">
              Contact
            </h4>
            <div className="space-y-4">
              <p className="text-sm text-zinc-400 font-light">
                contact@luxorum.com
              </p>
              <p className="text-sm text-zinc-400 font-light">
                +33 1 23 45 67 89
              </p>
              <p className="text-sm text-zinc-400 font-light">
                8 Place Vendôme
                <br />
                75001 Paris, France
              </p>
            </div>
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
                  <div className="absolute inset-0 rounded-full border border-amber-200/0 group-hover:border-amber-200/20 transition-colors" />
                  <Icon className="h-5 w-5 text-zinc-400 group-hover:text-amber-200/90 transition-colors" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
        {/* Grand titre centré en bas */}
        <div className="w-full mt-10 flex justify-center overflow-visible">
          <h1 className="cinzel-decorative-black text-[25vw] md:text-[20vw] lg:text-[12vw] text-amber-200 tracking-tight break-words max-w-full font-bold text-center">
            LUXORUM
          </h1>
        </div>

        {/* Copyright */}
        <motion.div
          variants={fadeInUp}
          className="mt-10 pt-8 border-t border-zinc-800/50"
        >
          <p className="text-center text-sm text-zinc-500 font-light tracking-wide">
            © {new Date().getFullYear()} LUXORUM. Tous droits réservés.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
