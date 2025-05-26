"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { SocialButton } from "@/components/auth/SocialButton";
import { useCartStore } from "@/stores/cart";

function getCsrfTokenFromCookie() {
  const match = document.cookie.match(new RegExp("(^| )csrf-token=([^;]+)"));
  return match ? match[2] : null;
}

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { setItems } = useCartStore();


  // On précharge le CSRF token
  useEffect(() => {
    fetch("/api/auth/csrf");
  }, []);

  // Si déjà connecté, on redirige
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      router.push("/admin");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget; // typé correctement
    const formData = new FormData(form);

    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    try {
      setLoading(true);
      setError("");

      const csrfToken = getCsrfTokenFromCookie();

      if (!csrfToken) throw new Error("Jeton CSRF introuvable");

      const recaptchaToken = await new Promise<string>((resolve) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, {
              action: "login",
            })
            .then(resolve);
        });
      });

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        body: JSON.stringify({ email, password, recaptchaToken }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erreur de connexion");
      }

      // Récupérer le panier après login
      const cartRes = await fetch("/api/cart", { credentials: "include" });
      if (cartRes.ok) {
        const cartData = await cartRes.json();
        // Assure-toi que cartData.items est au format CartItem[]
        setItems(cartData.items);
      } else {
        setItems([]);
      }

      router.push("/admin");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
      {/* Overlay décoratif avec pointillé subtil */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />

      {/* Lueurs d'ambiance dorées */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-t from-amber-400/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-t from-amber-400/3 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* Carte principale avec dégradé et bordure dorée */}
        <div className=" border border-amber-400/20 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          {/* En-tête avec titre stylisé */}
          <div className="text-center space-y-4 mb-8">
            <div className="inline-block">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent mt-2" />
            </div>
            <div>
              <h2 className="text-2xl font-light text-white mb-2">
                Se connecter
              </h2>
              <p className="text-sm text-white/90 tracking-wide">
                Bienvenue dans l'univers de l'excellence
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-xs tracking-[0.3em] text-white/90 uppercase font-light"
              >
                Adresse email
              </label>
              <div className="relative group">
                <Input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-black/60 border border-zinc-800/50 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:border-amber-400/30 focus:ring-1 focus:ring-amber-400/20 focus:bg-black/80 transition-all duration-300 group-hover:border-zinc-700/50"
                  placeholder="votre@email.com"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-xs tracking-[0.3em] text-white/90 uppercase font-light"
              >
                Mot de passe
              </label>
              <div className="relative group">
                <Input
                  type="password"
                  name="password"
                  required
                  className="w-full bg-black/60 border border-zinc-800/50 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:border-amber-400/30 focus:ring-1 focus:ring-amber-400/20 focus:bg-black/80 transition-all duration-300 group-hover:border-zinc-700/50"
                  placeholder="••••••••"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
                <p className="text-red-400 text-sm font-light">{error}</p>
              </div>
            )}

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-medium tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              {/* Effet de lueur au survol */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300/20 via-amber-200/30 to-amber-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="relative z-10 flex items-center justify-center">
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Connexion en cours...</span>
                  </div>
                ) : (
                  "Se connecter"
                )}
              </span>
            </button>
          </form>

          {/* Lien d'inscription */}
          <div className="text-center mt-6 pt-6 border-t border-zinc-800/50">
            <p className="text-white/90 text-sm">
              Pas encore de compte ?{" "}
              <Link
                href="/auth/register"
                className="text-amber-400 hover:text-amber-300 transition-colors duration-300 font-medium underline decoration-amber-400/30 hover:decoration-amber-300/50 underline-offset-4"
              >
                Créer un compte
              </Link>
            </p>
          </div>

          {/* Séparateur et réseaux sociaux */}
          <div className="mt-8 space-y-6">
            {/* Séparateur élégant */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-zinc-800/30" />
              <span className="text-white/60 text-xs tracking-[0.2em] uppercase font-light px-4">
                Ou continuer avec
              </span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-amber-400/20 to-zinc-800/30" />
            </div>

            {/* Boutons sociaux */}
            <div className="flex justify-center space-x-4">
              <SocialButton icon="instagram" />
              <SocialButton icon="twitter" />
              <SocialButton icon="linkedin" />
            </div>
          </div>
        </div>

        {/* Signature discrète */}
        <div className="text-center mt-6">
          <p className="text-xs text-white/50 tracking-[0.2em] uppercase font-light">
            Luxorum • Excellence depuis 2024
          </p>
        </div>
      </div>
    </div>
  );
}
