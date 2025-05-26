// app/admin/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import {
  Users,
  Package,
  BarChart3,
  ShoppingCart,
  Tag,
  Settings,
  LogOut,
  Home,
  Menu,
  X,
  Crown,
  Sparkles,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    Cookies.remove("userId");
    Cookies.remove("userRole");
    router.push("/admin/login");
  };

  const menuItems = [
    {
      path: "/admin/dashboard",
      label: "Tableau de bord",
      icon: <Home className="h-5 w-5" />,
    },
    {
      path: "/admin/products",
      label: "Produits",
      icon: <Package className="h-5 w-5" />,
    },
    {
      path: "/admin/category",
      label: "Catégories",
      icon: <Tag className="h-5 w-5" />,
    },
    {
      path: "/admin/orders",
      label: "Commandes",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      path: "/admin/users",
      label: "Utilisateurs",
      icon: <Users className="h-5 w-5" />,
    },
    {
      path: "/admin/analytics",
      label: "Statistiques",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      path: "/admin/settings",
      label: "Paramètres",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const sidebarVariants = {
    hidden: {
      x: -280,
      opacity: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const menuItemVariants = {
    rest: {
      scale: 1,
      x: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    hover: {
      scale: 1.02,
      x: 4,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  };

  const glowVariants = {
    rest: { opacity: 0, scale: 0.8 },
    hover: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Overlay texture subtile */}
      <div className="fixed inset-0 opacity-10 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Overlay pour mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-20 bg-black/80 backdrop-blur-md lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar pour desktop */}
      <motion.aside
        className="fixed inset-y-0 left-0 z-30 hidden w-64 transform-gpu border-r border-zinc-800/90 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 lg:block"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Lueur dorée subtile sur le bord */}
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-amber-400/20 to-transparent" />

        {/* Header de la sidebar */}
        <div className="relative flex h-16 items-center justify-center border-b border-zinc-800/90 bg-gradient-to-r from-black/60 to-transparent">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Crown className="h-6 w-6 text-amber-400/80" />
            <h1 className="text-xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
                Luxorum Admin
              </span>
            </h1>
          </motion.div>

          {/* Effet de lueur subtile */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent pointer-events-none" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-3 pt-6 space-y-1">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.path}
              className="relative"
              variants={menuItemVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => setHoveredItem(item.path)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              {/* Effet de lueur au hover */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-400/10 to-amber-300/5"
                variants={glowVariants}
                animate={
                  hoveredItem === item.path || pathname === item.path
                    ? "hover"
                    : "rest"
                }
              />

              <Button
                variant="ghost"
                className={`relative w-full flex items-center justify-start gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                  pathname === item.path
                    ? "bg-gradient-to-r from-amber-500/15 to-amber-400/10 text-amber-300 border border-amber-400/30 shadow-lg shadow-amber-400/10"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                }`}
                onClick={() => router.push(item.path)}
              >
                <span
                  className={`transition-colors duration-200 ${
                    pathname === item.path ? "text-amber-400" : ""
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-medium tracking-wide">{item.label}</span>

                {/* Indicateur actif */}
                {pathname === item.path && (
                  <motion.div
                    className="absolute right-3 w-2 h-2 rounded-full bg-amber-400"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  />
                )}
              </Button>
            </motion.div>
          ))}

          {/* Séparateur élégant */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800/50" />
            </div>
            <div className="relative flex justify-center">
              <div className="px-3 bg-gradient-to-b from-black via-zinc-950 to-black">
                <Sparkles className="h-4 w-4 text-amber-400/40" />
              </div>
            </div>
          </div>

          {/* Bouton de déconnexion */}
          <motion.div
            className="relative"
            variants={menuItemVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start gap-3 px-4 py-3 text-left rounded-lg text-zinc-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium tracking-wide">Déconnexion</span>
            </Button>
          </motion.div>
        </nav>
      </motion.aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            className="fixed inset-y-0 left-0 z-30 w-64 transform-gpu border-r border-zinc-800/90 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 lg:hidden"
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Lueur dorée subtile sur le bord */}
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-amber-400/20 to-transparent" />

            {/* Header mobile */}
            <div className="relative flex h-16 items-center justify-between border-b border-zinc-800/90 bg-gradient-to-r from-black/60 to-transparent px-4">
              <div className="flex items-center gap-2">
                <Crown className="h-6 w-6 text-amber-400/80" />
                <h1 className="text-xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
                    Luxorum Admin
                  </span>
                </h1>
              </div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-100 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </Button>
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent pointer-events-none" />
            </div>

            {/* Navigation mobile */}
            <nav className="flex flex-col p-3 pt-6 space-y-1">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="ghost"
                    className={`relative w-full flex items-center justify-start gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                      pathname === item.path
                        ? "bg-gradient-to-r from-amber-500/15 to-amber-400/10 text-amber-300 border border-amber-400/30"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                    }`}
                    onClick={() => {
                      router.push(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span
                      className={`transition-colors duration-200 ${
                        pathname === item.path ? "text-amber-400" : ""
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="font-medium tracking-wide">
                      {item.label}
                    </span>

                    {pathname === item.path && (
                      <div className="absolute right-3 w-2 h-2 rounded-full bg-amber-400" />
                    )}
                  </Button>
                </motion.div>
              ))}

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-800/50" />
                </div>
                <div className="relative flex justify-center">
                  <div className="px-3 bg-gradient-to-b from-black via-zinc-950 to-black">
                    <Sparkles className="h-4 w-4 text-amber-400/40" />
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: menuItems.length * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-start gap-3 px-4 py-3 text-left rounded-lg text-zinc-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium tracking-wide">Déconnexion</span>
                </Button>
              </motion.div>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Contenu principal */}
      <div className="flex flex-1 flex-col overflow-hidden lg:pl-64">
        {/* Header principal */}
        <header className="relative flex h-16 items-center justify-between border-b border-zinc-800/90 bg-gradient-to-r from-zinc-950/90 via-black/80 to-zinc-950/90 px-6 backdrop-blur-md">
          {/* Lueur dorée subtile en arrière-plan */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent pointer-events-none" />

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </motion.div>

          <div className="ml-auto flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                className="relative px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white/95 hover:bg-gradient-to-r hover:from-amber-500/10 hover:to-amber-400/5 border border-zinc-800/50 hover:border-amber-400/30 rounded-lg transition-all duration-200"
                onClick={() => router.push("/")}
              >
                <span className="relative z-10">Voir le site</span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-400/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200" />
              </Button>
            </motion.div>
          </div>
        </header>

        {/* Contenu principal */}
        <main className="flex-1 overflow-y-auto">
          <div className="relative min-h-[calc(100vh-theme(spacing.16))] p-6">
            {/* Texture décorative */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Zone de contenu avec animation d'entrée */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
