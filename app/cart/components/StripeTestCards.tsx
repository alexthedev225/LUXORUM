import React from "react";
import { motion } from "framer-motion";
import { CreditCard, Shield, AlertTriangle } from "lucide-react";

const testCards = [
  {
    number: "4242 4242 4242 4242",
    cvc: "123",
    exp: "12/34",
    description: "Carte de test valide",
    icon: CreditCard,
    status: "success",
  },
  {
    number: "4000 0000 0000 9995",
    cvc: "123",
    exp: "12/34",
    description: "Carte de test qui échoue au paiement",
    icon: AlertTriangle,
    status: "error",
  },
  {
    number: "4000 0566 5566 5556",
    cvc: "123",
    exp: "12/34",
    description: "Carte de test nécessite authentification 3D Secure",
    icon: Shield,
    status: "secure",
  },
];

const StripeTestCards: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mb-8"
    >
      {/* Conteneur principal avec overlay décoratif */}
      <div className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20 rounded-xl overflow-hidden">
        {/* Overlay pointillé subtil */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[size:20px_20px] opacity-40"></div>

        {/* Lueur d'ambiance dorée */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent"></div>

        <div className="relative p-6">
          {/* En-tête avec titre stylisé */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-lg border border-amber-400/30">
              <CreditCard className="w-5 h-5 text-amber-300/90" />
            </div>
            <div>
              <h3 className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text text-lg font-semibold tracking-wide">
                CARTES DE TEST STRIPE
              </h3>
              <p className="text-xs tracking-[0.3em] text-zinc-400/90 mt-1">
                ENVIRONNEMENT DE DÉVELOPPEMENT
              </p>
            </div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-zinc-300/90 text-sm mb-6 leading-relaxed"
          >
            Pour tester les paiements, utilisez ces numéros de carte sur la page
            Stripe.
          </motion.p>

          {/* Liste des cartes */}
          <div className="space-y-4">
            {testCards.map(
              ({ number, cvc, exp, description, icon: Icon, status }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.1 * (i + 1),
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  className="group relative bg-black/60 border border-zinc-800/50 rounded-lg overflow-hidden hover:border-amber-400/30 transition-all duration-300"
                >
                  {/* Overlay au hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative p-4">
                    <div className="flex items-start gap-4">
                      {/* Icône avec indicateur de statut */}
                      <div className="flex-shrink-0">
                        <div
                          className={`p-2 rounded-lg border transition-all duration-300 ${
                            status === "success"
                              ? "bg-green-400/10 border-green-400/30 group-hover:bg-green-400/20"
                              : status === "error"
                              ? "bg-red-400/10 border-red-400/30 group-hover:bg-red-400/20"
                              : "bg-amber-400/10 border-amber-400/30 group-hover:bg-amber-400/20"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 ${
                              status === "success"
                                ? "text-green-300/90"
                                : status === "error"
                                ? "text-red-300/90"
                                : "text-amber-300/90"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Contenu de la carte */}
                      <div className="flex-1 min-w-0">
                        {/* Numéro de carte avec espacement élégant */}
                        <div className="mb-3">
                          <span className="text-xs tracking-[0.2em] text-zinc-400/90 block mb-1">
                            NUMÉRO DE CARTE
                          </span>
                          <code className="text-white/95 font-mono text-sm tracking-wider">
                            {number}
                          </code>
                        </div>

                        {/* CVC et expiration */}
                        <div className="flex gap-6 mb-3">
                          <div>
                            <span className="text-xs tracking-[0.2em] text-zinc-400/90 block mb-1">
                              CVC
                            </span>
                            <code className="text-zinc-300/90 font-mono text-sm">
                              {cvc}
                            </code>
                          </div>
                          <div>
                            <span className="text-xs tracking-[0.2em] text-zinc-400/90 block mb-1">
                              EXPIRATION
                            </span>
                            <code className="text-zinc-300/90 font-mono text-sm">
                              {exp}
                            </code>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="border-t border-zinc-800/50 pt-3">
                          <p className="text-zinc-400/90 text-sm italic">
                            {description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Barre de lueur au hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              )
            )}
          </div>

          {/* Note de sécurité en bas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6 p-4 bg-black/80 border border-zinc-800/90 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-amber-300/90" />
              <span className="text-xs tracking-[0.3em] text-amber-300/90">
                SÉCURITÉ
              </span>
            </div>
            <p className="text-zinc-400/90 text-xs leading-relaxed">
              Ces cartes de test ne fonctionnent qu'en mode développement. Aucun
              paiement réel ne sera effectué.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default StripeTestCards;
