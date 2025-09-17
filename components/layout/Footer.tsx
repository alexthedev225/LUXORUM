"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Twitter, Linkedin } from "lucide-react";
import { useIsAuthOrAdminPage } from "@/hooks/useIsAuthPage";

export function Footer() {
  const socialIcons = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const footerLinks = {
    navigation: [
      { label: "Accueil", href: "/" },
      { label: "Boutique", href: "/boutique" },
      { label: "À propos", href: "/a-propos" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "CGV", href: "/conditions-generales" },
      { label: "Politique de confidentialité", href: "/confidentialite" },
      { label: "FAQ", href: "/faq" },
    ],
  };

  const isAuthPage = useIsAuthOrAdminPage();
  if (isAuthPage) return null;

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-sans">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-neutral-300 hover:text-white font-sans tracking-wide transition-colors duration-300"
                    aria-label={label}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-sans">
              Légal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-neutral-300 hover:text-white font-sans tracking-wide transition-colors duration-300"
                    aria-label={label}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-sans">
              Contact
            </h4>
            <div className="space-y-3">
              <p className="text-sm text-neutral-300 font-sans">
                contact@luxorum.com
              </p>
              <p className="text-sm text-neutral-300 font-sans">
                +225 01 23 45 67 89
              </p>
              <p className="text-sm text-neutral-300 font-sans">
                8 Place Vendôme
                <br />
                00225 Abidjan, Côte d'Ivoire
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-sans">
              Suivez-nous
            </h4>
            <div className="flex gap-4">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="group"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5 text-neutral-300 group-hover:text-white transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-800 text-center">
          <p className="text-xs text-neutral-400 font-sans tracking-wide">
            © {new Date().getFullYear()} LUXORUM. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
