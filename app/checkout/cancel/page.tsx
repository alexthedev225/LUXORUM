"use client";

import { motion } from "framer-motion";
import { XCircle, Sparkles } from "lucide-react";

export default function CheckoutCancelPage() {


  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden rounded-2xl mb-2">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-t from-red-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-t from-red-500/3 to-transparent rounded-full blur-3xl" />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2,
          }}
          className="max-w-md w-full bg-gradient-to-br from-zinc-900 via-black to-zinc-900 p-8 rounded-2xl border border-red-500/20 shadow-2xl text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent rounded-2xl" />

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="mb-6 relative"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500/20 to-red-400/10 rounded-full flex items-center justify-center border border-red-500/30 relative">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-red-500/20 rounded-full blur-md"
              />
              <XCircle className="w-10 h-10 text-red-500" strokeWidth={3} />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-6 h-6 text-red-400/70" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-1 -left-1"
            >
              <Sparkles className="w-4 h-4 text-red-500/50" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-200 via-red-100 to-red-200 text-transparent bg-clip-text"
          >
            Paiement annulé
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-zinc-300/90 mb-8 leading-relaxed"
          >
            Le processus de paiement a été annulé. Vous pouvez réessayer ou
            modifier votre commande.
          </motion.p>

          <motion.a
            href="/"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="block w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 relative overflow-hidden group"
          >
            <motion.div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Retour à l&apos;accueil</span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
