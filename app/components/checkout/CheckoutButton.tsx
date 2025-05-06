"use client";

export function CheckoutButton({ cartId }: { cartId: string }) {
  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId }),
      });

      const { sessionId } = await response.json();

      // Rediriger vers la page de paiement Stripe
      window.location.href = `/checkout/${sessionId}`;
    } catch (error) {
      console.error("Erreur lors du checkout:", error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
    >
      Procéder au paiement
    </button>
  );
}
