"use client";

import clsx from "clsx";
import { useState } from "react";
import Link from "next/link";
import { Menu, User, ShoppingBag, ChevronDown, LogOut, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsAuthOrAdminPage } from "@/hooks/useIsAuthPage";
import { useCartStore } from "@/stores/cart";
import { useLogout } from "@/hooks/useLogout";
import toast from "react-hot-toast";

const routes = [
  { name: "Accueil", path: "/" },
  { name: "À propos", path: "/a-propos" },
  { name: "Contact", path: "/contact" },
];

const categories = [
  {
    name: "Montres",
    description: "Chronographes & Automatiques",
    href: "/boutique/categories/montres",
    position: "Collection Horlogerie",
  },
  {
    name: "Colliers",
    description: "Chaînes & Pendentifs",
    href: "/boutique/categories/colliers",
    position: "Collection Prestige",
  },
  {
    name: "Bagues",
    description: "Chevalières & Alliances",
    href: "/boutique/categories/bagues",
    position: "Collection Exclusive",
  },
  {
    name: "Bracelets",
    description: "Joncs & Mailles",
    href: "/boutique/categories/bracelets",
    position: "Collection Signature",
  },
];

interface NavbarProps {
  isAdmin: boolean;
  isAuthenticated: boolean;
}

export function Navbar({ isAdmin, isAuthenticated }: NavbarProps) {
  const isAuthPage = useIsAuthOrAdminPage();
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();
  const { logout, loading } = useLogout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => setIsDropdownOpen(false), 200);
    setTimeoutId(id);
  };

  if (isAuthPage) return null;

  return (
    <header className="fixed w-full top-0 z-50 border-b-2 border-gray-200 bg-white ">
      <nav className="mx-auto max-w-7xl   ">
        <div className="relative  h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="ml-2">
            <motion.span
              className="font-serif text-xl text-gray-800 hover:text-amber-500 transition-colors duration-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              LUXORUM
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Dropdown Menu for Collections */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="p-2 text-sm tracking-wide font-medium text-gray-800 hover:text-amber-500 hover:bg-gray-50 transition-all duration-300 rounded-md flex items-center gap-1"
                aria-expanded={isDropdownOpen}
                aria-controls="collections-menu"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Collections
                <ChevronDown
                  className={clsx(
                    "h-4 w-4 transition-transform duration-300",
                    isDropdownOpen && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    id="collections-menu"
                    className="absolute left-0 mt-2 w-[480px] bg-white border border-gray-100 rounded-lg shadow-md z-10"
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="grid grid-cols-2 gap-2 p-4">
                      <Link
                        href="/boutique"
                        className="col-span-2 block p-4 hover:bg-gray-50 transition-all duration-300 rounded-md"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-semibold text-gray-800 hover:text-amber-500 transition-colors">
                              Toutes les collections
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                              Explorer notre boutique complète
                            </p>
                          </div>
                          <span className="text-gray-400 hover:text-amber-500 transition-colors">
                            →
                          </span>
                        </div>
                      </Link>
                      {categories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          className="block p-3 hover:bg-gray-50 transition-all duration-300 rounded-md"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <div className="space-y-1">
                            <h3 className="text-sm font-semibold text-gray-800 hover:text-amber-500 transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {category.description}
                            </p>
                            <p className="text-xs text-gray-400">
                              {category.position}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className="relative group py-2"
              >
                <span className="text-sm font-medium text-gray-800 hover:text-amber-500 transition-colors duration-300">
                  {route.name}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/cart"
              className="w-10 h-10 rounded-md hover:bg-gray-50 transition-all duration-300 relative flex items-center justify-center"
              aria-label="Panier"
            >
              <ShoppingBag className="w-5 h-5 text-gray-800 hover:text-amber-500 transition-colors duration-300" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-amber-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              href="/mon-compte"
              className="w-10 h-10 rounded-md hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
              aria-label="Mon compte"
            >
              <User className="w-5 h-5 text-gray-800 hover:text-amber-500 transition-colors duration-300" />
            </Link>

            {isAuthenticated && (
              <button
                onClick={() => {
                  logout(() => {
                    toast.success("Déconnexion réussie");
                    setTimeout(() => window.location.reload(), 2000);
                  });
                }}
                disabled={loading}
                className="w-10 h-10 rounded-md hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
                aria-label="Se déconnecter"
              >
                {loading ? (
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full" />
                ) : (
                  <LogOut className="w-5 h-5 text-gray-800 hover:text-amber-500 transition-colors duration-300" />
                )}
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden w-10 h-10 rounded-md hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5 text-gray-800" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5 text-gray-800 hover:text-amber-500 transition-colors duration-300" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="lg:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col  justify-center p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Close Button */}
                <button
                  className="absolute top-6 right-6 text-gray-800 hover:text-amber-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Liens principaux */}
                <motion.div
                  className="flex flex-col  space-y-8"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } },
                  }}
                >
                  {routes.map((route) => (
                    <motion.div
                      key={route.path}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                    >
                      <Link
                        href={route.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-3xl font-serif text-gray-900 hover:text-amber-500 transition-colors"
                      >
                        {route.name}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Sous-catégories */}
                <motion.div
                  className="mt-12 flex flex-col  space-y-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.05, delayChildren: 0.4 },
                    },
                  }}
                >
                  {categories.map((cat) => (
                    <motion.div
                      key={cat.name}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                      }}
                    >
                      <Link
                        href={cat.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className=" text-gray-700 hover:text-amber-500 transition-colors"
                      >
                        <div className="font-medium text-lg">{cat.name}</div>
                        <div className="text-sm text-gray-500">
                          {cat.description}
                        </div>
                        <div className="text-xs text-gray-400">
                          {cat.position}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Actions */}
                <motion.div
                  className="mt-12 flex flex-col  space-y-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.05, delayChildren: 0.8 },
                    },
                  }}
                >
                  <Link
                    href="/cart"
                    className="flex items-center gap-2 text-gray-900 hover:text-amber-500 font-medium text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Panier {totalItems > 0 && `(${totalItems})`}
                  </Link>
                  <Link
                    href="/mon-compte"
                    className="flex items-center gap-2 text-gray-900 hover:text-amber-500 font-medium text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    Mon compte
                  </Link>
                  {isAuthenticated && (
                    <button
                      onClick={() => {
                        logout(() => {
                          toast.success("Déconnexion réussie");
                          setTimeout(() => window.location.reload(), 2000);
                        });
                        setIsMobileMenuOpen(false);
                      }}
                      disabled={loading}
                      className="flex items-center gap-2 text-gray-900 hover:text-amber-500 font-medium text-lg"
                    >
                      {loading ? (
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full" />
                      ) : (
                        <LogOut className="w-5 h-5" />
                      )}
                      Déconnexion
                    </button>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}
