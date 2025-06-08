"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, RefreshCcw, Edit, BarChart3, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  longDescription?: string;
  position: number;
  productsCount: number;
  createdAt: string;
  updatedAt: string;
}

interface CategoriesClientProps {
  initialCategories: Category[];
}

export default function CategoriesClient({
  initialCategories,
}: CategoriesClientProps) {
  const [categories, setCategories] = useState<Category[] | null>(
    initialCategories
  );
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Erreur lors du fetch");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <>
      {/* Header */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent rounded-3xl blur-xl" />
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-8 bg-gradient-to-br from-zinc-900/80 via-black/60 to-zinc-900/80 rounded-3xl border border-amber-400/20 backdrop-blur-sm">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text tracking-wide">
              Gestion des Catégories
            </h1>
            <p className="text-sm tracking-[0.3em] text-zinc-400/90 uppercase">
              Administration • Catalogue
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="bg-black/80 border-zinc-800/50 text-zinc-300/90 hover:bg-zinc-800/80 hover:border-amber-400/30 transition-all duration-300 rounded-xl backdrop-blur-sm"
              onClick={fetchCategories}
              disabled={loading}
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              {loading ? "Chargement..." : "Rafraîchir"}
            </Button>
            <Link href="/admin/category/new">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold transition-all duration-300 rounded-xl shadow-lg hover:shadow-amber-500/25">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle catégorie
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Grille des catégories */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading && !categories
          ? Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-400/10 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Skeleton className="relative h-48 rounded-2xl bg-gradient-to-br from-zinc-900/60 via-black/80 to-zinc-900/60 border border-zinc-800/50" />
                </div>
              </motion.div>
            ))
          : categories?.map((cat, index) => (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="relative">
                  {/* Lueur d'hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-400/10 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  <Card className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20 rounded-2xl overflow-hidden hover:border-amber-400/40 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-amber-500/10">
                    <CardContent className="p-6 space-y-4">
                      {/* Header de la carte */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-white/95 mb-1 group-hover:text-amber-100 transition-colors duration-300">
                            {cat.name}
                          </h2>
                          <div className="flex items-center gap-2 text-xs text-zinc-400/90">
                            <span className="px-2 py-1 bg-black/60 rounded-md font-mono">
                              {cat.slug}
                            </span>
                          </div>
                        </div>

                        {/* Badge du nombre de produits */}
                        <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-400/20 to-amber-300/30 rounded-full">
                          <BarChart3 className="w-3 h-3 text-amber-300/90" />
                          <span className="text-xs text-amber-300/90 font-semibold">
                            {cat.productsCount}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <p className="text-sm text-zinc-300/90 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                          {cat.description ||
                            "Aucune description disponible pour cette catégorie."}
                        </p>
                      </div>

                      {/* Footer avec date et actions */}
                      <div className="pt-4 border-t border-zinc-800/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-zinc-400/90">
                            <Calendar className="w-3 h-3" />
                            <span>Créée le {formatDate(cat.createdAt)}</span>
                          </div>

                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-zinc-400 hover:text-amber-300 hover:bg-amber-400/10 transition-all duration-300"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Barre de progression pour la position */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-zinc-400/90">
                            Position
                          </span>
                          <span className="text-xs text-amber-300/90">
                            #{cat.position}
                          </span>
                        </div>
                        <div className="h-1 bg-zinc-800/80 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400/60 to-amber-300/80 rounded-full transition-all duration-700"
                            style={{
                              width: `${Math.min(cat.position * 10, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
      </div>

      {/* Message si aucune catégorie */}
      {!loading && categories?.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="bg-gradient-to-br from-zinc-900/60 via-black/80 to-zinc-900/60 border border-amber-400/20 rounded-3xl p-12 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-white/95 mb-4">
              Aucune catégorie
            </h3>
            <p className="text-zinc-300/90 mb-6">
              Commencez par créer votre première catégorie pour organiser votre
              catalogue.
            </p>
            <Link href="/admin/category/new">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                Créer une catégorie
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
}
