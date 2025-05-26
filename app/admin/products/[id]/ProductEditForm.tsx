"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  Trash2,
  Upload,
  Package,
  Tag,
  Euro,
  Percent,
  ImageIcon,
  ChevronLeft,
  Star,
  TrendingUp,
  Eye,
} from "lucide-react";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: { _id: string; name: string };
  discount?: number;
  specifications?: any;
}

interface Props {
  initialProduct: Product;
  productId: string;
}

function imageUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  if (path.startsWith("http") || path.startsWith("//")) return path;
  return baseUrl + path;
}

export default function ProductEditForm({ initialProduct, productId }: Props) {
  const router = useRouter();
  const [product, setProduct] = useState<Product>(initialProduct);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialProduct.images[0] || null
  );

  const [formData, setFormData] = useState({
    name: initialProduct.name,
    description: initialProduct.description,
    price: initialProduct.price,
    stock: initialProduct.stock,
    images: initialProduct.images, // tableau de strings (URLs)
    category: initialProduct.category?._id || "",
    discount: initialProduct.discount || 0,
  });


  async function handleDelete() {
    try {
      setLoading(true);
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      router.push("/admin/products");
    } catch (e) {
      alert("Erreur lors de la suppression");
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  }

 async function handleSubmit(e: React.FormEvent) {
   e.preventDefault();
   setLoading(true);
   setError(null);

   try {
     let res;

     if (selectedFile) {
       // FormData avec fichier
       const data = new FormData();
       data.append("name", formData.name);
       data.append("description", formData.description);
       data.append("price", formData.price.toString());
       data.append("stock", formData.stock.toString());
       data.append("categoryId", formData.category);
       data.append("discount", formData.discount.toString());
       data.append("images", selectedFile); // clé 'images' attendue côté backend

       res = await fetch(`/api/products/${productId}`, {
         method: "PUT",
         body: data, // sans headers 'Content-Type'
       });
     } else {
       // Envoi JSON classique avec URLs
       res = await fetch(`/api/products/${productId}`, {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(formData),
       });
     }

     if (!res.ok) throw new Error("Erreur lors de la mise à jour");
     const updated = await res.json();

     // Met à jour le state local et réinitialise selectedFile
     setProduct(updated);
     setSelectedFile(null);
     setPreviewUrl(updated.images[0] || null);
     setFormData((prev) => ({
       ...prev,
       images: updated.images,
     }));

     alert("Produit mis à jour avec succès !");
   } catch (e: any) {
     setError(e.message);
     alert("Erreur lors de la mise à jour");
   } finally {
     setLoading(false);
   }
 }


  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "discount"
          ? Number(value)
          : value,
    }));
  }

  const stockPercentage = Math.min((formData.stock / 100) * 100, 100);
  const discountedPrice = formData.price * (1 - formData.discount / 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header avec navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-amber-400/20"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/products" passHref>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700 hover:border-amber-400/30 transition-colors inline-flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5 text-zinc-400" />
                </motion.div>
              </Link>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text">
                  Édition Produit
                </h1>
                <p className="text-sm text-zinc-400/90">ID: {productId}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700 hover:border-amber-400/30 transition-colors"
              >
                <Eye className="w-5 h-5 text-zinc-400" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Galerie d'images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="xl:col-span-1"
            >
              <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-2xl border border-amber-400/20 overflow-hidden">
                <div className="bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[size:20px_20px]">
                  <div className="bg-gradient-to-t from-amber-400/5 to-transparent p-6">
                    {/* Image principale */}
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-4 group">
                      {product.images && product.images.length > 0 ? (
                        <>
                          <Image
                            src={imageUrl(product.images[activeImageIndex])}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Badge discount */}
                          {formData.discount > 0 && (
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400/80 to-amber-300/90 text-black px-3 py-1 rounded-full text-sm font-semibold">
                              -{formData.discount}%
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full bg-zinc-800/50 flex flex-col items-center justify-center text-zinc-400">
                          <ImageIcon className="w-12 h-12 mb-2" />
                          <span className="text-sm">Aucune image</span>
                        </div>
                      )}
                    </div>

                    {/* Miniatures */}
                    {product.images && product.images.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {product.images.map((image, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveImageIndex(index)}
                            className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                              index === activeImageIndex
                                ? "border-amber-400/60"
                                : "border-zinc-700 hover:border-amber-400/30"
                            }`}
                          >
                            <Image
                              src={imageUrl(image)}
                              alt={`${product.name} ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats produit */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-2xl border border-amber-400/20 p-6"
              >
                <h3 className="text-lg font-semibold text-white/95 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                  Statistiques
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400/90 text-sm">
                      Prix actuel
                    </span>
                    <span className="text-amber-300/90 font-semibold">
                      {formData.price.toFixed(2)}€
                    </span>
                  </div>

                  {formData.discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400/90 text-sm">
                        Prix après remise
                      </span>
                      <span className="text-amber-300/90 font-semibold">
                        {discountedPrice.toFixed(2)}€
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400/90 text-sm">
                      Stock disponible
                    </span>
                    <span className="text-amber-300/90 font-semibold">
                      {formData.stock}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-zinc-400/90 text-sm">
                        Niveau de stock
                      </span>
                      <span className="text-amber-300/90 text-sm">
                        {stockPercentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-zinc-800/80 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stockPercentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="bg-gradient-to-r from-amber-400/60 to-amber-300/80 h-2 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Formulaire */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="xl:col-span-2"
            >
              <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-2xl border border-amber-400/20">
                <div className="bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[size:20px_20px]">
                  <div className="bg-gradient-to-t from-amber-400/5 to-transparent p-8">
                    <div onSubmit={handleSubmit} className="space-y-6">
                      {/* Nom du produit */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300/90 mb-2 flex items-center gap-2">
                          <Package className="w-4 h-4 text-amber-400" />
                          Nom du produit
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-zinc-800/50 text-white/95 placeholder-zinc-500 focus:border-amber-400/30 focus:ring-1 focus:ring-amber-400/20 transition-all"
                          placeholder="Nom du produit..."
                          required
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300/90 mb-2">
                          Description
                        </label>
                        <motion.textarea
                          whileFocus={{ scale: 1.01 }}
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-zinc-800/50 text-white/95 placeholder-zinc-500 focus:border-amber-400/30 focus:ring-1 focus:ring-amber-400/20 transition-all resize-none"
                          placeholder="Description détaillée du produit..."
                          required
                        />
                      </div>

                      {/* Prix, Stock, Remise */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-zinc-300/90 mb-2 flex items-center gap-2">
                            <Euro className="w-4 h-4 text-amber-400" />
                            Prix (€)
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.01 }}
                            type="number"
                            step="0.01"
                            min={0}
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-black/60 border border-zinc-800/50 text-white/95 focus:border-amber-400/30 focus:ring-1 focus:ring-amber-400/20 transition-all"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-zinc-300/90 mb-2 flex items-center gap-2">
                            <Package className="w-4 h-4 text-amber-400" />
                            Stock
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.01 }}
                            type="number"
                            min={0}
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-black/60 border border-zinc-800/50 text-white/95 focus:border-amber-400/30 focus:ring-1 focus:ring-amber-400/20 transition-all"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-zinc-300/90 mb-2 flex items-center gap-2">
                            <Percent className="w-4 h-4 text-amber-400" />
                            Remise (%)
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.01 }}
                            type="number"
                            min={0}
                            max={100}
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-black/60 border border-zinc-800/50 text-white/95 focus:border-amber-400/30 focus:ring-1 focus:ring-amber-400/20 transition-all"
                          />
                        </div>
                      </div>

                      {/* Catégorie */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300/90 mb-2 flex items-center gap-2">
                          <Tag className="w-4 h-4 text-amber-400" />
                          Catégorie (ID)
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="text"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-zinc-800/50 text-white/95 placeholder-zinc-500 focus:border-amber-400/30 focus:ring-1 focus:ring-amber-400/20 transition-all"
                          placeholder="ID de la catégorie..."
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-300/90 mb-2 flex items-center gap-2">
                          <Upload className="w-4 h-4 text-amber-400" />
                          Image (1 fichier)
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setSelectedFile(file);
                            if (file) {
                              setPreviewUrl(URL.createObjectURL(file));
                            } else {
                              setPreviewUrl(formData.images[0] || null);
                            }
                          }}
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-zinc-800/50 text-white/95 placeholder-zinc-500 focus:border-amber-400/30 focus:ring-1 focus:ring-amber-400/20 transition-all"
                        />

                        {previewUrl && (
                          <img
                            src={previewUrl}
                            alt="Aperçu image"
                            className="w-24 h-24 object-cover rounded-lg border border-zinc-700 mt-3"
                            onLoad={(e) =>
                              URL.revokeObjectURL(e.currentTarget.src)
                            }
                          />
                        )}
                      </div>

                      {/* Boutons d'action */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-zinc-800/50">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={loading}
                          className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-black font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                            />
                          ) : (
                            <>
                              <Save className="w-5 h-5" />
                              Enregistrer les modifications
                            </>
                          )}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={() => setShowDeleteConfirm(true)}
                          className="bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                          <Trash2 className="w-5 h-5" />
                          Supprimer
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Modal de confirmation de suppression */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowDeleteConfirm(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-2xl border border-red-500/30 p-6 max-w-md w-full"
              >
                <div className="text-center">
                  <div className="mx-auto w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
                    <Trash2 className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white/95 mb-2">
                    Confirmer la suppression
                  </h3>
                  <p className="text-zinc-400/90 mb-6">
                    Êtes-vous sûr de vouloir supprimer ce produit ? Cette action
                    est irréversible.
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Annuler
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDelete}
                      disabled={loading}
                      className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      {loading ? "Suppression..." : "Supprimer"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
