"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Toaster } from "react-hot-toast";

interface LayoutClientProps {
  initialSettings: any; 
  isAdmin: boolean;
  children: React.ReactNode;
  isAuthenticated: boolean;
}
export default function LayoutClient({
  initialSettings,
  isAdmin,
  children,
  isAuthenticated,
}: LayoutClientProps) {
  const pathname = usePathname() || "";
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
    pathname.startsWith("/auth") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/mon-compte");

  return (
    <>
      <div
        className={` antialiased relative min-h-screen ${
          theme === "dark"
            ? "bg-black text-white"
            : "bg-gradient-to-b from-amber-200/90 via-amber-100/90 to-amber-200/90 text-black"
        }`}
      >
        <Navbar isAdmin={isAdmin} isAuthenticated={isAuthenticated} />
        <main
          className={`min-h-screen relative ${
            isAuthPage ? "px-0 pt-0" : "px-2 pt-28"
          }`}
        >
          {children}
        </main>
        <Footer />
      </div>
      <Toaster position="top-center" />
    </>
  );
}
