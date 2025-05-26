"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  ArrowLeftCircle,
  Save,
  Hash,
  FileText,
  AlignLeft,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NewCategoryPage() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    longDescription: "",
    position: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "position" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur inconnue.");
        return;
      }

      router.push("/admin/category");
    } catch (err) {
      console.error(err);
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Overlay décoratif subtil */}
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <main className="relative z-10 p-6 md:p-10 max-w-4xl mx-auto">
        {/* Header avec lueur dorée */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent rounded-3xl blur-xl" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 bg-gradient-to-br from-zinc-900/80 via-black/60 to-zinc-900/80 rounded-3xl border border-amber-400/20 backdrop-blur-sm">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text tracking-wide">
                Nouvelle Catégorie
              </h1>
              <p className="text-sm tracking-[0.3em] text-zinc-400/90 uppercase">
                Administration • Création
              </p>
            </div>

            <Link href="/admin/category">
              <Button
                variant="ghost"
                className="text-zinc-300/90 hover:text-amber-300 hover:bg-amber-400/10 transition-all duration-300 rounded-xl backdrop-blur-sm border border-zinc-800/50 hover:border-amber-400/30"
              >
                <ArrowLeftCircle className="w-5 h-5 mr-2" />
                Retour
              </Button>
            </Link>
          </div>
        </div>

        {/* Formulaire principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent rounded-3xl blur-2xl" />

          <form
            onSubmit={handleSubmit}
            className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20 rounded-3xl p-8 md:p-10 backdrop-blur-sm shadow-2xl"
          >
            <div className="grid gap-8 md:grid-cols-2">
              {/* Colonne gauche */}
              <div className="space-y-8">
                {/* Nom de la catégorie */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-3"
                >
                  <Label
                    htmlFor="name"
                    className="flex items-center gap-2 text-zinc-300/90 font-medium tracking-wide"
                  >
                    <FileText className="w-4 h-4 text-amber-400/70" />
                    Nom de la catégorie
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="bg-black/80 border-zinc-800/50 text-white/95 focus:border-amber-400/50 focus:ring-amber-400/20 rounded-xl h-12 transition-all duration-300"
                    placeholder="Ex: Montres de luxe"
                    required
                  />
                </motion.div>

                {/* Slug */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  <Label
                    htmlFor="slug"
                    className="flex items-center gap-2 text-zinc-300/90 font-medium tracking-wide"
                  >
                    <Hash className="w-4 h-4 text-amber-400/70" />
                    Identifiant URL (slug)
                  </Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    className="bg-black/80 border-zinc-800/50 text-white/95 focus:border-amber-400/50 focus:ring-amber-400/20 rounded-xl h-12 font-mono transition-all duration-300"
                    placeholder="Ex: montres-de-luxe"
                    required
                  />
                  <p className="text-xs text-zinc-400/90 flex items-center gap-1">
                    <span>Utilisé dans l'URL de la catégorie</span>
                  </p>
                </motion.div>

                {/* Position */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  <Label
                    htmlFor="position"
                    className="flex items-center gap-2 text-zinc-300/90 font-medium tracking-wide"
                  >
                    <BarChart3 className="w-4 h-4 text-amber-400/70" />
                    Position d'affichage
                  </Label>
                  <Input
                    id="position"
                    name="position"
                    type="number"
                    value={form.position}
                    onChange={handleChange}
                    className="bg-black/80 border-zinc-800/50 text-white/95 focus:border-amber-400/50 focus:ring-amber-400/20 rounded-xl h-12 transition-all duration-300"
                    min="1"
                    required
                  />
                  <p className="text-xs text-zinc-400/90">
                    Ordre d'affichage dans le menu (1 = premier)
                  </p>
                </motion.div>
              </div>

              {/* Colonne droite */}
              <div className="space-y-8">
                {/* Description courte */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-3"
                >
                  <Label
                    htmlFor="description"
                    className="flex items-center gap-2 text-zinc-300/90 font-medium tracking-wide"
                  >
                    <AlignLeft className="w-4 h-4 text-amber-400/70" />
                    Description courte
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="bg-black/80 border-zinc-800/50 text-white/95 focus:border-amber-400/50 focus:ring-amber-400/20 rounded-xl h-12 transition-all duration-300"
                    placeholder="Résumé en une ligne..."
                  />
                  <p className="text-xs text-zinc-400/90">
                    Apparaît dans les listes et cartes de catégories
                  </p>
                </motion.div>

                {/* Description longue */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  <Label
                    htmlFor="longDescription"
                    className="flex items-center gap-2 text-zinc-300/90 font-medium tracking-wide"
                  >
                    <FileText className="w-4 h-4 text-amber-400/70" />
                    Description détaillée
                  </Label>
                  <Textarea
                    id="longDescription"
                    name="longDescription"
                    value={form.longDescription}
                    onChange={handleChange}
                    className="bg-black/80 border-zinc-800/50 text-white/95 focus:border-amber-400/50 focus:ring-amber-400/20 rounded-xl min-h-[140px] resize-none transition-all duration-300"
                    placeholder="Description complète de la catégorie, son univers, ses produits..."
                    required
                  />
                  <p className="text-xs text-zinc-400/90">
                    Affichée sur la page de la catégorie
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Message d'erreur */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
              >
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0" />
                  {error}
                </p>
              </motion.div>
            )}

            {/* Bouton de soumission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10"
            >
              <Button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold h-14 rounded-xl transition-all duration-300 shadow-lg hover:shadow-amber-500/25 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Création en cours...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-3" />
                    Créer la catégorie
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>

        {/* Informations complémentaires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-6 bg-gradient-to-br from-zinc-900/60 via-black/80 to-zinc-900/60 border border-zinc-800/50 rounded-2xl"
        >
          <h3 className="text-lg font-semibold text-white/95 mb-4">
            Conseils pour une catégorie optimale
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-zinc-300/90">
            <div className="space-y-2">
              <p>
                <strong className="text-amber-300/90">Nom :</strong> Utilisez un
                nom évocateur et précis
              </p>
              <p>
                <strong className="text-amber-300/90">Slug :</strong> Préférez
                les tirets aux espaces, en minuscules
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <strong className="text-amber-300/90">Position :</strong> Plus
                le chiffre est bas, plus la catégorie apparaît en premier
              </p>
              <p>
                <strong className="text-amber-300/90">Description :</strong>{" "}
                Décrivez l'univers et l'expérience proposée
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
