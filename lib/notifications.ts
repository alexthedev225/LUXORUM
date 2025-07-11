// notifications.ts
import { sendEmail } from "./email";
import {
  orderConfirmationTemplate,
  orderStatusUpdateTemplate,
  lowStockAlertTemplate,
} from "./emailTemplates";
import { Order, Product } from "./types";

export async function sendOrderConfirmation(order: Order) {
  return sendEmail({
    to: order.user.email,
    subject: `Confirmation de commande #${order.id}`,
    content: orderConfirmationTemplate(order),
  });
}

export async function sendOrderStatusUpdate(order: Order) {
  return sendEmail({
    to: order.user.email,
    subject: `Mise à jour de votre commande #${order.id}`,
    content: orderStatusUpdateTemplate(order),
  });
}

export async function sendLowStockAlert(products: Product[]) {
  const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
  return Promise.all(
    adminEmails.map((email) =>
      sendEmail({
        to: email,
        subject: `🚨 Alerte Stock Bas - ${products.length} produit(s)`,
        content: lowStockAlertTemplate(products),
      })
    )
  );
}
