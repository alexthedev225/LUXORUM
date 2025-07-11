import { Shield } from "lucide-react";
import SecuritySection from "../SecuritySection";

export default function SecurityPage() {
  return (
    <div className=" bg-black">
      <div className="container mx-auto px-8 py-12 max-w-6xl">
        {/* Header Section */}
        <header className="mb-12">
          <div className="border-b border-zinc-800/60 pb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-light text-white tracking-wide mb-2">
                  Sécurité
                </h1>
                <p className="text-zinc-400 text-sm tracking-wider">
                  Paramètres de sécurité du compte
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-md bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-amber-300" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Security Content */}
        <section className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px "></div>
          <div className="pl-8">
            <SecuritySection />
          </div>
        </section>

        {/* Footer Info */}
        <footer className="mt-16 pt-8 border-t border-zinc-800/40">
          <div className="flex items-center justify-center space-x-8 text-xs text-zinc-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
              <span className="tracking-wider">Connexion chiffrée</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-amber-400/60"></div>
              <span className="tracking-wider">
                Contrôle des accès renforcé
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
