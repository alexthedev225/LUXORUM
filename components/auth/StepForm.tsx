import { useState } from "react";
import { motion } from "framer-motion";

interface StepFormProps {
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
  error: string;
}

export function StepForm({ onSubmit, loading, error }: StepFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === 1) {
      setStep(2);
      return;
    }

    await onSubmit(formData);
  };

  const formTransition = {
    duration: 0.5,
    ease: [0.4, 0.0, 0.2, 1],
  };

  const inputClassName = `
    w-full bg-black/60 border border-zinc-800/50 rounded-xl px-4 py-3 
    text-white placeholder:text-zinc-600 
    focus:border-amber-400/30 focus:ring-1 focus:ring-amber-400/20 focus:bg-black/80 
    transition-all duration-300 group-hover:border-zinc-700/50
  `;

  const labelClassName = `
    block text-xs tracking-[0.3em] text-white/90 uppercase font-light mb-2
  `;

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {step === 1 ? (
        <motion.div
          key="step1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={formTransition}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelClassName}>Prénom</label>
              <div className="relative group">
                <input
                  type="text"
                  name="firstName"
                  required
                  className={inputClassName}
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className={labelClassName}>Nom</label>
              <div className="relative group">
                <input
                  type="text"
                  name="lastName"
                  required
                  className={inputClassName}
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClassName}>Adresse email</label>
            <div className="relative group">
              <input
                type="email"
                name="email"
                required
                placeholder="votre@email.com"
                className={inputClassName}
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
            <p className="text-zinc-500 text-xs font-light">
              Nous protégeons vos données personnelles
            </p>
          </div>

          <motion.button
            type="submit"
            className="group relative w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-medium tracking-wide transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-300/20 via-amber-200/30 to-amber-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Continuer</span>
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          key="step2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={formTransition}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelClassName}>Nom d'utilisateur</label>
              <div className="relative group">
                <input
                  type="text"
                  name="username"
                  required
                  className={inputClassName}
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className={labelClassName}>Mot de passe</label>
              <div className="relative group">
                <input
                  type="password"
                  name="password"
                  required
                  minLength={8}
                  className={inputClassName}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              <p className="text-zinc-500 text-xs font-light">
                Minimum 8 caractères requis
              </p>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center"
            >
              <p className="text-red-400 text-sm font-light">{error}</p>
            </motion.div>
          )}

          <div className="flex gap-4">
            <motion.button
              type="button"
              onClick={() => setStep(1)}
              className="group relative w-full py-4 rounded-xl bg-black/60 border border-zinc-800/50 text-white/90 font-medium tracking-wide transition-all duration-300 hover:bg-black/80 hover:border-zinc-700/50"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Retour</span>
            </motion.button>

            <motion.button
              type="submit"
              disabled={loading}
              className="group relative w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-medium tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300/20 via-amber-200/30 to-amber-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center">
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Création en cours...</span>
                  </div>
                ) : (
                  "Créer mon compte"
                )}
              </span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Indicateur de progression */}
      <div className="flex justify-center items-center gap-3 pt-6">
        <div className="flex items-center gap-2">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                step === i
                  ? "w-8 bg-gradient-to-r from-amber-400 to-amber-500"
                  : "w-6 bg-amber-400/20"
              }`}
              animate={{
                scale: step === i ? 1.1 : 1,
                opacity: step === i ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        <div className="ml-4 text-xs text-zinc-500 font-light tracking-wide">
          Étape {step} sur 2
        </div>
      </div>
    </form>
  );
}
