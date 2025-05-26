"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { StepForm } from "@/components/auth/StepForm";
import { SocialButton } from "@/components/auth/SocialButton";

function getCsrfTokenFromCookie() {
  const match = document.cookie.match(new RegExp("(^| )csrf-token=([^;]+)"));
  return match ? match[2] : null;
}

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/csrf");
  }, []);

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    setError("");

    try {
      const csrfToken = getCsrfTokenFromCookie();

      if (!csrfToken) {
        throw new Error("Jeton CSRF introuvable");
      }

      // Récupération du token reCAPTCHA v3
      const recaptchaToken = await new Promise<string>((resolve) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, {
              action: "register",
            })
            .then(resolve);
        });
      });

      // Ajouter le token au payload envoyé
      const payload = { ...formData, recaptchaToken };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        console.log("Erreur serveur:", error);
        throw new Error(error.message || "Erreur lors de l'inscription");
      }

      router.push("/auth/login?registered=true");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
      {/* Overlay décoratif avec pointillé subtil */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />

      {/* Lueurs d'ambiance dorées */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-t from-amber-400/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-t from-amber-400/3 to-transparent rounded-full blur-3xl" />

      <div className="relative w-full max-w-4xl xl:max-w-5xl">
        {/* Carte principale avec dégradé et bordure dorée */}
        <div className=" border border-amber-400/20 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          {/* En-tête avec titre stylisé */}
          <div className="text-center space-y-4 mb-8">
            <div className="inline-block">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent mt-2" />
            </div>
            <div>
              <h2 className="text-2xl font-light text-white mb-2">
                Créer votre compte
              </h2>
              <p className="text-sm text-white/90 tracking-wide">
                Rejoignez l'univers de l'excellence
              </p>
            </div>
          </div>

          {/* Message d'erreur global */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center mb-6 max-w-2xl mx-auto">
              <p className="text-red-400 text-sm font-light">{error}</p>
            </div>
          )}

          {/* Composant StepForm stylisé avec conteneur élargi */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <StepForm onSubmit={handleSubmit} loading={loading} error={error} />
          </div>

          {/* Lien de connexion */}
          <div className="text-center mt-6 pt-6 border-t border-zinc-800/50 max-w-2xl mx-auto">
            <p className="text-white/90 text-sm">
              Déjà membre ?{" "}
              <Link
                href="/auth/login"
                className="text-amber-400 hover:text-amber-300 transition-colors duration-300 font-medium underline decoration-amber-400/30 hover:decoration-amber-300/50 underline-offset-4"
              >
                Se connecter
              </Link>
            </p>
          </div>

          {/* Séparateur et réseaux sociaux */}
          <div className="mt-8 space-y-6 max-w-2xl mx-auto">
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
