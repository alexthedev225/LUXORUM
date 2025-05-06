import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "LUXORUM - Bijoux de Luxe pour Homme",
  description: "L'élégance masculine redéfinie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Cinzel+Decorative:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-serif antialiased relative min-h-screen">
        {/* Fond luxueux statique */}
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-black">
          {/* Base dorée avec dégradé */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-200/90 via-amber-100/90 to-amber-200/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200/10 via-transparent to-transparent" />
          </div>

          {/* Texture subtile */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:32px_32px]" />

          {/* Overlay pour profondeur */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>

        <Navbar />
        <main className="min-h-screen pt-28 px-2 relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
