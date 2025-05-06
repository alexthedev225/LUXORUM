"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@luxorum.com",
    href: "mailto:contact@luxorum.com",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+33 1 23 45 67 89",
    href: "tel:+33123456789",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: "8 Place Vendôme, 75001 Paris",
    multiline: true,
  },
];

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="space-y-12"
    >
      {/* Section Information */}
      <div className="space-y-8">
        <h2 className="cinzel-decorative-black text-2xl md:text-3xl">
          <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
            Informations
          </span>
        </h2>

        <div className="space-y-6">
          {contactDetails.map((detail) => (
            <div key={detail.label} className="flex gap-4">
              <detail.icon className="w-5 h-5 text-amber-200/80 shrink-0 mt-1" />
              <div className="space-y-1">
                <p className="text-sm text-zinc-400">{detail.label}</p>
                {detail.href ? (
                  <Link
                    href={detail.href}
                    className="text-white hover:text-amber-200 transition-colors duration-300"
                  >
                    {detail.value}
                  </Link>
                ) : (
                  <p className="text-white">{detail.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Horaires */}
      <div className="space-y-4">
        <h3 className="text-lg text-amber-200/90">Horaires d'ouverture</h3>
        <div className="space-y-2 text-sm">
          <p className="flex justify-between">
            <span className="text-zinc-400">Lundi - Vendredi</span>
            <span className="text-white">10:00 - 19:00</span>
          </p>
          <p className="flex justify-between">
            <span className="text-zinc-400">Samedi</span>
            <span className="text-white">10:00 - 18:00</span>
          </p>
          <p className="flex justify-between">
            <span className="text-zinc-400">Dimanche</span>
            <span className="text-white">Fermé</span>
          </p>
        </div>
      </div>

      {/* Section Réseaux Sociaux */}
      <div className="space-y-4">
        <h3 className="text-lg text-amber-200/90">Suivez-nous</h3>
        <div className="flex gap-4">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <Link
              key={label}
              href={href}
              className="p-2 rounded-lg border border-zinc-800 hover:border-amber-200/20 transition-colors duration-300 group"
            >
              <Icon className="w-5 h-5 text-zinc-400 group-hover:text-amber-200 transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
