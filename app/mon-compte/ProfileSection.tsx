import { Edit, Lock, Save } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";

 const ProfileSection = ({ userData }: { userData: UserData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editData, setEditData] = useState(userData);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-2xl border border-amber-400/20 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text">
            Informations personnelles
          </h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-xl transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isEditing ? "Annuler" : "Modifier"}
            </span>
          </button>
        </div>

        {isEditing ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  value={editData.firstName}
                  onChange={(e) =>
                    setEditData({ ...editData, firstName: e.target.value })
                  }
                  className="w-full bg-black/60 border border-zinc-800/50 rounded-xl px-3 py-2 text-white/95 focus:border-amber-400/30 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Nom</label>
                <input
                  type="text"
                  value={editData.lastName}
                  onChange={(e) =>
                    setEditData({ ...editData, lastName: e.target.value })
                  }
                  className="w-full bg-black/60 border border-zinc-800/50 rounded-xl px-3 py-2 text-white/95 focus:border-amber-400/30 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Email</label>
              <input
                type="email"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
                className="w-full bg-black/60 border border-zinc-800/50 rounded-xl px-3 py-2 text-white/95 focus:border-amber-400/30 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={editData.phone}
                onChange={(e) =>
                  setEditData({ ...editData, phone: e.target.value })
                }
                className="w-full bg-black/60 border border-zinc-800/50 rounded-xl px-3 py-2 text-white/95 focus:border-amber-400/30 focus:outline-none"
              />
            </div>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center space-x-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black rounded-xl transition-colors font-medium"
            >
              <Save className="w-4 h-4" />
              <span>Sauvegarder</span>
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-zinc-400 mb-1">Prénom</p>
                <p className="text-white/95 font-light">{userData.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-400 mb-1">Nom</p>
                <p className="text-white/95 font-light">{userData.lastName}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-1">Email</p>
              <p className="text-white/95 font-light">{userData.email}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-1">Téléphone</p>
              <p className="text-white/95 font-light">{userData.phone}</p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-zinc-800/50">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center space-x-2 text-amber-300/90 hover:text-amber-300 transition-colors"
          >
            <Lock className="w-4 h-4" />
            <span className="text-sm">Changer le mot de passe</span>
          </button>
        </div>
      </div>

      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Changer le mot de passe"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Mot de passe actuel
            </label>
            <input
              type="password"
              className="w-full bg-black/60 border border-zinc-800/50 rounded-xl px-3 py-2 text-white/95 focus:border-amber-400/30 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              className="w-full bg-black/60 border border-zinc-800/50 rounded-xl px-3 py-2 text-white/95 focus:border-amber-400/30 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Confirmer le nouveau mot de passe
            </label>
            <input
              type="password"
              className="w-full bg-black/60 border border-zinc-800/50 rounded-xl px-3 py-2 text-white/95 focus:border-amber-400/30 focus:outline-none"
            />
          </div>
          <button className="w-full px-4 py-3 bg-amber-500 hover:bg-amber-600 text-black rounded-xl transition-colors font-medium">
            Mettre à jour le mot de passe
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default ProfileSection;