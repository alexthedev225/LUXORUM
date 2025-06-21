import { useState } from "react";
import Modal from "./Modal";
import { motion } from "framer-motion";
import { Edit, Plus, Trash2 } from "lucide-react";


// Addresses Section
const AddressesSection = ({ addresses }: { addresses: Address[] }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-2xl border border-amber-400/20 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text">
            Mes adresses
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
          {addresses.map((address) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/60 rounded-xl border border-zinc-800/50 p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-white/95 font-medium">
                      {address.name}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        address.type === "shipping"
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-green-500/20 text-green-300"
                      }`}
                    >
                      {address.type === "shipping"
                        ? "Livraison"
                        : "Facturation"}
                    </span>
                    {address.isDefault && (
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-amber-500/20 text-amber-300">
                        Par défaut
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-300/90 text-sm">
                    {address.street}
                    <br />
                    {address.postalCode} {address.city}
                    <br />
                    {address.country}
                  </p>
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
        title="Ajouter une adresse"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Nom de l'adresse
            </label>
            <input
              type="text"
              placeholder="Ex: Domicile, Bureau..."
              className="w-full bg-black/60 border border-zinc-800/50 rounded-xl px-3 py-2 text-white/95 focus:border-amber-400/30 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Adresse</label>
            <input
              type="text"
              className="w-full bg-black/60 border border-zinc-800/50 rounded-xl px-3 py-2 text-white/95 focus:border-amber-400/30 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Code postal
              </label>
              <input
                type="text"
                className="w-full bg-black/60 border border-zinc-800/50 rounded-xl px-3 py-2 text-white/95 focus:border-amber-400/30 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Ville</label>
              <input
                type="text"
                className="w-full bg-black/60 border border-zinc-800/50 rounded-xl px-3 py-2 text-white/95 focus:border-amber-400/30 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Type d'adresse
            </label>
            <select className="w-full bg-black/60 border border-zinc-800/50 rounded-xl px-3 py-2 text-white/95 focus:border-amber-400/30 focus:outline-none">
              <option value="shipping">Livraison</option>
              <option value="billing">Facturation</option>
            </select>
          </div>
          <button className="w-full px-4 py-3 bg-amber-500 hover:bg-amber-600 text-black rounded-xl transition-colors font-medium">
            Ajouter l'adresse
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default AddressesSection;