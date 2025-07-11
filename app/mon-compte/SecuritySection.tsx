"use client";

import { Lock, UserX, Shield, AlertTriangle } from "lucide-react";
import React, { ReactNode, useState, FormEvent } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800/50 rounded-2xl max-w-md w-full shadow-2xl">
        <div className="p-6 border-b border-zinc-800/50">
          <h3 className="text-xl font-light text-white tracking-wide">
            {title}
          </h3>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const SecuritySection: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showChangePwdForm, setShowChangePwdForm] = useState<boolean>(false);

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [loadingPwd, setLoadingPwd] = useState<boolean>(false);
  const [errorPwd, setErrorPwd] = useState<string | null>(null);
  const [successPwd, setSuccessPwd] = useState<string | null>(null);

  const [confirmDeleteText, setConfirmDeleteText] = useState<string>("");

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setErrorPwd(null);
    setSuccessPwd(null);

    if (newPassword.length < 6 || oldPassword.length < 6) {
      setErrorPwd("Les mots de passe doivent faire au moins 6 caractères.");
      return;
    }

    setLoadingPwd(true);

    try {
      const res = await fetch("/api/account/security", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorPwd(
          data.message || "Erreur lors du changement de mot de passe."
        );
      } else {
        setSuccessPwd("Mot de passe modifié avec succès.");
        setOldPassword("");
        setNewPassword("");
        setShowChangePwdForm(false);
      }
    } catch {
      setErrorPwd("Erreur réseau, veuillez réessayer.");
    }

    setLoadingPwd(false);
  };

  const handleDeleteAccount = async () => {
    if (confirmDeleteText !== "SUPPRIMER") {
      alert('Veuillez taper "SUPPRIMER" pour confirmer.');
      return;
    }

    try {
      const res = await fetch("/api/account/security", { method: "DELETE" });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Erreur lors de la suppression du compte.");
        return;
      }

      window.location.href = "/";
    } catch (error) {
      console.error("Erreur suppression compte", error);
      alert("Erreur serveur, veuillez réessayer.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Main Content */}
      <div className="space-y-6">
        {/* Password Section */}
        <div className="bg-zinc-900/30 backdrop-blur-sm border border-amber-400/20 rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-white mb-1">
                    Mot de passe
                  </h2>
                  <p className="text-zinc-400 text-sm">
                    Modifiez votre mot de passe de connexion
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowChangePwdForm((v) => !v)}
                className="px-6 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 border border-amber-400/20 hover:border-amber-400/30 rounded-lg transition-all duration-300 text-sm font-medium"
              >
                {showChangePwdForm ? "Annuler" : "Modifier"}
              </button>
            </div>

            {/* Password Change Form */}
            {showChangePwdForm && (
              <div className="border-t border-zinc-800/30 pt-6">
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Ancien mot de passe
                      </label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                        placeholder="Saisissez votre mot de passe actuel"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                        placeholder="Saisissez votre nouveau mot de passe"
                      />
                    </div>
                  </div>

                  {errorPwd && (
                    <div className="bg-red-900/20 border border-red-400/20 rounded-lg p-3">
                      <p className="text-red-300 text-sm">{errorPwd}</p>
                    </div>
                  )}

                  {successPwd && (
                    <div className="bg-green-900/20 border border-green-400/20 rounded-lg p-3">
                      <p className="text-green-300 text-sm">{successPwd}</p>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={handleChangePassword}
                      disabled={loadingPwd}
                      className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black rounded-lg transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingPwd ? "Modification..." : "Confirmer"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Account Deletion Section */}
        <div className="bg-zinc-900/30 backdrop-blur-sm border border-red-800/30 rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <UserX className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-white mb-1">
                    Zone de danger
                  </h2>
                  <p className="text-zinc-400 text-sm">
                    Supprimez définitivement votre compte
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-400/20 hover:border-red-400/30 rounded-lg transition-all duration-300 text-sm font-medium"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Suppression du compte"
      >
        <div className="space-y-6">
          <div className="bg-red-900/20 border border-red-400/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-red-300 font-medium mb-1">
                  Action irréversible
                </h4>
                <p className="text-red-300/80 text-sm">
                  Toutes vos données seront définitivement supprimées. Cette
                  action ne peut pas être annulée.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-3">
              Confirmez en tapant{" "}
              <span className="text-red-400 font-mono">SUPPRIMER</span>
            </label>
            <input
              type="text"
              placeholder="Tapez SUPPRIMER"
              value={confirmDeleteText}
              onChange={(e) => setConfirmDeleteText(e.target.value)}
              className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-red-400/50 focus:outline-none focus:ring-2 focus:ring-red-400/20 transition-all duration-300"
            />
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="flex-1 px-4 py-3 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white border border-zinc-700/50 rounded-lg transition-all duration-300 font-medium"
            >
              Annuler
            </button>
            <button
              onClick={handleDeleteAccount}
              className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300 font-medium"
            >
              Supprimer définitivement
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SecuritySection;
