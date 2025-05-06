"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductFormProps {
  categories: Array<{ id: string; name: string }>;
}

export function ProductForm({ categories }: ProductFormProps) {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newImages]);

      // Créer les previews
      newImages.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Ajouter chaque image au formData
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Images</label>
        <input
          type="file"
          onChange={handleImageChange}
          multiple
          accept="image/*"
          className="w-full"
        />
        <div className="mt-4 flex gap-4 flex-wrap">
          {previews.map((preview, index) => (
            <div key={index} className="relative w-24 h-24">
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Autres champs du formulaire */}
      <div className="grid grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Nom du produit"
          className="border p-2 rounded"
          required
        />
        <select name="categoryId" className="border p-2 rounded" required>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {/* ...autres champs... */}
    </form>
  );
}
