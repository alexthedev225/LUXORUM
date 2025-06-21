// Preferences Section
import { motion } from "framer-motion";
import { Bell, Globe } from "lucide-react";
import { useState } from "react";

const PreferencesSection = () => {
  const [newsletter, setNewsletter] = useState(true);
  const [language, setLanguage] = useState("fr");

  return (
    <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-2xl border border-amber-400/20 p-6 shadow-2xl">
      <h2 className="text-2xl font-light bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text mb-6">
        Préférences
      </h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-amber-300/90" />
            <div>
              <h3 className="text-white/95 font-medium">Newsletter</h3>
              <p className="text-zinc-400 text-sm">
                Recevoir les dernières actualités et offres exclusives
              </p>
            </div>
          </div>
          <button
            onClick={() => setNewsletter(!newsletter)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              newsletter ? "bg-amber-500" : "bg-zinc-700"
            }`}
          >
            <motion.div
              animate={{ x: newsletter ? 24 : 2 }}
              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-amber-300/90" />
            <div>
              <h3 className="text-white/95 font-medium">Langue</h3>
              <p className="text-zinc-400 text-sm">
                Langue d'affichage de l'interface
              </p>
            </div>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-black/60 border border-zinc-800/50 rounded-xl px-3 py-2 text-white/95 focus:border-amber-400/30 focus:outline-none"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>
    </div>
  );
};
 export default PreferencesSection;
//           </div>