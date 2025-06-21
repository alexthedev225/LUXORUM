import { CreditCard, Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";

// Payment Methods Section
const PaymentMethodsSection = ({
  paymentMethods,
}: {
  paymentMethods: PaymentMethod[];
}) => {
  const [showModal, setShowModal] = useState(false);

  const getCardIcon = (type: string) => {
    // Retourne l'icône appropriée selon le type de carte
    return <CreditCard className="w-6 h-6" />;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-2xl border border-amber-400/20 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text">
            Moyens de paiement
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Ajouter</span>
          </button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/60 rounded-xl border border-zinc-800/50 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-amber-300/90">
                    {getCardIcon(method.type)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-white/95 font-medium">
                        •••• •••• •••• {method.last4}
                      </h3>
                      {method.isDefault && (
                        <span className="px-2 py-1 rounded-md text-xs font-medium bg-amber-500/20 text-amber-300">
                          Par défaut
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-400 text-sm">
                      Expire {method.expiryMonth.toString().padStart(2, "0")}/
                      {method.expiryYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-zinc-400 hover:text-amber-300 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-zinc-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Ajouter une carte"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Numéro de carte
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full bg-black/60 border border-zinc-800/50 rounded-xl px-3 py-2 text-white/95 focus:border-amber-400/30 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Date d'expiration
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full bg-black/60 border border-zinc-800/50 rounded-xl px-3 py-2 text-white/95 focus:border-amber-400/30 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full bg-black/60 border border-zinc-800/50 rounded-xl px-3 py-2 text-white/95 focus:border-amber-400/30 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Nom sur la carte
            </label>
            <input
              type="text"
              className="w-full bg-black/60 border border-zinc-800/50 rounded-xl px-3 py-2 text-white/95 focus:border-amber-400/30 focus:outline-none"
            />
          </div>
          <button className="w-full px-4 py-3 bg-amber-500 hover:bg-amber-600 text-black rounded-xl transition-colors font-medium">
            Ajouter la carte
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default PaymentMethodsSection;