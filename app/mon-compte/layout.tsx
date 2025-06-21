// /app/mon-compte/layout.tsx
import React from "react";

export const metadata = {
  title: "Mon compte - Luxorum",
  description: "Page Mon compte de Luxorum",
};

export default function MonCompteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black mb-2 rounded-2xl pt-16">
      {/* Background effet grille */}
      <div
        className="fixed inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"
        aria-hidden="true"
      />
      {/* Ici on met le header global */}
      <header className="sticky top-0 z-40 bg-gradient-to-t from-black/60 to-transparent backdrop-blur-xl border-b border-amber-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-light bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text">
              Mon compte
            </h1>
            {/* Le bouton menu mobile est géré côté client, donc ici on peut laisser vide ou placer un placeholder */}
            <div aria-hidden="true" />
          </div>
        </div>
      </header>

      {/* Le contenu dynamique (sidebar + main) sera injecté ici via children */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
