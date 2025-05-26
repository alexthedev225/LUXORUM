"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Stepper from "./Stepper";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const steps = [
  { id: 1, title: "Infos produit" },
  { id: 2, title: "Description & Specs" },
  { id: 3, title: "Images & Finalisation" },
];

export default function MultiStepProductForm() {
  const [categories, setCategories] = useState<
    { _id: string; name: string; position?: string }[]
  >([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    categoryId: "",
    description: "",
    detailedDescription: "",
    specifications: "",
    images: null as FileList | null,
  });
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Erreur récupération catégories:", error);
      }
    }

    fetchCategories();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = new FormData();
    body.append("name", formData.name);
    body.append("price", formData.price);
    body.append("stock", formData.stock);
    body.append("categoryId", formData.categoryId);
    body.append("description", formData.description);
    body.append("detailedDescription", formData.detailedDescription);
    body.append("specifications", formData.specifications);

    if (formData.images) {
      for (const file of Array.from(formData.images)) {
        body.append("images", file);
      }
    }

    const response = await fetch("/api/products", {
      method: "POST",
      body,
    });

    const result = await response.json();
    if (response.ok) {
      alert("Produit ajouté avec succès !");
    } else {
      alert("Erreur : " + result.error);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;

    // Vérifie si c'est un input de type file avant d'accéder à files
    if (target instanceof HTMLInputElement && target.type === "file") {
      const files = target.files; // Type FileList | null
      if (files) {
        setFormData((prev) => ({ ...prev, [target.name]: files }));
      }
    } else {
      // Pour les autres inputs / textarea / select
      setFormData((prev) => ({
        ...prev,
        [target.name]: (
          target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        ).value,
      }));
    }
  };
  // Exemple simple qui met à jour formData.specifications directement
  const handleSpecsChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      specifications: value,
    }));
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <section className="max-w-4xl mx-auto p-4 text-white font-sans select-none relative z-10">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-8"
      >
        {currentStep === 1 && (
          <Step1
            formData={formData}
            onChange={handleChange}
            categories={categories} // 👈
          />
        )}

        {currentStep === 2 && (
          <Step2
            formData={formData}
            onChange={handleChange}
            onSpecsChange={handleSpecsChange} // 👈 ajout ici
          />
        )}

        {currentStep === 3 && (
          <Step3
            formData={{ images: formData.images }} // ne passe que la partie images
            setFormData={(newState) => {
              if (typeof newState === "function") {
                // newState est une fonction (prev => ...)
                setFormData((prev) => ({
                  ...prev,
                  images: newState({ images: prev.images }).images,
                }));
              } else {
                // newState est un objet { images: FileList | null }
                setFormData((prev) => ({
                  ...prev,
                  images: newState.images,
                }));
              }
            }}
          />
        )}

        <div className="flex justify-between mt-8">
          {currentStep > 1 ? (
            <Button
              type="button"
              onClick={prevStep}
              className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg px-6 py-3 transition"
            >
              Précédent
            </Button>
          ) : (
            <div />
          )}
          <Button
            type="button"
            onClick={() => {
              if (currentStep === steps.length) {
                handleSubmit(new Event("submit") as any); // tu peux remplacer ça par une meilleure fonction plus bas
              } else {
                nextStep();
              }
            }}
            className="bg-gradient-to-r from-amber-400 to-amber-300 text-black font-semibold rounded-lg px-6 py-3 shadow-lg shadow-amber-500/50 hover:from-amber-500 hover:to-amber-400 transition-colors duration-300"
          >
            {currentStep === steps.length ? "Envoyer" : "Suivant"}
          </Button>
        </div>
      </form>
    </section>
  );
}
