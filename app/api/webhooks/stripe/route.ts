import { NextResponse } from "next/server";
import Stripe from "stripe";
import mongoose from "mongoose";
import Order, { IOrder } from "@/models/Order";
import Cart, { type ICart } from "@/models/Cart";
import User from "@/models/User";
import type { IProduct } from "@/models/Product";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

mongoose.set("strictQuery", false);
if (!mongoose.connection.readyState) {
  console.log("Connexion à MongoDB...");
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log("MongoDB connecté.");
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature")!;
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
      console.log(`✅ Webhook Stripe reçu : ${event.type}`);
    } catch (err) {
      console.error("⚠️ Échec de la validation du webhook Stripe :", err);
      return NextResponse.json(
        { error: "Webhook non validé" },
        { status: 400 }
      );
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("▶️ Traitement de checkout.session.completed");

        const userId = session.client_reference_id;
        console.log("➡️ userId extrait du session :", userId);
        if (!userId) {
          console.error("❌ User ID manquant dans session Stripe");
          throw new Error("User ID manquant dans session Stripe");
        }

        const cart = await Cart.findOne({ userId }).populate("items.product");
        if (!cart) {
          console.error(`❌ Panier introuvable pour userId: ${userId}`);
          throw new Error("Panier non trouvé");
        }
        if (cart.items.length === 0) {
          console.error(`❌ Panier vide pour userId: ${userId}`);
          throw new Error("Panier vide");
        }

        console.log(`📦 Panier récupéré avec ${cart.items.length} items.`);

        const orderItems = cart.items.map((item: ICart["items"][number]) => {
          const product = item.product as unknown as IProduct;
          return {
            product: product._id,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
          };
        });

        const amount = session.amount_total
          ? session.amount_total / 100
          : orderItems.reduce(
              (acc: number, item: (typeof orderItems)[number]) =>
                acc + item.price * item.quantity,
              0
            );
        console.log(`💰 Montant total de la commande: ${amount} EUR`);

        const newOrder = new Order({
          userId,
          items: orderItems,
          amount,
          status: "paid",
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        await newOrder.save();
        console.log(`✅ Commande sauvegardée en base avec id: ${newOrder._id}`);

        await User.findByIdAndUpdate(userId, {
          $push: { orders: newOrder._id },
        });
        console.log(`👤 Commande ajoutée à l'utilisateur ${userId}`);

        cart.items = [];
        await cart.save();
        console.log(`🗑️ Panier vidé pour l'utilisateur ${userId}`);

        // Optionnel : envoyer une notification
        // await sendOrderStatusUpdate(session);

        break;
      }

      case "payment_intent.payment_failed": {
        console.log("▶️ Traitement de payment_intent.payment_failed");
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        const order = await Order.findOne({
          paymentIntentId: paymentIntent.id,
        });
        if (order) {
          order.status = "failed";
          await order.save();
          console.log(`❌ Commande ${order._id} marquée comme échouée.`);
        } else {
          console.warn(
            `⚠️ Aucune commande trouvée pour paymentIntent ${paymentIntent.id}`
          );
        }

        break;
      }

      default:
        console.log(`ℹ️ Événement Stripe non géré : ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("🔥 Erreur webhook:", error);
    return NextResponse.json({ error: "Erreur webhook" }, { status: 400 });
  }
}
