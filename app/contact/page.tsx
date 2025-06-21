"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  Clock,
  Star,
} from "lucide-react";

// Composant ContactHero optimisé
function ContactHero() {
  return (
    <section className="relative py-24  md:py-32 bg-gradient-to-b from-black via-zinc-950 to-black rounded-2xl overflow-hidden">
      {/* Background decoratif avec layers multiples */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent" />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, #fbbf2415 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, #fbbf2415 0%, transparent 50%)",
              "radial-gradient(circle at 50% 20%, #fbbf2415 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, #fbbf2415 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4">
              <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
                Contactez-nous
              </span>
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto" />
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-zinc-300/90 font-light leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Excellence et raffinement à votre service.
            <span className="text-amber-300/80">
              {" "}
              Nous serons ravis de répondre à toutes vos demandes.
            </span>
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-2 text-sm text-zinc-400/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Star className="w-4 h-4 text-amber-400/60" />
            <span>Service client premium disponible 7j/7</span>
            <Star className="w-4 h-4 text-amber-400/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Composant ContactForm optimisé
function ContactForm() {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  }>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  console.log("handleSubmit déclenché");

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("subject", formData.subject);
      form.append("message", formData.message);

      const res = await fetch("/api/contact", {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi");

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error("Erreur soumission :", err);
      // Tu peux ici afficher une erreur à l'utilisateur
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    field: "name" | "email" | "subject" | "message",
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-8 "
      >
        <div className="space-y-3 ">
          <h2 className="text-2xl md:text-3xl font-light">
            <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
              Envoyez-nous un message
            </span>
          </h2>
          <p className="text-zinc-400/90 text-sm">
            Tous les champs sont requis pour un traitement optimal de votre
            demande
          </p>
        </div>

        <div className="space-y-6">
          {/* Nom */}
          <motion.div
            className="space-y-2"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <label
              htmlFor="name"
              className="block text-sm text-zinc-400/90 font-light tracking-wide"
            >
              Nom complet
            </label>
            <div className="relative group">
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-4 py-4 bg-gradient-to-br from-zinc-900/50 via-black/30 to-zinc-900/50 border border-zinc-800/50 rounded-xl text-white/95 focus:border-amber-400/30 focus:ring-2 focus:ring-amber-400/10 transition-all duration-300 placeholder:text-zinc-600 group-hover:border-amber-400/20"
                placeholder="Votre nom complet"
                required
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            className="space-y-2"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <label
              htmlFor="email"
              className="block text-sm text-zinc-400/90 font-light tracking-wide"
            >
              Adresse email
            </label>
            <div className="relative group">
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-4 py-4 bg-gradient-to-br from-zinc-900/50 via-black/30 to-zinc-900/50 border border-zinc-800/50 rounded-xl text-white/95 focus:border-amber-400/30 focus:ring-2 focus:ring-amber-400/10 transition-all duration-300 placeholder:text-zinc-600 group-hover:border-amber-400/20"
                placeholder="votre@email.com"
                required
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </motion.div>

          {/* Sujet */}
          <motion.div
            className="space-y-2"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <label
              htmlFor="subject"
              className="block text-sm text-zinc-400/90 font-light tracking-wide"
            >
              Sujet de la demande
            </label>
            <div className="relative group">
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                className="w-full px-4 py-4 bg-gradient-to-br from-zinc-900/50 via-black/30 to-zinc-900/50 border border-zinc-800/50 rounded-xl text-white/95 focus:border-amber-400/30 focus:ring-2 focus:ring-amber-400/10 transition-all duration-300 placeholder:text-zinc-600 group-hover:border-amber-400/20"
                placeholder="Sujet de votre message"
                required
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            className="space-y-2"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <label
              htmlFor="message"
              className="block text-sm text-zinc-400/90 font-light tracking-wide"
            >
              Votre message
            </label>
            <div className="relative group">
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="w-full px-4 py-4 bg-gradient-to-br from-zinc-900/50 via-black/30 to-zinc-900/50 border border-zinc-800/50 rounded-xl text-white/95 focus:border-amber-400/30 focus:ring-2 focus:ring-amber-400/10 transition-all duration-300 placeholder:text-zinc-600 resize-none group-hover:border-amber-400/20"
                placeholder="Décrivez votre demande en détail..."
                required
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </motion.div>

          {/* Bouton d'envoi */}
          <motion.button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className="relative w-full py-4 px-6 bg-gradient-to-r from-amber-400/10 via-amber-300/15 to-amber-400/10 hover:from-amber-400/20 hover:via-amber-300/25 hover:to-amber-400/20 text-amber-200 border border-amber-400/20 hover:border-amber-400/40 rounded-xl transition-all duration-500 font-light tracking-wide text-lg group overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.div
                  key="submitting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-3"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-amber-400/30 border-t-amber-400 rounded-full"
                  />
                  Envoi en cours...
                </motion.div>
              ) : isSubmitted ? (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-3"
                >
                  <Check className="w-5 h-5" />
                  Message envoyé avec succès !
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-3"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  Envoyer le message
                </motion.div>
              )}
            </AnimatePresence>

            {/* Effet de lueur au hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
          </motion.button>
        </div>
      </motion.div>
    </form>
  );
}

// Composant ContactInfo optimisé
function ContactInfo() {
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
      description: "Réponse sous 2h ouvrées",
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: "+225 01 23 45 67 89",
      href: "tel:+2250123456789",
      description: "Service client premium",
    },
    {
      icon: MapPin,
      label: "Adresse",
      value: "8 Place Vendôme, 00225 Abidjan, Côte d'Ivoire",
      description: "Showroom sur rendez-vous",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="space-y-12"
    >
      {/* Section Information avec cartes élégantes */}
      <div className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-light">
            <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
              Informations de contact
            </span>
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-amber-400/60 to-transparent" />
        </div>

        <div className="space-y-4">
          {contactDetails.map((detail, index) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="group"
            >
              <div className="flex gap-4 p-4 rounded-xl bg-gradient-to-br from-zinc-900/30 via-black/20 to-zinc-900/30 border border-zinc-800/30 hover:border-amber-400/20 transition-all duration-300 hover:bg-gradient-to-br hover:from-zinc-900/50 hover:via-black/30 hover:to-zinc-900/50">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400/10 to-amber-600/10 border border-amber-400/20 flex items-center justify-center group-hover:border-amber-400/30 transition-colors duration-300">
                    <detail.icon className="w-5 h-5 text-amber-300/80 group-hover:text-amber-200 transition-colors duration-300" />
                  </div>
                </div>
                <div className="space-y-1 flex-1">
                  <p className="text-xs tracking-[0.3em] text-zinc-400/90 uppercase font-light">
                    {detail.label}
                  </p>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="block text-white/95 hover:text-amber-200 transition-colors duration-300 font-light"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="text-white/95 font-light">{detail.value}</p>
                  )}
                  <p className="text-xs text-zinc-400/70">
                    {detail.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section Horaires avec design premium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-amber-400/80" />
          <h3 className="text-lg text-amber-200/90 font-light">
            Horaires d'ouverture
          </h3>
        </div>

        <div className="bg-gradient-to-br from-zinc-900/30 via-black/20 to-zinc-900/30 border border-zinc-800/30 rounded-xl p-6">
          <div className="space-y-3">
            {[
              {
                days: "Lundi - Vendredi",
                hours: "10:00 - 19:00",
                isOpen: true,
              },
              { days: "Samedi", hours: "10:00 - 18:00", isOpen: true },
              { days: "Dimanche", hours: "Fermé", isOpen: false },
            ].map((schedule, index) => (
              <motion.div
                key={schedule.days}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="flex justify-between items-center py-2 border-b border-zinc-800/20 last:border-b-0"
              >
                <span className="text-zinc-300/90 font-light">
                  {schedule.days}
                </span>
                <span
                  className={`font-light ${
                    schedule.isOpen ? "text-white/95" : "text-zinc-500"
                  }`}
                >
                  {schedule.hours}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Section Réseaux Sociaux avec animations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="space-y-6"
      >
        <h3 className="text-lg text-amber-200/90 font-light">Suivez-nous</h3>
        <div className="flex gap-4">
          {socialLinks.map(({ icon: Icon, href, label }, index) => (
            <motion.a
              key={label}
              href={href}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 rounded-xl bg-gradient-to-br from-zinc-900/50 via-black/30 to-zinc-900/50 border border-zinc-800/50 hover:border-amber-400/30 transition-all duration-300 group overflow-hidden"
            >
              <Icon className="w-5 h-5 text-zinc-400 group-hover:text-amber-200 transition-colors duration-300 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Composant principal
export default function ContactPage() {
  return (
    <div className="min-h-screen  via-zinc-950 to-black">
      <div className="space-y-2                                                                                    pb-8">
        <ContactHero />
        <div className="container mx-auto ">
          <motion.div
            className="bg-black backdrop-blur-sm border border-zinc-800/30 rounded-2xl p-8 md:p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Background decoratif */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 ">
              <ContactForm />
              <ContactInfo />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
