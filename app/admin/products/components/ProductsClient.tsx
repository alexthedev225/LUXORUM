"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Plus, Package, Search } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import HeaderSection from "./HeaderSection";


type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: number;
  category?: { id: number; name: string };
  discount?: number;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  products: Product[];
  totalFiltered: number;
  currentPage: number;
  totalPages: number;
  searchTerm: string;
};


export default function ProductsClient({
  products,
  totalFiltered,
  currentPage,
  totalPages,
  searchTerm: initialSearchTerm,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // States contrôlant la recherche et affichage côté client
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Pour naviguer en modifiant les query params
 const updateUrl = (params: { page?: number; search?: string }) => {
   const current = new URLSearchParams(window.location.search); // ← mise à jour dynamique

   if (params.page !== undefined) current.set("page", params.page.toString());
   if (params.search !== undefined) current.set("search", params.search);

   // reset page à 1 si recherche change
   if (params.search !== undefined && params.search !== searchTerm) {
     current.set("page", "1");
   }

   router.push(`${window.location.pathname}?${current.toString()}`);
 };


  // Gestion soumission recherche (ex: au submit form)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl({ search: searchTerm, page: 1 });
  };

  // Pagination clic
  const goToPage = (page: number) => {
    updateUrl({ page });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  // helper image URL (à extraire dans utils)
  const imageUrl = (path: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    return path.startsWith("http") ? path : `${baseUrl}${path}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black p-6 max-w-7xl mx-auto">
      <HeaderSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        viewMode={viewMode}
        setViewMode={setViewMode}
        currentPage={currentPage}
        totalPages={totalPages}
        totalFiltered={totalFiltered}
        onSearchSubmit={handleSearchSubmit}
      />

      {totalFiltered === 0 ? (
        <div className="text-center py-24">
          <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-2xl border border-amber-400/20 p-12 max-w-md mx-auto">
            <div className="relative mb-6">
              <Package className="w-20 h-20 mx-auto text-zinc-600" />
              <div className="absolute inset-0 w-20 h-20 mx-auto bg-amber-400/5 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-2xl font-bold text-white/95 mb-3">
              Collection vide
            </h2>
            <p className="text-zinc-400/90 mb-6">
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
        </div>
      ) : (
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
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                viewMode={viewMode}
                variants={itemVariants}
                imageUrl={imageUrl}
              />
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
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
                      onClick={() => goToPage(pageNum)}
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
                onClick={() => goToPage(currentPage + 1)}
                className="border-amber-400/30 text-amber-400 hover:bg-amber-400/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 px-6 py-3"
              >
                Suivant <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
