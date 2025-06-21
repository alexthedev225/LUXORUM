// app/layout.tsx
import LayoutClient from "@/components/layout/LayoutClient";
import "./globals.css";
import { getSettings } from "@/lib/api/getSettings"; // à créer côté serveur

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Récupère les settings côté serveur (MongoDB, fichier, etc.)
  const settings = await getSettings();

  return (
    <html lang={settings.language || "fr"}>
      <head>
        <title>{`${settings.siteName} - Bijoux de Luxe pour Homme`}</title>
        <meta name="description" content={settings.siteDescription} />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Cinzel+Decorative:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Passer settings en props pour initialiser Zustand côté client */}
        <LayoutClient initialSettings={settings}>{children}</LayoutClient>
      </body>
    </html>
  );
}
