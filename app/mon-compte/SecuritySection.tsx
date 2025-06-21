import { Lock, UserX } from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";

// Security Section
const SecuritySection = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-2xl border border-amber-400/20 p-6 shadow-2xl">
        <h2 className="text-2xl font-light bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text mb-6">
          Sécurité
        </h2>

        <div className="space-y-4">
          <div className="bg-black/60 rounded-xl border border-zinc-800/50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-amber-300/90" />
                <div>
                  <h3 className="text-white/95 font-medium">Mot de passe</h3>
                  <p className="text-zinc-400 text-sm">
                    Dernière modification il y a 3 mois
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 text-amber-300/90 hover:text-amber-300 border border-amber-400/20 hover:border-amber-400/30 rounded-xl transition-colors text-sm">
                Modifier
              </button>
            </div>
          </div>

          <div className="bg-black/60 rounded-xl border border-red-900/50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <UserX className="w-5 h-5 text-red-400" />
                <div>
                  <h3 className="text-white/95 font-medium">
                    Supprimer mon compte
                  </h3>
                  <p className="text-zinc-400 text-sm">
                    Cette action est irréversible
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 text-red-400 hover:text-red-300 border border-red-400/20 hover:border-red-400/30 rounded-xl transition-colors text-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Supprimer mon compte"
      >
        <div className="space-y-4">
          <div className="bg-red-900/20 border border-red-400/20 rounded-xl p-4">
            <p className="text-red-300 text-sm">
              ⚠️ Attention : Cette action est irréversible. Toutes vos données
              seront définitivement supprimées.
            </p>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Tapez "SUPPRIMER" pour confirmer
            </label>
            <input
              type="text"
              placeholder="SUPPRIMER"
              className="w-full bg-black/60 border border-zinc-800/50 rounded-xl px-3 py-2 text-white/95 focus:border-red-400/30 focus:outline-none"
            />
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="flex-1 px-4 py-3 border border-zinc-800/50 text-zinc-300 rounded-xl hover:border-zinc-700 transition-colors"
            >
              Annuler
            </button>
            <button className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors font-medium">
              Supprimer définitivement
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default SecuritySection;