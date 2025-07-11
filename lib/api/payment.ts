// lib/api/payment.ts
export async function getSavedCards(): Promise<Stripe.PaymentMethod[]> {
  const res = await fetch("/api/payment-methods", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Impossible de récupérer les cartes");

  return res.json();
}
