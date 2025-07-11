"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CreditCard, Plus, User, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Modal from "./Modal";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export interface StripePaymentMethod {
  id: string;
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
  billing_details: {
    name?: string;
  };
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#fff",
      fontSize: "16px",
      "::placeholder": { color: "#888" },
      fontFamily: "sans-serif",
      ":-webkit-autofill": { color: "#fff" },
    },
    invalid: {
      color: "#ff6961",
    },
  },
};

function PaymentMethodsForm({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe.js n'est pas chargé.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Champ carte non trouvé.");
      return;
    }

    setLoading(true);
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: { name },
      });

      if (error) {
        setError(
          error.message || "Erreur lors de la création du moyen de paiement."
        );
        setLoading(false);
        return;
      }

      const res = await fetch("/api/account/payment-methods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId: paymentMethod!.id }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Erreur serveur lors de l'ajout de la carte.");
        setLoading(false);
        return;
      }

      onSuccess();
    } catch {
      setError("Erreur inattendue, réessayez plus tard.");
      setLoading(false);
    }
  };

  return (
    <div className=" rounded-lg space-y-8">
      <div className="space-y-2">
        <h3 className="text-xl font-light text-white tracking-wide">
          Nouvelle carte de paiement
        </h3>
        <p className="text-sm text-zinc-400 tracking-wide">
          Ajoutez une méthode de paiement sécurisée
        </p>
        
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-amber-400/70" />
            <label className="text-sm text-zinc-300 tracking-wide font-light">
              Nom du titulaire
            </label>
          </div>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jean Dupont"
            className="w-full bg-zinc-900/60 border border-zinc-700/50 rounded-md px-4 py-3 text-white placeholder-zinc-500 focus:border-amber-400/40 focus:outline-none transition-all duration-300 tracking-wide"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4 text-amber-400/70" />
            <label className="text-sm text-zinc-300 tracking-wide font-light">
              Informations de la carte
            </label>
          </div>
          <div className="bg-zinc-900/60 border border-zinc-700/50 rounded-md px-4 py-3 focus-within:border-amber-400/40 transition-all duration-300">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3">
            <p className="text-red-400 text-sm tracking-wide">{error}</p>
          </div>
        )}

        <div className="flex flex-col space-y-3 pt-4">
          <button
            type="submit"
            disabled={loading || !stripe}
            className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black rounded-md transition-all duration-300 font-medium tracking-wide disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Ajout en cours..." : "Ajouter la carte"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-md transition-all duration-300 font-light tracking-wide"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

interface PaymentMethodsSectionProps {
  paymentMethods: StripePaymentMethod[];
}

const PaymentMethodsSection = ({
  paymentMethods,
}: PaymentMethodsSectionProps) => {
  const [methods, setMethods] = useState(paymentMethods);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fonction pour rafraîchir la liste après ajout
  const refreshPaymentMethods = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/account/payment-methods");
      if (!res.ok) throw new Error("Erreur fetch payment methods");
      const data = await res.json();
      setMethods(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getCardIcon = (brand: string) => {
    switch (brand) {
      case "visa":
        return <CreditCard className="w-5 h-5 text-blue-400" />;
      case "mastercard":
        return <CreditCard className="w-5 h-5 text-red-400" />;
      case "amex":
        return <CreditCard className="w-5 h-5 text-green-400" />;
      default:
        return <CreditCard className="w-5 h-5 text-zinc-400" />;
    }
  };

  const getCardBrandName = (brand: string) => {
    switch (brand) {
      case "visa":
        return "Visa";
      case "mastercard":
        return "Mastercard";
      case "amex":
        return "American Express";
      default:
        return brand.charAt(0).toUpperCase() + brand.slice(1);
    }
  };

  return (
    <div className="min-h-screen bg-black ">
      <div >
        <div className="bg-zinc-900/10  rounded-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-black/60 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-3 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black rounded-md transition-all duration-300 group"
              >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-medium tracking-wide">Ajouter</span>
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="space-y-4 text-center">
                  <div className="w-8 h-8 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto"></div>
                  <p className="text-zinc-400 tracking-wide">Chargement...</p>
                </div>
              </div>
            ) : methods.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto">
                  <CreditCard className="w-8 h-8 text-zinc-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-light text-white tracking-wide">
                    Aucune carte enregistrée
                  </h3>
                  <p className="text-zinc-400 tracking-wide">
                    Ajoutez votre première carte de paiement
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-6">
                {methods.map((method, index) => (
                  <motion.div
                    key={method.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-zinc-900/60 border border-zinc-800/30 rounded-lg p-4 hover:border-amber-400/20 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="w-12 h-12 bg-zinc-800/50 rounded-lg flex items-center justify-center group-hover:bg-zinc-800/70 transition-colors duration-300">
                          {getCardIcon(method.card.brand)}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-white font-medium tracking-wide">
                              {getCardBrandName(method.card.brand)}
                            </h3>
                            <span className="text-zinc-400 text-sm tracking-wider">
                              •••• {method.card.last4}
                            </span>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-zinc-400">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span className="tracking-wide">
                                {method.card.exp_month
                                  .toString()
                                  .padStart(2, "0")}
                                /{method.card.exp_year}
                              </span>
                            </div>

                            {method.billing_details.name && (
                              <div className="flex items-center space-x-1">
                                <User className="w-3 h-3" />
                                <span className="tracking-wide">
                                  {method.billing_details.name}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="w-2 h-2 bg-amber-400/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Ajouter une carte"
      >
        <Elements stripe={stripePromise}>
          <PaymentMethodsForm
            onSuccess={() => {
              setShowModal(false);
              refreshPaymentMethods();
            }}
            onCancel={() => setShowModal(false)}
          />
        </Elements>
      </Modal>
    </div>
  );
};

export default PaymentMethodsSection;
