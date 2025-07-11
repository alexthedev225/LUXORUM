"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  ShoppingCart,
  Star,
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
  const [quantity, setQuantity] = useState(1);
  const [showStockAlert, setShowStockAlert] = useState(false);

  // Particules dorées
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

    // Particules animées
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);

    try {
      await addToCart(product, quantity);

      fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          quantity,
        }),
        credentials: "include",
      })
        .then(async (res) => {
          if (!res.ok) {
            console.error("Erreur serveur lors de l'ajout au panier");
          }
        })
        .catch((err) => {
          console.error("Erreur réseau lors de l'ajout au panier", err);
        });

      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 4000);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
    } finally {
      setIsAddingToCart(false);
      setParticles([]);
    }
  };

  // Parse description détaillée pour texte gras entouré de **
  const renderDetailedDescription = (text: string) => {
    const parts = text.split("**");
    return parts.map((part, index) =>
      index % 2 === 1 ? (
        <strong key={index} className="font-semibold text-amber-300/90">
          {part}
        </strong>
      ) : (
        <span key={index}>{part}</span>
      )
    );
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

      {/* Confirmation ajout panier */}
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
            {/* Colonne gauche: Galerie + description détaillée */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative group perspective-2000 flex  flex-col "
            >
              {/* Carte image centrée */}
              <div className=" rounded-2xl bg-black/80 border-2 border-amber-200/20 p-4 shadow-lg w-max">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="object-contain rounded-2xl bg-transparent"
                />
              </div>

              {/* Description détaillée sous l'image */}
              {product.specifications.detailedDescription && (
                <motion.div
                  className="mt-10  text-zinc-300 font-light leading-relaxed max-w-xl mx-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <h2 className="text-white text-2xl mb-4 font-cinzel-decorative flex items-center gap-2 ">
                    <Sparkles className="w-6 h-6 text-amber-400" />
                    Description détaillée
                  </h2>
                  <p>
                    {renderDetailedDescription(
                      product.specifications.detailedDescription
                    )}
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Colonne droite: infos produit */}
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

              {/* Description courte */}
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

              {/* Ajout au panier */}
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
                        onClick={() => setQuantity((q) => (q > 1 ? q - 1 : q))}
                        className="px-4 py-2 font-bold text-zinc-400 hover:text-amber-400"
                      >
                        -
                      </motion.button>
                      <input
                        type="number"
                        className="w-12 text-center bg-transparent border-none focus:ring-0 text-white font-semibold"
                        min={1}
                        max={product.stock}
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(
                            Math.min(
                              product.stock,
                              Math.max(1, Number(e.target.value))
                            )
                          )
                        }
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          setQuantity((q) => (q < product.stock ? q + 1 : q))
                        }
                        className="px-4 py-2 font-bold text-zinc-400 hover:text-amber-400"
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                )}
                <Button
                  className="w-full rounded-lg bg-amber-400 text-black font-bold hover:bg-amber-300 transition-all duration-200"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || product.stock === 0}
                >
                  {product.stock === 0
                    ? "Rupture de stock"
                    : isAddingToCart
                    ? "Ajout en cours..."
                    : "Ajouter au panier"}
                  <ShoppingCart className="ml-3 w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
