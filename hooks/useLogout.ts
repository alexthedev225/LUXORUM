"use client";

import { useCartStore } from "@/stores/cart";
import { useState } from "react";

export function useLogout() {
  const { setItems } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ⚠️ MODIFIE comme ceci
  async function logout(onSuccess?: () => void) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erreur lors de la déconnexion");
      }

      setItems([]); // vider panier

      if (onSuccess) {
        onSuccess(); // c'est ici qu'on fait le toast + reload
      } else {
        window.location.reload();
      }
    } catch (e: any) {
      setError(e.message || "Erreur inconnue");
      setLoading(false); // ⬅️ On garde ici pour que l'utilisateur puisse réessayer
    }

    // ⚠️ Ne mets pas setLoading(false) ici sinon le bouton revient
    // finally {
    //   setLoading(false);
    // }
  }

  return { logout, loading, error };
}
