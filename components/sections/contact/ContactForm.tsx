"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      <h2 className="cinzel-decorative-black text-2xl md:text-3xl">
        <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
          Envoyez-nous un message
        </span>
      </h2>

      <form className="space-y-6">
        {/* Nom */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm text-zinc-400 font-light"
          >
            Nom
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-white focus:border-amber-200/30 focus:ring-1 focus:ring-amber-200/20 transition-colors placeholder:text-zinc-600"
            placeholder="Votre nom"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm text-zinc-400 font-light"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-white focus:border-amber-200/30 focus:ring-1 focus:ring-amber-200/20 transition-colors placeholder:text-zinc-600"
            placeholder="votre@email.com"
          />
        </div>

        {/* Sujet */}
        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="block text-sm text-zinc-400 font-light"
          >
            Sujet
          </label>
          <input
            type="text"
            id="subject"
            className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-white focus:border-amber-200/30 focus:ring-1 focus:ring-amber-200/20 transition-colors placeholder:text-zinc-600"
            placeholder="Sujet de votre message"
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="block text-sm text-zinc-400 font-light"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={6}
            className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-white focus:border-amber-200/30 focus:ring-1 focus:ring-amber-200/20 transition-colors placeholder:text-zinc-600 resize-none"
            placeholder="Votre message..."
          />
        </div>

        {/* Bouton d'envoi */}
        <Button className="w-full py-6 bg-gradient-to-r from-amber-200/10 via-amber-300/10 to-amber-200/10 hover:bg-amber-300/20 text-amber-200 border border-amber-200/20 hover:border-amber-200/40 transition-all duration-500">
          Envoyer
        </Button>
      </form>
    </motion.div>
  );
}
