"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, User, ShoppingBag, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const routes = [
  { name: "Accueil", path: "/" },
  { name: "Boutique", path: "/boutique" },
  { name: "À propos", path: "/a-propos" },
  { name: "Contact", path: "/contact" },
];

const categories = [
  {
    name: "Montres",
    description: "Chronographes & Automatiques",
    href: "/categories/montres",
    position: "Collection Horlogerie",
  },
  {
    name: "Colliers",
    description: "Chaînes & Pendentifs",
    href: "/categories/colliers",
    position: "Collection Prestige",
  },
  {
    name: "Bagues",
    description: "Chevalières & Alliances",
    href: "/categories/bagues",
    position: "Collection Exclusive",
  },
  {
    name: "Lunettes",
    description: "Optique & Solaire",
    href: "/categories/lunettes",
    position: "Collection Élégance",
  },
  {
    name: "Bracelets",
    description: "Joncs & Mailles",
    href: "/categories/bracelets",
    position: "Collection Signature",
  },
  {
    name: "Accessoires",
    description: "Pièces Uniques",
    href: "/categories/accessoires",
    position: "Collection Privée",
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed w-full top-4 z-50">
      <nav className="px-4 mx-8 lg:mx-10 relative">
        {/* Background avec transition */}
        <div
          className={`absolute inset-0 transition-all duration-300 rounded-2xl border border-zinc-800/50 ${
            isScrolled ? "bg-black/82 " : "bg-black"
          } backdrop-blur-xs`}
        />

        <div className="relative px-4 lg:px-6 h-20 flex items-center justify-between">
          {/* Logo avec transition */}
          <Link href="/" className="shrink-0">
            <motion.span
              className="font-serif sm:text-lg text-amber-200/90 hover:text-amber-200 transition-colors duration-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              LUXORUM
            </motion.span>
          </Link>

          {/* Navigation Desktop avec transitions */}
          <div className="hidden lg:flex items-center space-x-6 lg:space-x-8">
            {/* Menu Collections avec style dark */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="text-sm tracking-wider uppercase font-light 
                             bg-black text-zinc-400 hover:text-amber-200
                             hover:bg-zinc-900/90 data-[state=open]:bg-zinc-900/90 
                             data-[state=open]:text-amber-200
                             transition-colors duration-300 
                             border border-zinc-800/50
                             cursor-pointer"
                  >
                    Collections
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] bg-black/95 backdrop-blur-xl border border-zinc-800/50 rounded-xl overflow-hidden">
                      <div className="grid grid-cols-2 gap-0.5 bg-zinc-800/50">
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
                              <p className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">
                                {category.description}
                              </p>
                              <p className="text-[10px] text-zinc-500 font-light tracking-wider group-hover:text-zinc-400 transition-colors">
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
                <span className="text-sm tracking-wider uppercase font-light text-zinc-400 hover:text-amber-200 transition-colors duration-300">
                  {route.name}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-amber-400/0 via-amber-400 to-amber-400/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </Link>
            ))}
          </div>

          {/* Actions avec transitions */}
          <div className="flex items-center gap-1">
            {[ShoppingBag, User].map((Icon, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full hover:bg-zinc-800/50 transition-colors duration-300 bg-black"
              >
                <Icon className="w-5 h-5 text-zinc-400 hover:text-amber-200 transition-colors duration-300" />
              </Button>
            ))}

            {/* Menu Mobile */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-full hover:bg-zinc-800/50 transition-colors duration-300 bg-black"
                >
                  <Menu className="w-5 h-5 text-zinc-400 hover:text-amber-200 transition-colors duration-300" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className={`w-full max-w-md backdrop-blur-xl border-l overflow-y-auto transition-colors duration-300 ${
                  isScrolled
                    ? "bg-black/70 border-zinc-800/50"
                    : "bg-black/90 border-zinc-800/50"
                }`}
              >
                <SheetTitle className="text-4xl font-serif p-6 text-amber-200 transition-colors duration-300">
                  LUXORUM
                </SheetTitle>
                <nav className="mt-16 px-6 pb-16">
                  {routes.map((route) => (
                    <Link
                      key={route.path}
                      href={route.path}
                      className="block py-4 text-sm uppercase tracking-wider text-zinc-400 hover:text-amber-200 transition-colors duration-300"
                    >
                      {route.name}
                    </Link>
                  ))}

                  <div className="py-6 border-t mt-6">
                    <h3 className="text-sm uppercase tracking-wider mb-4 text-zinc-500 transition-colors duration-300">
                      Collections
                    </h3>
                    <div className="space-y-6">
                      {categories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          className="block group"
                        >
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium text-zinc-400 hover:text-amber-200 transition-colors duration-300">
                              {category.name}
                            </h4>
                            <p className="text-xs text-zinc-500 transition-colors duration-300">
                              {category.description}
                            </p>
                            <p className="text-xs italic text-zinc-600 transition-colors duration-300">
                              {category.position}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
