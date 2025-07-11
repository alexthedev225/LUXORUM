"use client";

import { useEffect, useState } from "react";

interface SavedCardsListProps {
  onSelect: (paymentMethodId: string) => void;
}

interface Card {
  id: string;
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}

export default function SavedCardsList({ onSelect }: SavedCardsListProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  useEffect(() => {
    async function loadCards() {
      try {
        const response = await fetch("/api/account/payment-methods", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // si tu utilises cookies/session
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();
        setCards(data);
      } catch (err) {
        console.error("Erreur chargement cartes:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCards();
  }, []);

  if (loading) return <p className="text-white">Chargement...</p>;
  if (!cards.length)
    return <p className="text-white">Aucune carte enregistrée.</p>;

  return (
    <div className="space-y-4">
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => {
            setSelectedCard(card.id);
            onSelect(card.id);
          }}
          className={`cursor-pointer p-4 rounded-xl border ${
            selectedCard === card.id
              ? "border-black bg-gray-100"
              : "border-gray-300"
          }`}
        >
          <p className="font-semibold text-white">
            {card.card.brand.toUpperCase()} **** {card.card.last4}
          </p>
          <p className="text-sm text-white">
            Expire {card.card.exp_month.toString().padStart(2, "0")}/
            {card.card.exp_year}
          </p>
        </div>
      ))}
    </div>
  );
}
