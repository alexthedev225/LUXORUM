"use client";

import clsx from "clsx";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, User, ShoppingBag, ChevronDown, LogOut, X } from "lucide-react";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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

  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();
  const { logout, loading } = useLogout();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAuthPage) return null;

  return (
    <header className="fixed w-full top-4 z-50">
      <nav
        className={clsx(
          "px-4 relative transition-all duration-500 mx-2",
          isScrolled ? "lg:mx-20" : ""
        )}
      >
        {/* Background avec transition */}
        <div
          className={`absolute inset-0 transition-all duration-300 rounded-2xl border border-zinc-800/50 ${
            isScrolled ? "bg-black/82" : "bg-black"
          } backdrop-blur-xs`}
        />

        <div className="relative px-4 lg:px-6 h-20 flex items-center justify-between">
          {/* Logo (toujours visible) */}
          <Link href="/" className="shrink-0">
            <motion.span
              className="font-serif sm:text-lg text-amber-200/90 hover:text-amber-200 transition-colors duration-500 cinzel-decorative-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              LUXORUM
            </motion.span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden lg:flex items-center space-x-6 lg:space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="p-2 text-sm tracking-wider uppercase font-light 
                             bg-black text-zinc-100 hover:text-amber-200
                             hover:bg-zinc-900/90 data-[state=open]:bg-zinc-900/90 
                             data-[state=open]:text-amber-200
                             transition-colors duration-300 
                             border border-zinc-800/50
                             cursor-pointer group flex items-center gap-2"
                  >
                    Collections & Boutique
                    <ChevronDown
                      className="relative top-[1px] h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] bg-black/95 backdrop-blur-xl border border-zinc-800/50 rounded-xl overflow-hidden">
                      <div className="grid grid-cols-2 gap-0.5 bg-zinc-800/50">
                        <Link
                          href="/boutique"
                          className="col-span-2 block bg-black/95 p-6 transition-all duration-300 hover:bg-zinc-900/90 group border-b border-zinc-800/50"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-sm font-medium text-amber-200/80 group-hover:text-amber-200 transition-colors">
                                Découvrir toutes nos collections
                              </h3>
                              <p className="text-xs text-zinc-100 group-hover:text-zinc-300 transition-colors mt-1">
                                Explorer notre boutique complète
                              </p>
                            </div>
                            <span className="text-zinc-500 group-hover:text-amber-200 transition-colors">
                              →
                            </span>
                          </div>
                        </Link>
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="block bg-black/95 p-4 transition-all duration-300 hover:bg-zinc-900/90 group"
                          >
                            <div className="space-y-2">
                              <h3 className="text-sm font-medium text-amber-200/80 group-hover:text-amber-200 transition-colors">
                                {category.name}
                              </h3>
                              <p className="text-xs text-zinc-100  transition-colors">
                                {category.description}
                              </p>
                              <p className="text-[10px] text-zinc-200 font-light tracking-wider  transition-colors">
                                {category.position}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className="relative group py-2"
              >
                <span className="text-sm tracking-wider uppercase font-light text-zinc-100 hover:text-amber-200 transition-colors duration-300">
                  {route.name}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-amber-400/0 via-amber-400 to-amber-400/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </Link>
            ))}
          </div>

          {/* Actions Desktop (panier, compte, logout) */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/cart"
              className="w-10 h-10 rounded-full hover:bg-zinc-800/50 transition-colors duration-300 bg-black relative inline-flex items-center justify-center"
            >
              <ShoppingBag className="w-5 h-5 text-zinc-100 hover:text-amber-200 transition-colors duration-300" />

              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-black bg-amber-400 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              href="/mon-compte"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-800/50 transition-colors duration-300 bg-black"
            >
              <User className="w-5 h-5 text-zinc-100 hover:text-amber-200 transition-colors duration-300" />
            </Link>

            {isAuthenticated && (
              <button
                onClick={() => {
                  logout(() => {
                    toast.success("Déconnexion réussie");

                    setTimeout(() => {
                      window.location.reload();
                    }, 2000);
                  });
                }}
                disabled={loading}
                className="text-red-500 ml-10"
                aria-label="Se déconnecter"
              >
                {loading ? (
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <LogOut className="inline-block w-7 h-7" />
                )}
              </button>
            )}
          </div>

          {/* Bouton Menu Mobile */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full hover:bg-zinc-800/90 transition-colors duration-300 bg-black"
                aria-label="Ouvrir le menu"
              >
                <Menu className="w-5 h-5 text-zinc-100 hover:text-amber-200 transition-colors duration-300" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className={clsx(
                "w-full max-w-md backdrop-blur-xl border-l overflow-y-auto transition-colors duration-300",
                isScrolled
                  ? "bg-black/70 border-zinc-800/50"
                  : "bg-black/90 border-zinc-800/50"
              )}
            >
              <SheetTitle className="text-4xl font-serif p-6 text-amber-200 transition-colors duration-300 flex justify-between items-center">
                LUXORUM
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-amber-200"
                  >
                    <X className="w-6 h-6" aria-label="Fermer le menu" />
                  </Button>
                </SheetTrigger>
              </SheetTitle>

              <nav className="mt-8 px-6 pb-16 space-y-6">
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    className="block py-4 text-sm uppercase tracking-wider text-zinc-100 hover:text-amber-200 transition-colors duration-300"
                  >
                    {route.name}
                  </Link>
                ))}

                {isAdmin && (
                  <Link
                    href="/admin"
                    className="block py-2 text-sm uppercase tracking-wider font-light text-red-500 hover:text-amber-400 transition-colors duration-300"
                  >
                    ADMIN
                  </Link>
                )}

                <div>
                  <h3 className="text-sm uppercase tracking-wider mb-4 text-zinc-500">
                    Collections
                  </h3>
                  <div className="space-y-4">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="block group"
                      >
                        <h4 className="text-sm font-medium text-zinc-100 hover:text-amber-200 transition-colors duration-300">
                          {category.name}
                        </h4>
                        <p className="text-xs text-zinc-100 transition-colors duration-300">
                          {category.description}
                        </p>
                        <p className="text-xs italic text-zinc-100 transition-colors duration-300">
                          {category.position}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-6 space-y-4">
                  <Link
                    href="/cart"
                    className="flex items-center gap-3 text-zinc-100 hover:text-amber-200 transition-colors duration-300"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Panier {totalItems > 0 && `(${totalItems})`}
                  </Link>

                  <Link
                    href="/mon-compte"
                    className="flex items-center gap-3 text-zinc-100 hover:text-amber-200 transition-colors duration-300"
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
                      }}
                      disabled={loading}
                      className="flex items-center gap-3 text-red-500 hover:text-amber-400 transition-colors duration-300"
                      aria-label="Se déconnecter"
                    >
                      {loading ? (
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      ) : (
                        <>
                          <LogOut className="w-5 h-5" />
                          Déconnexion
                        </>
                      )}
                    </button>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
