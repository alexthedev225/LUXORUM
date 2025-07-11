// emailTemplates.ts
import { Order, Product } from "./types";

export const orderConfirmationTemplate = (order: Order) => `
  <h1>Confirmation de commande</h1>
  <p>Votre commande #${order.id} a été confirmée.</p>
  <h2>Détails de la commande:</h2>
  <ul>
    ${order.items
      .map(
        (item) => `
      <li>${item.product.name} x${item.quantity} - ${item.price}€</li>
    `
      )
      .join("")}
  </ul>
  <p>Total: ${order.total}€</p>
`;

export const lowStockTemplate = (product: Product) => `
  <h1>Alerte Stock Bas</h1>
  <p>Le produit ${product.name} est en stock bas (${product.stock} restants).</p>
`;

export const orderStatusUpdateTemplate = (order: Order) => `
  <h1>Mise à jour de votre commande</h1>
  <p>Votre commande #${order.id} est maintenant : ${order.status}</p>
  <p>Statut : ${getStatusMessage(order.status)}</p>
  <p>Merci de votre confiance !</p>
`;

export const orderShippedTemplate = (order: Order, trackingNumber?: string) => `
  <h1>Votre commande est en route !</h1>
  <p>Bonne nouvelle ! Votre commande #${order.id} a été expédiée.</p>
  ${trackingNumber ? `<p>Numéro de suivi : ${trackingNumber}</p>` : ""}
  <p>Date d'expédition : ${new Date().toLocaleDateString()}</p>
`;

export const lowStockAlertTemplate = (products: Product[]) => `
  <h1>Alerte Stock Bas</h1>
  <p>Les produits suivants nécessitent votre attention :</p>
  <ul>
    ${products
      .map(
        (p) => `
      <li>${p.name} - ${p.stock} en stock (Seuil: ${p.threshold})</li>
    `
      )
      .join("")}
  </ul>
  <p>Veuillez réapprovisionner ces produits dès que possible.</p>
`;

function getStatusMessage(status: string): string {
  const messages: Record<string, string> = {
    PENDING: "En attente de traitement",
    PAID: "Paiement confirmé",
    PROCESSING: "En cours de traitement",
    SHIPPED: "Expédiée",
    DELIVERED: "Livrée",
    CANCELLED: "Annulée",
  };
  return messages[status] || status;
}
