// app/auth/layout.tsx
import Script from "next/script";



export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />

      <div className="min-h-screen w-full bg-black text-white ">
        <header className="z-20 border-b border-amber-400/20 bg-black">
          <div className="max-w-md mx-auto px-6 py-6 text-center">
            <h1 className="cinzel-decorative-black text-4xl font-bold tracking-[0.1em] text-amber-300">
              LUXORUM
            </h1>
            <p className="text-sm tracking-widest text-zinc-400 uppercase mt-2">
              Espace Administration
            </p>
          </div>
        </header>

        <main className="min-h-[calc(100vh-140px)] w-full relative">
          <div className="relative w-full h-full">{children}</div>
        </main>

        <footer className="z-20 border-t border-amber-400/20 bg-black py-4 text-center text-xs text-zinc-500">
          <p>Accès sécurisé - Chiffrement SSL</p>
          <div className="flex justify-center gap-4 mt-1">
            <span>Confidentialité</span>
            <span>Conditions</span>
            <span>Support</span>
          </div>
        </footer>
      </div>
    </>
  );
}
