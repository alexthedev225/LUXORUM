"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/stores/cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  Heart,
  Star,
  Shield,
  Truck,
  CreditCard,
  Gift,
  ArrowRight,
  Info,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import StripeTestCards from "./components/StripeTestCards";
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, setItems } = useCartStore();
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [appliedPromo, setAppliedPromo] = useState("");

  const handleClearCart = async () => {
    setItems([]);

    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error(
          "Erreur API /api/cart DELETE:",
          errorData.message || res.statusText
        );
      }
    } catch (error) {
      console.error("Erreur réseau DELETE /api/cart:", error);
    }
  };

  const handleQuantityChange = async (productId: string, qty: number) => {
    if (qty < 1) return;

    updateQuantity(productId, qty);

    

    const currentItems = items;

    const itemsForApi = currentItems.map((item) => ({
      productId: item.product._id,
      quantity: item.product._id === productId ? qty : item.quantity,
    }));

    try {
      // 3. Appeler API PUT pour mise à jour serveur
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: itemsForApi }),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error(
          "Erreur API /api/cart PUT:",
          errorData.message || res.statusText
        );
      } else {
        const updatedCart = await res.json();
      }
    } catch (error) {
      console.error("Erreur réseau lors du PUT /api/cart:", error);
      // Optionnel rollback
    }
  };

  const checkoutSession = async () => {
    if (items.length === 0) {
      alert("Votre panier est vide.");
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }), // tu peux aussi passer userId si nécessaire côté backend
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la création de la session Stripe.");
      }

      const data = await res.json();
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe n'a pas pu être initialisé.");
      }

      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (result.error) {
        console.error(result.error.message);
        alert("Erreur Stripe : " + result.error.message);
      }
    } catch (error: any) {
      console.error("Erreur Checkout:", error);
      alert("Une erreur est survenue : " + error.message);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    // 1. Mise à jour locale immédiate (optimiste)
    removeFromCart(productId);

    try {
      // 2. Appel API DELETE pour supprimer un item précis
      const res = await fetch(`/api/cart/item/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error(
          "Erreur API /api/cart/item DELETE:",
          errorData.message || res.statusText
        );
        // Optionnel rollback local si suppression serveur échoue
        // Ici, tu pourrais re-ajouter l’item en local si tu veux (pas obligatoire)
      } else {
        const updatedCart = await res.json();
        // Optionnel : synchroniser Zustand avec serveur
        // setItems(updatedCart.items);
      }
    } catch (error) {
      console.error("Erreur réseau DELETE /api/cart/item:", error);
      // Optionnel rollback local ici
    }
  };

  const toggleSaveItem = (productId: string) => {
    setSavedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Calculs détaillés
  const subtotal = items.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );
  const shipping = subtotal > 150 ? 0 : 15;
  const tax = subtotal * 0.2; // TVA 20%
  const promoDiscount = appliedPromo ? subtotal * 0.1 : 0;
  const total = subtotal + shipping + tax - promoDiscount;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black rounded-2xl mb-2 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative max-w-4xl px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-8">
              <ShoppingBag className="w-24 h-24 mx-auto text-amber-400/30 mb-6" />
              <h1 className="text-4xl font-light mb-4">
                <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text">
                  Votre Panier
                </span>
              </h1>
              <p className="text-zinc-400/90 text-lg max-w-md mx-auto leading-relaxed">
                Votre panier est actuellement vide. Découvrez nos créations
                exclusives pour commencer votre sélection.
              </p>
            </div>

            <Link
              href="/boutique"
              className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-black font-medium px-8 py-3 rounded-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25"
            >
              Découvrir nos Collections
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black py-12 rounded-2xl mb-2">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-light mb-2">
                <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text">
                  Votre Sélection
                </span>
              </h1>
              <p className="text-sm tracking-[0.3em] text-zinc-400/90 uppercase">
                {items.length} Article{items.length > 1 ? "s" : ""} •{" "}
                {items.reduce((sum, { quantity }) => sum + quantity, 0)} Pièce
                {items.reduce((sum, { quantity }) => sum + quantity, 0) > 1
                  ? "s"
                  : ""}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Badge
                variant="outline"
                className="border-amber-400/20 text-amber-300/90 bg-amber-400/5"
              >
                <Shield className="w-3 h-3 mr-1" />
                Paiement Sécurisé
              </Badge>
            </div>
          </div>

          {/* Barre de progression livraison gratuite */}
          {subtotal < 150 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-zinc-800/50 rounded-lg p-4 mb-8"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-zinc-300/90">
                    Livraison gratuite à partir de 150€
                  </span>
                </div>
                <span className="text-sm text-amber-300/90 font-medium">
                  {(150 - subtotal).toFixed(2)}€ restants
                </span>
              </div>
              <div className="w-full bg-zinc-800/80 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-amber-400/60 to-amber-300/80 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((subtotal / 150) * 100, 100)}%` }}
                />
              </div>
            </motion.div>
          )}
          <StripeTestCards />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Liste des articles */}
          <div className="lg:col-span-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <AnimatePresence mode="popLayout">
                {items.map(({ product, quantity }) => (
                  <motion.div
                    key={product._id}
                    variants={itemVariants}
                    layout
                    exit={{
                      opacity: 0,
                      x: -100,
                      transition: { duration: 0.3 },
                    }}
                    className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-zinc-800/50 rounded-lg overflow-hidden group hover:border-amber-400/20 transition-all duration-500"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Image produit */}
                        <div className="relative flex-shrink-0">
                          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden bg-zinc-800/30">
                            <Image
                              src={product.images?.[0] || "/placeholder.jpg"}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="160px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          </div>

                          {/* Badge de qualité */}
                          <Badge className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs px-2 py-1">
                            Premium
                          </Badge>
                        </div>

                        {/* Détails produit */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-medium text-white/95 mb-1">
                                {product.name}
                              </h3>
                              <p className="text-sm text-zinc-400/90 line-clamp-2 mb-2">
                                {product.description}
                              </p>

                              {/* Étoiles et avis */}
                              <div className="flex items-center space-x-2 mb-3">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className="w-3 h-3 text-amber-400 fill-amber-400"
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-zinc-400/70">
                                  (4.8) • 127 avis
                                </span>
                              </div>

                              {/* Informations produit */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                <Badge
                                  variant="outline"
                                  className="border-zinc-700 text-zinc-400 text-xs"
                                >
                                  Fait main
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="border-zinc-700 text-zinc-400 text-xs"
                                >
                                  Matériaux nobles
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="border-zinc-700 text-zinc-400 text-xs"
                                >
                                  Édition limitée
                                </Badge>
                              </div>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleSaveItem(product._id)}
                              className="text-zinc-400 hover:text-amber-400 transition-colors"
                            >
                              <Heart
                                className={`w-5 h-5 ${
                                  savedItems.includes(product._id)
                                    ? "fill-amber-400 text-amber-400"
                                    : ""
                                }`}
                              />
                            </Button>
                          </div>

                          {/* Prix et contrôles */}
                          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                            <div>
                              <div className="text-2xl font-light text-white/95 mb-1">
                                {(product.price * quantity).toFixed(2)}€
                              </div>
                              <div className="text-sm text-zinc-400/90">
                                {product.price.toFixed(2)}€ × {quantity}
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              {/* Contrôles quantité */}
                              <div className="flex items-center bg-zinc-800/80 rounded-lg border border-zinc-700/50">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-10 w-10 hover:bg-zinc-700/50 text-zinc-400 hover:text-white"
                                  onClick={() =>
                                    handleQuantityChange(
                                      product._id,
                                      quantity - 1
                                    )
                                  }
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <div className="w-12 text-center text-white/95 font-medium">
                                  {quantity}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-10 w-10 hover:bg-zinc-700/50 text-zinc-400 hover:text-white"
                                  onClick={() =>
                                    handleQuantityChange(
                                      product._id,
                                      quantity + 1
                                    )
                                  }
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>

                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveItem(product._id)}
                                className="text-zinc-400 hover:text-red-400 transition-colors h-10 w-10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Informations de livraison */}
                          <div className="mt-4 pt-4 border-t border-zinc-800/50">
                            <div className="flex items-center space-x-4 text-xs text-zinc-400/90">
                              <div className="flex items-center space-x-1">
                                <Truck className="w-3 h-3" />
                                <span>Livraison 2-3 jours</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Shield className="w-3 h-3" />
                                <span>Garantie 2 ans</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Gift className="w-3 h-3" />
                                <span>Emballage premium</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Résumé de commande */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-6"
            >
              <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-zinc-800/50 rounded-lg p-6 mb-6">
                {/* Header avec action clear */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-medium text-white/95">
                    Résumé de la commande
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearCart}
                    className="group relative overflow-hidden px-3 py-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/5 border border-zinc-700/50 hover:border-red-500/30 rounded-lg transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center space-x-2">
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">Vider</span>
                    </div>
                  </Button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-zinc-300/90">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>

                  <div className="flex justify-between text-zinc-300/90">
                    <span className="flex items-center space-x-1">
                      <span>Livraison</span>
                      <Info className="w-3 h-3 text-zinc-500" />
                    </span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-400">Gratuite</span>
                      ) : (
                        `${shipping.toFixed(2)}€`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-zinc-300/90">
                    <span>TVA (20%)</span>
                    <span>{tax.toFixed(2)}€</span>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Réduction</span>
                      <span>-{promoDiscount.toFixed(2)}€</span>
                    </div>
                  )}

                  <div className="border-t border-zinc-800/50 pt-4">
                    <div className="flex justify-between text-lg font-medium text-white/95">
                      <span>Total</span>
                      <span>{total.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={checkoutSession}
                  size="lg"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-medium py-3 rounded-lg tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] mb-4"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Finaliser la commande
                </Button>

                <div className="flex items-center justify-center space-x-2 text-xs text-zinc-400/70">
                  <CreditCard className="w-3 h-3" />
                  <span>Paiement 100% sécurisé</span>
                </div>
              </div>

              {/* Avantages VIP */}
              <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-400/20 to-amber-300/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                  </div>
                  <h4 className="text-sm font-medium text-amber-300/90 uppercase tracking-wide">
                    Membre VIP
                  </h4>
                </div>

                <div className="space-y-2 text-xs text-zinc-400/90">
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-amber-400 rounded-full" />
                    <span>Livraison express prioritaire</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-amber-400 rounded-full" />
                    <span>Emballage cadeau gratuit</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-amber-400 rounded-full" />
                    <span>Service client dédié 24/7</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
