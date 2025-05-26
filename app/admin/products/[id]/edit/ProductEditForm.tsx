"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function ProductEditForm({ product }: ProductEditFormProps) {
  const router = useRouter();
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price.toString());
  const [stock, setStock] = useState(product.stock.toString());
  const [categoryId, setCategoryId] = useState(product.categoryId.toString());
  const [images, setImages] = useState(product.images.join(", "));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          stock: Number(stock),
          categoryId: Number(categoryId),
          images: images.split(",").map((img) => img.trim()),
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Erreur inconnue");
      }

      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full grid gap-6 text-sm text-zinc-300/90 relative z-10"
    >
      <h1 className="text-2xl font-bold text-white/95 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text tracking-wide">
        Modifier le produit #{product.id}
      </h1>

      <div className="grid gap-1.5">
        <Label htmlFor="name" className="text-zinc-400/90">
          Nom
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-black/80 text-white/90 border-zinc-800/90 focus:border-amber-400/30 focus-visible:ring-amber-400/30"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="description" className="text-zinc-400/90">
          Description
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
          className="bg-black/80 text-white/90 border-zinc-800/90 focus:border-amber-400/30 focus-visible:ring-amber-400/30"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="price" className="text-zinc-400/90">
          Prix (€)
        </Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="bg-black/80 text-white/90 border-zinc-800/90 focus:border-amber-400/30 focus-visible:ring-amber-400/30"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="stock" className="text-zinc-400/90">
          Stock
        </Label>
        <Input
          id="stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          className="bg-black/80 text-white/90 border-zinc-800/90 focus:border-amber-400/30 focus-visible:ring-amber-400/30"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="categoryId" className="text-zinc-400/90">
          Catégorie (ID)
        </Label>
        <Input
          id="categoryId"
          type="number"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="bg-black/80 text-white/90 border-zinc-800/90 focus:border-amber-400/30 focus-visible:ring-amber-400/30"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="images" className="text-zinc-400/90">
          Images (URLs séparées par des virgules)
        </Label>
        <Input
          id="images"
          type="text"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          placeholder="/uploads/products/xxx.jpg, /uploads/products/yyy.jpg"
          className="bg-black/80 text-white/90 border-zinc-800/90 placeholder:text-zinc-500 focus:border-amber-400/30 focus-visible:ring-amber-400/30"
        />
      </div>

      {error && <p className="text-red-500 font-medium">{error}</p>}

      <Button
        type="submit"
        disabled={loading}
        className="bg-amber-500 hover:bg-amber-600 text-black font-semibold transition-colors"
      >
        {loading ? "Modification en cours..." : "Modifier le produit"}
      </Button>
    </form>
  );
}
