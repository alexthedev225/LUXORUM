"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Grid3X3, List, Plus, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

interface HeaderSectionProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  currentPage: number;
  totalPages: number;
  totalFiltered: number;
}

export default function HeaderSection({
  searchTerm,
  setSearchTerm,
  onSearchSubmit,
  viewMode,
  setViewMode,
  currentPage,
  totalPages,
  totalFiltered,
}: HeaderSectionProps) {
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="mb-8"
    >
      {/* Titre + bouton ajouter */}
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

      {/* Zone recherche + affichage */}
      <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-xl border border-amber-400/20 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Formulaire de recherche */}
          <form
            onSubmit={onSearchSubmit}
            className="relative flex-1 max-w-md"
            role="search"
            aria-label="Recherche produits"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/60 border border-zinc-800/50 rounded-lg pl-10 pr-4 py-3 text-white/95 placeholder-zinc-400/70 focus:border-amber-400/40 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
              aria-label="Recherche produit"
            />
          </form>

          {/* Boutons grille/liste */}
          <div className="flex items-center gap-2 bg-black/40 rounded-lg p-1 border border-zinc-800/50">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-pressed={viewMode === "grid"}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-amber-500 text-black"
                  : "text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/50"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              aria-pressed={viewMode === "list"}
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

        {/* Statistiques */}
        <div className="mt-4 pt-4 border-t border-zinc-800/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400/90">
              {totalFiltered} produit{totalFiltered > 1 ? "s" : ""} trouvé
              {totalFiltered > 1 ? "s" : ""}
            </span>
            <span className="text-amber-300/90 font-medium">
              Page {currentPage} / {totalPages}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
