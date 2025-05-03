import type { Metadata } from "next";
import { Cinzel, Cinzel_Decorative } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  variable: "--font-cinzel-decorative",
  weight: ["400", "700", "900"],
});

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
      <body
        className={`${cinzel.variable} ${cinzelDecorative.variable} antialiased font-serif`}
      >
        <Navbar />
        <main className="min-h-screen pt-28 px-4 lg:px-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
