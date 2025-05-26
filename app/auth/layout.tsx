import type { Metadata } from "next";
import RootLayout from "../layout";

export const metadata: Metadata = {
  title: "Connexion | Luxorum",
  description: "Accédez à votre compte ou inscrivez-vous",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootLayout isAuthPage={true}>
      <script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
      />

      <div className="min-h-screen w-full bg-black text-white relative">
        {/* En-tête simple */}
        <header className="z-20 border-b border-zinc-800 bg-black">
          <div className="max-w-md mx-auto px-6 py-6 text-center">
            <h1 className="text-3xl font-light tracking-[0.3em] text-amber-300">
              LUXORUM
            </h1>
            <p className="text-sm tracking-widest text-zinc-400 uppercase mt-2">
              Espace Administration
            </p>
          </div>
        </header>

        {/* Contenu */}
        <main className="min-h-[calc(100vh-140px)] w-full relative">
          <div className="relative w-full h-full">{children}</div>
        </main>

        {/* Pied de page simple */}
        <footer className="z-20 border-t border-zinc-800 bg-black py-4 text-center text-xs text-zinc-500">
          <p>Accès sécurisé - Chiffrement SSL</p>
          <div className="flex justify-center gap-4 mt-1">
            <span>Confidentialité</span>
            <span>Conditions</span>
            <span>Support</span>
          </div>
        </footer>
      </div>
    </RootLayout>
  );
}
