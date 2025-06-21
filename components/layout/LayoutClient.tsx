"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartProvider } from "@/context/CartContext";

interface Settings {
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  theme: "dark" | "light";
  language: string;
}

export default function LayoutClient({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings: Settings;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { setSettings, maintenanceMode, theme } = useSettingsStore();

  // Initialise le store Zustand avec les settings passés du serveur
  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings, setSettings]);

  // Redirection si mode maintenance activé et hors admin
  useEffect(() => {
    if (maintenanceMode && !pathname.startsWith("/admin")) {
      router.push("/maintenance");
    }
  }, [maintenanceMode, pathname, router]);

  const isAuthPage =
    pathname.startsWith("/auth") || pathname.startsWith("/admin");

  return (
    <div
      className={`font-serif antialiased relative min-h-screen ${
        theme === "dark"
          ? "bg-black text-white"
          : "bg-gradient-to-b from-amber-200/90 via-amber-100/90 to-amber-200/90 text-black"
      }`}
    >
    

      <Navbar />
      <main
        className={`min-h-screen relative ${
          isAuthPage ? "px-0 pt-0" : "px-2 pt-10"
        }`}
      >
        <CartProvider>{children}</CartProvider>
      </main>
      <Footer />
    </div>
  );
}
