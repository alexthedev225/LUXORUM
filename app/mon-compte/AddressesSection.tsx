"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash2, MapPin, Home, Briefcase, X } from "lucide-react";

interface Address {
  _id: string;
  label?: string;
  street: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
}

interface AddressesSectionProps {
  addresses: Address[];
}

interface FormData {
  label?: string;
  street: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
}

const citiesCI = ["Abidjan", "Bouaké", "Daloa", "Korhogo", "San-Pédro"];
const postalCodesCI = ["00225", "00226", "00227", "00228"];

const getIconForLabel = (label?: string) => {
  if (!label) return MapPin;

  switch (label.toLowerCase()) {
    case "domicile":
      return Home;
    case "bureau":
      return Briefcase;
    default:
      return MapPin;
  }
};


const AddressesSection = ({ addresses }: AddressesSectionProps) => {

  const [addressList, setAddressList] = useState<Address[]>(addresses);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    label: "",
    street: "",
    postalCode: "",
    city: "",
    state: "",
    country: "Côte d'Ivoire",
  });

  const openEditModal = (address: Address) => {
    setFormData({
      label: address.label || "",
      street: address.street,
      postalCode: address.postalCode,
      city: address.city,
      state: address.state,
      country: address.country,
    });
    setEditingAddressId(address._id.toString());
  };

  const closeModal = () => {
    setEditingAddressId(null);
    setFormData({
      label: "",
      street: "",
      postalCode: "",
      city: "",
      state: "",
      country: "Côte d'Ivoire",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!editingAddressId) return;

    try {
      const response = await fetch(
        `/api/account/addresses/${editingAddressId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      const updatedAddress = await response.json();
      setAddressList((prev) =>
        prev.map((addr) =>
          addr._id.toString() === editingAddressId ? updatedAddress : addr
        )
      );
      closeModal();
    } catch (error) {
      alert("Erreur lors de la modification de l'adresse.");
      console.error(error);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette adresse ?")) return;
    try {
      const response = await fetch(`/api/account/addresses/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      setAddressList((prev) =>
        prev.filter((addr) => addr._id.toString() !== id)
      );
    } catch (error) {
      alert("Erreur lors de la suppression de l'adresse.");
      console.error(error);
    }
  };

  return (
    <div className="grid gap-6 sm:gap-8 md:gap-10">
      {addressList.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-amber-400/10 rounded-full blur-3xl scale-150"></div>
            <div className="relative bg-zinc-900/50 border border-zinc-800/40 rounded-2xl p-16 backdrop-blur-sm">
              <MapPin className="w-20 h-20 text-amber-400/60 mx-auto mb-8" />
              <h3 className="text-2xl font-light text-white mb-4 tracking-wide">
                Aucune adresse enregistrée
              </h3>
              <p className="text-zinc-400 text-lg font-light max-w-md mx-auto leading-relaxed">
                Commencez par ajouter votre première adresse de livraison pour
                une expérience optimale
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <AnimatePresence>
          {addressList.map((address, index) => {
            const IconComponent = getIconForLabel(address.label);
            return (
              <motion.article
                key={address._id.toString()}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group relative bg-black border border-zinc-800/60 rounded-lg overflow-hidden hover:border-amber-400/40 transition-all duration-300"
              >
                <header className="relative border-b border-zinc-800/40 bg-zinc-900/30 px-6 py-4 flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-md bg-amber-400/10 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-amber-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold text-white truncate">
                      {address.label || "Adresse"}
                    </h2>
                    <p className="text-zinc-400 text-sm mt-1 truncate">
                      {address.street}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => openEditModal(address)}
                      aria-label={`Modifier l'adresse ${address.label || ""}`}
                      className="p-2 text-zinc-400 hover:text-amber-400 hover:bg-amber-400/10 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteAddress(address._id.toString())
                      }
                      aria-label={`Supprimer l'adresse ${address.label || ""}`}
                      className="p-2 ml-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400/50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </header>

                <div className="px-6 py-4 space-y-2 text-zinc-300 text-sm leading-relaxed">
                  <p>
                    <span className="font-semibold text-white">Rue :</span>{" "}
                    {address.street}
                  </p>
                  <p className="flex flex-wrap items-center space-x-2 text-zinc-400">
                    <span>{address.postalCode}</span>
                    <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                    <span>{address.city}</span>
                    <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                    <span>{address.state}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-white">Pays :</span>{" "}
                    {address.country}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      )}

      {/* Edit Modal */}
      {editingAddressId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          ></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-zinc-900/95 border border-zinc-800/40 rounded-2xl p-6 sm:p-8 max-w-md sm:max-w-xl w-full mx-auto backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-address-title"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent rounded-2xl pointer-events-none"></div>

            <div className="relative">
              <header className="flex items-center justify-between mb-6">
                <h2
                  id="edit-address-title"
                  className="text-2xl font-light text-white tracking-wide"
                >
                  Modifier l&apos;adresse
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800/50 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  aria-label="Fermer le formulaire de modification"
                >
                  <X className="w-5 h-5" />
                </button>
              </header>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
                className="space-y-5"
              >
                {/* Form fields identiques à ton code initial */}
                <div>
                  <label
                    htmlFor="label"
                    className="block text-sm font-light text-zinc-400 mb-2 tracking-wide"
                  >
                    Nom de l&apos;adresse
                  </label>
                  <input
                    id="label"
                    name="label"
                    type="text"
                    placeholder="Domicile, Bureau, Autre..."
                    className="w-full bg-zinc-800/50 border border-zinc-700/30 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition duration-300"
                    value={formData.label || ""}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label
                    htmlFor="street"
                    className="block text-sm font-light text-zinc-400 mb-2 tracking-wide"
                  >
                    Adresse complète *
                  </label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    placeholder="Rue, Avenue, Immeuble, Appartement..."
                    className="w-full bg-zinc-800/50 border border-zinc-700/30 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition duration-300"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    autoComplete="address-line1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-light text-zinc-400 mb-2 tracking-wide"
                  >
                    Région / État *
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    placeholder="Abidjan, Bouaké, Daloa..."
                    className="w-full bg-zinc-800/50 border border-zinc-700/30 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition duration-300"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    autoComplete="address-level1"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-light text-zinc-400 mb-2 tracking-wide"
                    >
                      Code postal *
                    </label>
                    <select
                      id="postalCode"
                      name="postalCode"
                      className="w-full bg-zinc-800/50 border border-zinc-700/30 rounded-xl px-4 py-3 text-white focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition duration-300"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Sélectionner...</option>
                      {postalCodesCI.map((code) => (
                        <option
                          key={code}
                          value={code}
                          className="bg-zinc-800 text-white"
                        >
                          {code}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-light text-zinc-400 mb-2 tracking-wide"
                    >
                      Ville *
                    </label>
                    <select
                      id="city"
                      name="city"
                      className="w-full bg-zinc-800/50 border border-zinc-700/30 rounded-xl px-4 py-3 text-white focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition duration-300"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Sélectionner...</option>
                      {citiesCI.map((city) => (
                        <option
                          key={city}
                          value={city}
                          className="bg-zinc-800 text-white"
                        >
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-light text-zinc-400 mb-2 tracking-wide"
                  >
                    Pays
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    readOnly
                    className="w-full bg-zinc-800/30 border border-zinc-700/20 rounded-xl px-4 py-3 text-zinc-400 cursor-not-allowed"
                    value={formData.country}
                    required
                    aria-readonly="true"
                  />
                </div>

                <div className="pt-5 border-t border-zinc-800/30">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-medium py-4 rounded-xl transition duration-300 tracking-wide"
                  >
                    Enregistrer les modifications
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AddressesSection;
