"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Star,
  Heart,
  Share2,
  Shield,
  Truck,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  X,
} from "lucide-react";

import type { ProductWithId } from "@/types/product";
import { useCartStore } from "@/stores/cart";

type Props = {
  product: ProductWithId;
};

export function ProductDetails({ product }: Props) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showStockAlert, setShowStockAlert] = useState(false);

  // Animation de particules dorées
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  const { addToCart } = useCartStore();

  const handleAddToCart = async () => {
    if (product.stock === 0) {
      setShowStockAlert(true);
      setTimeout(() => setShowStockAlert(false), 3000);
      return;
    }

    setIsAddingToCart(true);

    // Animation de particules
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);

    try {
      // 1. Mise à jour locale Zustand
      await addToCart(product, quantity);

      // 2. Mise à jour côté serveur (en parallèle)
      // Tu peux lancer la requête sans attendre, ou attendre pour gérer erreurs
      fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          quantity,
        }),
        credentials: "include", // si besoin de cookies/session
      })
        .then(async (res) => {
          if (!res.ok) {
            // Gérer erreur serveur (rollback local ?)
            console.error("Erreur serveur lors de l'ajout au panier");
          } else {
            const data = await res.json();
            // Optionnel: mettre à jour le store Zustand avec data du serveur si besoin
          }
        })
        .catch((err) => {
          console.error("Erreur réseau lors de l'ajout au panier", err);
        });

      // Confirmation UI
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 4000);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
    } finally {
      setIsAddingToCart(false);
      setParticles([]);
    }
  };


  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <section className="mb-10 rounded-2xl min-h-screen py-30 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
      {/* Particules d'animation */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-amber-400 rounded-full pointer-events-none z-50"
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              scale: 0,
              opacity: 1,
            }}
            animate={{
              x: `${particle.x + 20}%`,
              y: `${particle.y - 30}%`,
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Notification de confirmation */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            className="fixed top-8 right-8 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3"
          >
            <CheckCircle2 className="w-6 h-6" />
            <div>
              <p className="font-semibold">Produit ajouté au panier !</p>
              <p className="text-sm opacity-80">{product.name}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowConfirmation(false)}
              className="ml-2 p-1 hover:bg-black/10 rounded-full"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alerte rupture de stock */}
      <AnimatePresence>
        {showStockAlert && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-8 right-8 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3"
          >
            <X className="w-6 h-6" />
            <p className="font-semibold">Produit temporairement indisponible</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
            {/* Galerie Produit avec navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative group perspective-2000"
            >
              {/* Badge discount */}
              {product.discount && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-4 -right-4 z-20 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                >
                  -{product.discount}%
                </motion.div>
              )}

              <div className="relative w-full aspect-[2.5/3.5] preserve-3d group-hover:rotate-y-6 transition-transform duration-700">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent" />
                  </div>

                  <div className="absolute inset-[12px] rounded-xl border-2 border-amber-400/20 overflow-hidden">
                    <div className="relative h-[60%] rounded-t-lg overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedImageIndex}
                          initial={{ opacity: 0, scale: 1.1 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={
                              product.images[selectedImageIndex] ||
                              product.images[0]
                            }
                            alt={product.name}
                            fill
                            className="object-cover transform-gpu transition-transform duration-700 group-hover:scale-110"
                          />
                        </motion.div>
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Actions rapides */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsWishlisted(!isWishlisted)}
                          className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                            isWishlisted
                              ? "bg-red-500/80 text-white"
                              : "bg-white/10 text-white hover:bg-white/20"
                          }`}
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              isWishlisted ? "fill-current" : ""
                            }`}
                          />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-colors"
                        >
                          <Share2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 h-[40%] p-6 bg-black/80">
                      <motion.h2
                        className="text-xl font-cinzel-decorative mb-4 text-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 bg-clip-text text-transparent">
                          {product.name}
                        </span>
                      </motion.h2>
                      <p className="text-center text-sm text-zinc-400 mb-4">
                        Produit de luxe exclusif
                      </p>

                      {/* Navigation images */}
                      {product.images.length > 1 && (
                        <div className="flex justify-center gap-2">
                          {product.images.map((_, index) => (
                            <motion.button
                              key={index}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setSelectedImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                index === selectedImageIndex
                                  ? "bg-amber-400"
                                  : "bg-zinc-600 hover:bg-zinc-500"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </motion.div>

            {/* Infos produit enrichies */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12"
            >
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-zinc-400">(127 avis)</span>
                  </div>

                  <h1 className="mt-4 cinzel-decorative-black text-5xl md:text-6xl xl:text-7xl text-white/95 tracking-tight">
                    <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
                      {product.name}
                    </span>
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    {product.discount ? (
                      <>
                        <p className="text-2xl font-light tracking-wide text-amber-300/90">
                          {discountedPrice.toLocaleString("fr-FR")} €
                        </p>
                        <p className="text-lg text-zinc-500 line-through">
                          {product.price.toLocaleString("fr-FR")} €
                        </p>
                      </>
                    ) : (
                      <p className="text-2xl font-light tracking-wide text-amber-300/90">
                        {product.price.toLocaleString("fr-FR")} €
                      </p>
                    )}
                  </div>

                  {/* Stock indicator */}
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        product.stock > 5
                          ? "bg-green-500"
                          : product.stock > 0
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                    />
                    <span className="text-sm text-zinc-400">
                      {product.stock > 5
                        ? "En stock"
                        : product.stock > 0
                        ? `Plus que ${product.stock} en stock`
                        : "Rupture de stock"}
                    </span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Description avec animations */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-lg text-zinc-300/90 leading-relaxed font-light ">
                  {product.description}
                </p>

                {/* Services premium */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-zinc-800/90">
                  <motion.div
                    className="text-center"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Truck className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                    <p className="text-xs text-zinc-400">Livraison gratuite</p>
                  </motion.div>
                  <motion.div
                    className="text-center"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Shield className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                    <p className="text-xs text-zinc-400">Garantie à vie</p>
                  </motion.div>
                  <motion.div
                    className="text-center"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <RotateCcw className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                    <p className="text-xs text-zinc-400">Retour 30j</p>
                  </motion.div>
                </div>

                {/* Spécifications */}
                {product.specifications && (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <h2 className="text-xl font-cinzel-decorative text-white/95 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      Caractéristiques
                    </h2>
                    <ul className="space-y-4">
                      <motion.li
                        className="flex justify-between border-b border-zinc-800/50 pb-2"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="text-zinc-400/90">Collection</span>
                        <span className="text-white/95">
                          {product.specifications.collection}
                        </span>
                      </motion.li>
                      <motion.li
                        className="flex justify-between border-b border-zinc-800/50 pb-2"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="text-zinc-400/90">Matériaux</span>
                        <span className="text-white/95">
                          {product.specifications.materials}
                        </span>
                      </motion.li>
                      <motion.li
                        className="flex justify-between border-b border-zinc-800/50 pb-2"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="text-zinc-400/90">Finition</span>
                        <span className="text-white/95">
                          {product.specifications.finish}
                        </span>
                      </motion.li>
                      <motion.li
                        className="flex justify-between"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="text-zinc-400/90">Certificat</span>
                        <span className="text-white/95">
                          {product.specifications.certificate}
                        </span>
                      </motion.li>
                    </ul>
                  </motion.div>
                )}
              </motion.div>

              {/* Section ajout au panier avec sélecteur quantité */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-8 space-y-6"
              >
                {product.stock > 0 && (
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-400">Quantité:</span>
                    <div className="flex items-center border border-zinc-700 rounded-lg">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-white hover:bg-zinc-800 transition-colors"
                      >
                        -
                      </motion.button>
                      <span className="px-4 py-2 text-white bg-zinc-800">
                        {quantity}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          setQuantity(Math.min(product.stock, quantity + 1))
                        }
                        className="px-3 py-2 text-white hover:bg-zinc-800 transition-colors"
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    className={`w-full h-14 text-lg font-semibold rounded-xl transition-all duration-300 relative overflow-hidden ${
                      product.stock === 0
                        ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                        : isAddingToCart
                        ? "bg-amber-600 text-black"
                        : "bg-amber-500 hover:bg-amber-600 text-black hover:shadow-2xl hover:shadow-amber-500/20"
                    }`}
                    onClick={handleAddToCart}
                    disabled={isAddingToCart || product.stock === 0}
                  >
                    <AnimatePresence mode="wait">
                      {isAddingToCart ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <Sparkles className="w-6 h-6" />
                          </motion.div>
                          Ajout en cours...
                        </motion.div>
                      ) : product.stock === 0 ? (
                        <motion.div
                          key="out-of-stock"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <X className="w-5 h-5" />
                          Temporairement indisponible
                        </motion.div>
                      ) : (
                        <motion.div
                          key="add-to-cart"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3"
                        >
                          <ShoppingCart className="w-6 h-6" />
                          Ajouter au panier •{" "}
                          {(discountedPrice * quantity).toLocaleString(
                            "fr-FR"
                          )}{" "}
                          €
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Effet de lueur au survol */}
                    {!isAddingToCart && product.stock > 0 && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                        animate={{ x: ["100%", "-100%"] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "linear",
                        }}
                      />
                    )}
                  </Button>
                </motion.div>

                
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
