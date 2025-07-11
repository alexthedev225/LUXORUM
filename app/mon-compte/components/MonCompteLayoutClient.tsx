"use client";

import React, { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Package,
  Shield,
  ChevronRight,
  Sparkles,
  Crown,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
interface Address {
  _id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}
interface Order {
  _id: string;
  createdAt: string;
  amount: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  items: Array<{ product: any; quantity: number; price: number; name: string }>;
}


const sections = [
  {
    id: "profile",
    label: "Profil",
    icon: User,
    description: "Gérer vos infos",
  },
  {
    id: "addresses",
    label: "Adresses",
    icon: MapPin,
    description: "Gérer vos adresses",
  },
  {
    id: "payments",
    label: "Paiement",
    icon: Shield,
    description: "Gérer vos cartes",
  },
  {
    id: "orders",
    label: "Commandes",
    icon: Package,
    description: "Voir vos achats",
  },
  {
    id: "security",
    label: "Sécurité",
    icon: Shield,
    description: "Sécuriser le compte",
  },
];

export default function MonCompteLayoutClient({
  user,
  addresses,
  orders,
  children,
}: {
  user: UserData;
  addresses: Address[];
  orders: Order[];
  children: ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const pathname = usePathname();
  const activeSectionId = pathname?.split("/")[2] || sections[0].id;

  useEffect(() => {
    const checkWidth = () => {
      const large = window.innerWidth >= 1024;
      setIsLargeScreen(large);
      if (large) setIsMobileMenuOpen(false);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  function renderSidebarContent() {
    return (
      <div className="flex flex-col justify-between h-full  border-r border-amber-400/40">
        {/* User info */}
        <div className="flex items-center gap-3 border-b border-amber-400/40 p-4">
          <div className="w-12 h-12 bg-amber-500 rounded-md flex items-center justify-center relative">
            <span className="text-black font-bold text-lg">
              {user.firstName[0]}
              {user.lastName[0]}
            </span>
            <Crown className="absolute -top-1 -right-1 w-4 h-4 text-amber-200" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-sm capitalize">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-xs text-zinc-300">{user.email}</p>
            <div className="flex items-center gap-1 text-amber-300 text-[10px] mt-1">
              <Sparkles className="w-3 h-3" /> <span>VIP</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 text-sm px-4">
          {sections.map(({ id, label, icon: Icon, description }) => {
            const isActive = activeSectionId === id;
            return (
              <Link
                key={id}
                href={`/mon-compte/${id}`}
                className={`group flex items-center justify-between w-full py-3 transition
    ${
      isActive
        ? "border-b-2 border-amber-400 text-amber-300"
        : "text-zinc-200 hover:text-amber-400"
    }
  `}
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded mr-4 ${
                    isActive
                      ? "bg-amber-400/20 "
                      : "bg-zinc-800 group-hover:bg-amber-400/20"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? "text-amber-400"
                        : "text-zinc-400 group-hover:text-amber-400 "
                    }`}
                  />
                </div>
                <div className="flex-1 mr-4">
                  <span
                    className={`font-semibold text-[15px] transition-colors ${
                      isActive
                        ? "text-amber-300"
                        : "text-white group-hover:text-amber-300"
                    }`}
                  >
                    {label}
                  </span>
                  <p
                    className={`text-sm mt-0.5 transition-colors ${
                      isActive
                        ? "text-amber-200"
                        : "text-zinc-300 group-hover:text-amber-200"
                    }`}
                  >
                    {description}
                  </p>
                </div>

                <motion.div
                  animate={{ rotate: isActive ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="transition-colors"
                >
                  <ChevronRight
                    className={`w-5 h-5 ${
                      isActive
                        ? "text-amber-300"
                        : "text-zinc-400 group-hover:text-amber-400"
                    }`}
                  />
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 text-center items-center  text-xs px-4 ">
          <div className="bg-zinc-900 rounded-md p-2  flex flex-col justify-center items-center">
            <div className="text-white font-semibold">{orders.length}</div>
            <div>Commandes</div>
          </div>
          <div className="bg-zinc-900 rounded-md p-2  flex flex-col justify-center items-center">
            <div className="text-white font-semibold">{addresses.length}</div>
            <div>Adresses</div>
          </div>
        </div>

        {/* Bas : bouton menu */}
        <div className="border-t border-amber-400/40 px-4 py-4 ">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium bg-zinc-900 text-amber-300 border border-zinc-700/60 shadow-sm hover:shadow-md hover:from-zinc-800 hover:to-zinc-700 transition-all duration-200 w-full justify-center"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="tracking-wide">Retour au menu</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      {/* Header */}
      {/* Header visible uniquement sur desktop */}
      {isLargeScreen && (
        <header className="h-20 flex items-center justify-between px-4 border-b border-amber-400/40">
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h1 className="cinzel-decorative-black text-xl font-semibold ">
              Mon Compte
            </h1>
            <p className="text-sm text-zinc-300 mt-1.5">
              Bienvenue dans votre espace personnel. Gérez vos infos, commandes
              et paramètres en toute simplicité
            </p>
          </div>
        </header>
      )}

      {/* Bouton menu mobile seul */}
      {!isLargeScreen && (
        <div className="h-14 flex items-center justify-end px-4 border-b border-amber-400/40">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-amber-300 hover:text-white transition"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Desktop */}
        {isLargeScreen && <aside>{renderSidebarContent()}</aside>}

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-4 bg-black/90">
          {children}
        </main>
      </div>

      {/* Mobile Drawer */}
      {/* Mobile Drawer */}
      {!isLargeScreen && isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-80 bg-black border-r border-amber-400/40 shadow-lg flex flex-col"
            onClick={(e) => e.stopPropagation()} // empêche la fermeture si on clique dans le drawer
          >
            {/* Header mobile */}
            <div className="flex z-50 justify-between items-center px-4 py-3 border-b border-amber-400/40 flex-shrink-0">
              <span className="text-sm font-medium text-amber-300">
                Navigation
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="z-50"
              >
                <X className="w-5 h-5 text-zinc-400 hover:text-white" />
              </button>
            </div>

            {/* Contenu scrollable */}
            <div className="flex-1 overflow-y-auto">
              {renderSidebarContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
