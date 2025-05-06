import { sendEmail } from "./email";
import {
  orderConfirmationTemplate,
  orderStatusUpdateTemplate,
  orderShippedTemplate,
  lowStockAlertTemplate,
} from "./emailTemplates";

export async function sendOrderConfirmation(order: any) {
  return sendEmail({
    to: order.user.email,
    subject: `Confirmation de commande #${order.id}`,
    html: orderConfirmationTemplate(order),
  });
}

export async function sendOrderStatusUpdate(order: any) {
  return sendEmail({
    to: order.user.email,
    subject: `Mise à jour de votre commande #${order.id}`,
    html: orderStatusUpdateTemplate(order),
  });
}

export async function sendLowStockAlert(products: any[]) {
  // Envoyer aux administrateurs
  const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
  return Promise.all(
    adminEmails.map((email) =>
      sendEmail({
        to: email,
        subject: `🚨 Alerte Stock Bas - ${products.length} produit(s)`,
        html: lowStockAlertTemplate(products),
      })
    )
  );
}
