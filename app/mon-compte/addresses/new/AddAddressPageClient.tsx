"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, memo } from "react";
import { Check, MapPin, Globe, Building, Hash, Star } from "lucide-react";

const citiesCI = [
  "Abidjan",
  "Yamoussoukro",
  "Bouaké",
  "Daloa",
  "San-Pédro",
  "Korhogo",
  "Man",
  "Divo",
  "Gagnoa",
  "Abengourou",
  "Grand-Bassam",
  "Jacqueville",
];
import toast from "react-hot-toast";

type FormData = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

type FormFieldProps = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  required?: boolean;
};

const FormField = memo(
  ({ label, icon: Icon, children, required = false }: FormFieldProps) => (
    <div className="group relative">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900/60 border border-zinc-700/40 group-focus-within:border-amber-400/40 group-focus-within:bg-amber-400/5 transition-all duration-300">
          <Icon className="w-4 h-4 text-zinc-400 group-focus-within:text-amber-400 transition-colors duration-300" />
        </div>
        <label className="text-white font-light text-sm tracking-wide">
          {label}
          {required && <span className="text-amber-400 ml-1">*</span>}
        </label>
      </div>
      {children}
    </div>
  )
);

export default function AddAddressPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Côte d'Ivoire",
    isDefault: false,
  });

  const [loading, setLoading] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  // useCallback pour garder la même référence
  const handleChange = useCallback((field: keyof FormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".dropdown-city")) {
        setCityDropdownOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
        const response = await fetch("/api/account/addresses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de l'enregistrement de l'adresse.");
        }

        await response.json();
        toast.success("Adresse enregistrée avec succès !");
        window.location.href = "/mon-compte/addresses";
      } catch (err) {
        console.error("Erreur:", err);
        toast.error("Une erreur est survenue. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    },
    [form, router]
  );



  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/20 via-black to-zinc-900/30"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"></div>

      <div className="relative z-10 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400/10 to-amber-500/20 border border-amber-400/20 mb-6">
              <MapPin className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-4xl font-extralight text-white tracking-wide mb-4">
              Nouvelle adresse
            </h1>
            <p className="text-zinc-400 text-base font-light tracking-wide max-w-md mx-auto leading-relaxed">
              Ajoutez une nouvelle adresse à votre carnet pour faciliter vos
              commandes futures
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 shadow-2xl space-y-12"
          >
            <FormField label="Adresse complète" icon={Building} required>
              <input
                type="text"
                placeholder="Rue, avenue, quartier..."
                value={form.street}
                onChange={(e) => handleChange("street", e.target.value)}
                className="w-full h-14 bg-zinc-900/40 border border-zinc-700/30 rounded-xl px-6 text-white placeholder-zinc-500 font-light tracking-wide focus:border-amber-400/50 focus:bg-zinc-900/60 focus:outline-none transition-all duration-300"
                required
              />
            </FormField>

            <FormField label="Pays" icon={Globe}>
              <div className="relative">
                <input
                  type="text"
                  value={form.country}
                  readOnly
                  className="w-full h-14 bg-zinc-900/20 border border-zinc-700/20 rounded-xl px-6 text-zinc-300 font-light tracking-wide cursor-not-allowed"
                />
                <div className="absolute inset-y-0 right-4 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              </div>
            </FormField>

            <FormField label="Ville" icon={MapPin} required>
              <div className="relative dropdown-city">
                <button
                  type="button"
                  onClick={() => setCityDropdownOpen((v) => !v)}
                  className="w-full h-14 bg-zinc-900/40 border border-zinc-700/30 rounded-xl px-6 text-left text-white font-light tracking-wide hover:border-amber-400/50 focus:border-amber-400/50 focus:bg-zinc-900/60 focus:outline-none transition-all duration-300 flex items-center justify-between"
                >
                  <span className={form.city ? "text-white" : "text-zinc-500"}>
                    {form.city || "Sélectionnez votre ville"}
                  </span>
                  <div
                    className={`transition-transform duration-200 ${
                      cityDropdownOpen ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-zinc-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                <div
                  className={`absolute z-50 w-full mt-2 bg-zinc-900/95 backdrop-blur-sm border border-zinc-700/40 rounded-xl shadow-2xl max-h-60 overflow-auto transition-opacity duration-200 ${
                    cityDropdownOpen
                      ? "opacity-100 visible"
                      : "opacity-0 invisible pointer-events-none"
                  }`}
                >
                  {citiesCI.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        handleChange("city", city);
                        setCityDropdownOpen(false);
                      }}
                      className="w-full px-6 py-4 text-left text-white font-light tracking-wide hover:bg-amber-400/10 focus:bg-amber-400/20 focus:outline-none transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </FormField>

            <FormField label="Région" icon={Building}>
              <input
                type="text"
                placeholder="Région ou département"
                value={form.state}
                onChange={(e) => handleChange("state", e.target.value)}
                className="w-full h-14 bg-zinc-900/40 border border-zinc-700/30 rounded-xl px-6 text-white placeholder-zinc-500 font-light tracking-wide focus:border-amber-400/50 focus:bg-zinc-900/60 focus:outline-none transition-all duration-300"
              />
            </FormField>

            <FormField label="Code postal" icon={Hash}>
              <input
                type="text"
                placeholder="Code postal"
                value={form.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
                className="w-full h-14 bg-zinc-900/40 border border-zinc-700/30 rounded-xl px-6 text-white placeholder-zinc-500 font-light tracking-wide focus:border-amber-400/50 focus:bg-zinc-900/60 focus:outline-none transition-all duration-300"
              />
            </FormField>

            <div className="flex items-center gap-4 p-6 bg-zinc-900/20 border border-zinc-700/20 rounded-xl">
              <button
                type="button"
                onClick={() => handleChange("isDefault", !form.isDefault)}
                className={`flex items-center justify-center w-6 h-6 rounded-md border-2 transition-all duration-300 ${
                  form.isDefault
                    ? "bg-amber-400 border-amber-400 text-black"
                    : "border-zinc-600 hover:border-amber-400/50"
                }`}
              >
                {form.isDefault && <Check className="w-4 h-4" />}
              </button>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                <span className="text-white font-light tracking-wide">
                  Définir comme adresse principale
                </span>
              </div>
            </div>

            <div className="flex gap-6 pt-8">
              <button
                type="button"
                onClick={() => router.back()}
                disabled={loading}
                className="flex-1 h-14 bg-transparent border border-zinc-700/40 text-zinc-300 font-light tracking-wide rounded-xl hover:border-zinc-600 hover:bg-zinc-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 h-14 font-medium tracking-wide rounded-xl transition-all duration-300 ${
                  loading
                    ? "bg-amber-400/70 text-black/70 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-300 hover:to-amber-400 hover:shadow-lg hover:shadow-amber-400/25"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    Enregistrement...
                  </div>
                ) : (
                  "Enregistrer l'adresse"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
