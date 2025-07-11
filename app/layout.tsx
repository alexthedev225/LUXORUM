// app/layout.tsx
import LayoutClient from "@/components/layout/LayoutClient";
import "./globals.css";
import { getSettings } from "@/lib/api/getSettings"; // à créer côté serveur
import * as jose from "jose";
import { cookies } from "next/headers";
import { Cinzel, Cinzel_Decorative } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "900"], // ajuste selon ton usage
  variable: "--font-cinzel",
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "900"],
  variable: "--font-cinzel-decorative",
});

const SECRET = process.env.JWT_SECRET!;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let isAdmin = false;
  if (token) {
    try {
      const { payload } = await jose.jwtVerify(
        token,
        new TextEncoder().encode(SECRET)
      );
      isAdmin = payload.role === "ADMIN";
    } catch {
      // token invalide ou expiré
      isAdmin = false;
    }
  }

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
      <body className={`${cinzel.variable} ${cinzelDecorative.variable}`}>
        <LayoutClient
          initialSettings={settings}
          isAdmin={isAdmin}
          isAuthenticated={!!token}
        >
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}
