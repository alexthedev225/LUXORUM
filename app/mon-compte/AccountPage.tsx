"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Package,
  CreditCard,
  Settings,
  Shield,
  ChevronRight,
} from "lucide-react";

import ProfileSection from "./ProfileSection";
import AddressesSection from "./AdresseSection";
import OrdersSection from "./OrdersSection";
import PaymentMethodsSection from "./PaymentMethodsSection";
import PreferencesSection from "./PreferencesSection";
import SecuritySection from "./SecuritySection";

// Types
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Address {
  id: string;
  type: "shipping" | "billing";
  name: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  items: number;
}

interface PaymentMethod {
  id: string;
  type: "visa" | "mastercard" | "amex";
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

interface AccountPageProps {
  userData: UserData;
  addresses: Address[];
  orders: Order[];
  paymentMethods: PaymentMethod[];
  preferences: any; // à typer correctement si possible
}

const sections = [
  { id: "profile", label: "Informations personnelles", icon: User },
  { id: "addresses", label: "Adresses", icon: MapPin },
  { id: "orders", label: "Mes commandes", icon: Package },
  { id: "payments", label: "Moyens de paiement", icon: CreditCard },
  { id: "preferences", label: "Préférences", icon: Settings },
  { id: "security", label: "Sécurité", icon: Shield },
];

export default function AccountPage({
  userData,
  addresses,
  orders,
  paymentMethods,
  preferences,
}: AccountPageProps) {
  const [activeSection, setActiveSection] = useState("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection userData={userData} />;
      case "addresses":
        return <AddressesSection addresses={addresses} />;
      case "orders":
        return <OrdersSection orders={orders} />;
      case "payments":
        return <PaymentMethodsSection paymentMethods={paymentMethods} />;
      case "preferences":
        return <PreferencesSection preferences={preferences} />;
      case "security":
        return <SecuritySection />;
      default:
        return <ProfileSection userData={userData} />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`lg:w-80 ${isMobileMenuOpen ? "block" : "hidden lg:block"}`}
      >
        <div className="sticky top-24 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-2xl border border-amber-400/20 p-6 shadow-2xl">
          <nav className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeSection === section.id
                      ? "bg-gradient-to-r from-amber-400/20 to-amber-300/10 text-amber-300 border border-amber-400/30"
                      : "text-zinc-400 hover:text-white hover:bg-black/40"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-light">{section.label}</span>
                  <ChevronRight
                    className={`w-4 h-4 ml-auto transition-transform ${
                      activeSection === section.id ? "rotate-90" : ""
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="mt-8 pt-6 border-t border-zinc-800/50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <span className="text-black font-medium text-lg">
                  {userData.firstName[0]}
                  {userData.lastName[0]}
                </span>
              </div>
              <div>
                <p className="text-white/95 font-medium">
                  {userData.firstName} {userData.lastName}
                </p>
                <p className="text-zinc-400 text-sm">{userData.email}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      <motion.main
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
      >
        {renderSection()}
      </motion.main>
    </div>
  );
}
