"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Package,
  Search,
  Filter,
  Grid3X3,
  List,
} from "lucide-react";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: number;
  category?: {
    id: number;
    name: string;
  };
  discount?: number;
  createdAt: string;
  updatedAt: string;
};

const PRODUCTS_PER_PAGE = 6;

// Helper pour construire l'URL complète de l'image
function imageUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  if (path.startsWith("http") || path.startsWith("//")) return path;
  return baseUrl + path;
}

export default function AdminProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/products");
        if (!res.ok)
          throw new Error("Erreur lors de la récupération des produits");
        const data = await res.json();
        setProducts(Array.isArray(data.products) ? data.products : []);
      } catch (err: any) {
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Filtrage des produits
 const filteredProducts = products.filter(
   (product) =>
     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (product.description?.toLowerCase() || "").includes(
       searchTerm.toLowerCase()
     )
 );


  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIdx,
    startIdx + PRODUCTS_PER_PAGE
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Background texture overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="relative z-10 p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text">
                Collection Produits
              </h1>
              <p className="text-zinc-400/90 text-lg">
                Gérez votre catalogue avec élégance
              </p>
            </div>

            <Link href="/admin/products/add">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] group">
                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Ajouter un produit
              </Button>
            </Link>
          </div>

          {/* Search and Controls */}
          <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-xl border border-amber-400/20 p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/60 border border-zinc-800/50 rounded-lg pl-10 pr-4 py-3 text-white/95 placeholder-zinc-400/70 focus:border-amber-400/40 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-black/40 rounded-lg p-1 border border-zinc-800/50">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-amber-500 text-black"
                      : "text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/50"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-amber-500 text-black"
                      : "text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/50"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="mt-4 pt-4 border-t border-zinc-800/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400/90">
                  {filteredProducts.length} produit
                  {filteredProducts.length > 1 ? "s" : ""} trouvé
                  {filteredProducts.length > 1 ? "s" : ""}
                </span>
                <span className="text-amber-300/90 font-medium">
                  Page {currentPage} / {totalPages}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24"
            >
              <div className="relative">
                <div className="w-16 h-16 border-4 border-zinc-800 rounded-full animate-spin border-t-amber-400"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-pulse border-t-amber-400/20"></div>
              </div>
              <p className="text-zinc-400 mt-4 text-lg">
                Chargement de votre collection...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-red-900/20 via-red-950/30 to-red-900/20 border border-red-500/30 rounded-xl p-6 text-center"
          >
            <p className="text-red-400 text-lg">{error}</p>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading &&
          !error &&
          filteredProducts.length === 0 &&
          products.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-2xl border border-amber-400/20 p-12 max-w-md mx-auto">
                <div className="relative mb-6">
                  <Package className="w-20 h-20 mx-auto text-zinc-600" />
                  <div className="absolute inset-0 w-20 h-20 mx-auto bg-amber-400/5 rounded-full animate-pulse"></div>
                </div>
                <h2 className="text-2xl font-bold text-white/95 mb-3">
                  Collection vide
                </h2>
                <p className="text-zinc-400/90 mb-6 leading-relaxed">
                  Commencez à créer votre collection luxueuse en ajoutant votre
                  premier produit d'exception.
                </p>
                <Link href="/admin/products/add">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                    <Plus className="w-5 h-5 mr-2" />
                    Créer le premier produit
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

        {/* No Search Results */}
        {!loading &&
          !error &&
          filteredProducts.length === 0 &&
          products.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-xl border border-zinc-800/50 p-8 max-w-md mx-auto">
                <Search className="w-16 h-16 mx-auto text-zinc-600 mb-4" />
                <h3 className="text-xl font-semibold text-white/95 mb-2">
                  Aucun résultat
                </h3>
                <p className="text-zinc-400/90 mb-4">
                  Aucun produit ne correspond à "{searchTerm}"
                </p>
                <Button
                  onClick={() => setSearchTerm("")}
                  variant="outline"
                  className="border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
                >
                  Effacer la recherche
                </Button>
              </div>
            </motion.div>
          )}
       

        {/* Products Grid/List */}
        {!loading && !error && filteredProducts.length > 0 && (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={
                viewMode === "grid"
                  ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  : "space-y-4"
              }
            >
              {currentProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/admin/products/${product._id}`}
                  passHref
                >
                  <motion.div
                    variants={itemVariants}
                    className="group cursor-pointer"
                  >
                    <div className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-xl border border-amber-400/20 overflow-hidden transition-all duration-500 hover:border-amber-400/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:scale-[1.02]">
                      {/* Subtle top glow */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>

                      {viewMode === "grid" ? (
                        <>
                          {/* Image Section */}
                          <div className="relative h-48 overflow-hidden">
                            {product.images && product.images.length > 0 ? (
                              <Image
                                src={imageUrl(product.images[0])}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                                <Package className="w-12 h-12 text-zinc-600" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {/* Discount Badge */}
                            {product.discount && (
                              <div className="absolute top-3 right-3 bg-amber-500 text-black px-2 py-1 rounded-lg text-xs font-bold">
                                -{product.discount.toFixed(0)}%
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <div className="mb-4">
                              <h3 className="text-xl font-bold text-white/95 mb-2 group-hover:text-amber-100 transition-colors duration-300">
                                {product.name}
                              </h3>
                              <p className="text-zinc-400/90 text-sm line-clamp-2 leading-relaxed">
                                {product.description}
                              </p>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-amber-400">
                                  {product.price.toFixed(2)} €
                                </span>
                                <div className="text-right">
                                  <p className="text-xs text-zinc-400/90">
                                    Stock
                                  </p>
                                  <p className="text-sm font-semibold text-white/90">
                                    {product.stock} unités
                                  </p>
                                </div>
                              </div>

                              {product.category?.name && (
                                <div className="pt-3 border-t border-zinc-800/50">
                                  <span className="text-xs tracking-[0.3em] text-zinc-400/90 uppercase">
                                    {product.category.name}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        /* List View */
                        <div className="flex items-center p-6 gap-6">
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            {product.images && product.images.length > 0 ? (
                              <Image
                                src={imageUrl(product.images[0])}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                                <Package className="w-6 h-6 text-zinc-600" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-white/95 mb-1 truncate">
                              {product.name}
                            </h3>
                            <p className="text-zinc-400/90 text-sm mb-2 line-clamp-1">
                              {product.description}
                            </p>
                            {product.category?.name && (
                              <span className="text-xs tracking-wide text-zinc-500 uppercase">
                                {product.category.name}
                              </span>
                            )}
                          </div>

                          <div className="text-right space-y-1">
                            <p className="text-xl font-bold text-amber-400">
                              {product.price.toFixed(2)} €
                            </p>
                            <p className="text-xs text-zinc-400/90">
                              Stock: {product.stock}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex items-center justify-center gap-4"
              >
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="border-amber-400/30 text-amber-400 hover:bg-amber-400/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 px-6 py-3"
                >
                  <ArrowLeft className="h-4 w-4" /> Précédent
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const pageNum =
                      currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                    if (pageNum > totalPages) return null;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                          pageNum === currentPage
                            ? "bg-amber-500 text-black"
                            : "text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  className="border-amber-400/30 text-amber-400 hover:bg-amber-400/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 px-6 py-3"
                >
                  Suivant <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
