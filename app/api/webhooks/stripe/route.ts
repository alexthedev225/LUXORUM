import { NextResponse } from "next/server";
import Stripe from "stripe";
import mongoose from "mongoose";
import Order from "@/models/Order";
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
      case "payment_intent.succeeded": {
        console.log("▶️ Traitement de payment_intent.succeeded");
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        const userId = paymentIntent.metadata?.userId;
        if (!userId) {
          console.warn(
            "⚠️ User ID manquant dans metadata du PaymentIntent. Événement ignoré."
          );
          return NextResponse.json({ received: true });
        }

        let order = await Order.findOne({ paymentIntentId: paymentIntent.id });

        if (!order) {
          const cart = await Cart.findOne({ userId }).populate("items.product");
          if (!cart || cart.items.length === 0) {
            console.warn(
              `⚠️ Panier introuvable ou vide pour userId: ${userId}. Événement ignoré.`
            );
            return NextResponse.json({ received: true });
          }

        const orderItems = cart.items.map((item: ICart["items"][number]) => {
         const product = item.product as IProduct | null;
         if (!product) throw new Error("Produit introuvable dans le panier");

          return {
            product: product._id,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
          };
        });

          const amount = paymentIntent.amount_received
            ? paymentIntent.amount_received / 100
            : orderItems.reduce(
                (acc: number, item: { price: number; quantity: number; }) => acc + item.price * item.quantity,
                0
              );

          order = new Order({
            userId,
            items: orderItems,
            amount,
            status: "paid",
            paymentIntentId: paymentIntent.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          await order.save();
          console.log(`✅ Commande sauvegardée en base avec id: ${order._id}`);

          await User.findByIdAndUpdate(userId, {
            $push: { orders: order._id },
          });
          console.log(`👤 Commande ajoutée à l'utilisateur ${userId}`);

          cart.items = [];
          await cart.save();
          console.log(`🗑️ Panier vidé pour l'utilisateur ${userId}`);
        } else {
          console.log(
            `ℹ️ Commande déjà enregistrée pour PaymentIntent ${paymentIntent.id}`
          );
        }
        break;
      }

      case "checkout.session.completed": {
        console.log("▶️ Traitement de checkout.session.completed");
        const session = event.data.object as Stripe.Checkout.Session;

        const userId = session.client_reference_id;
        if (!userId) {
          console.warn(
            "⚠️ User ID manquant dans session Stripe. Événement ignoré."
          );
          return NextResponse.json({ received: true });
        }

        const cart = await Cart.findOne({ userId }).populate("items.product");
        if (!cart) {
          console.warn(
            `⚠️ Panier introuvable pour userId: ${userId}. Événement ignoré.`
          );
          return NextResponse.json({ received: true });
        }
        if (cart.items.length === 0) {
          console.warn(
            `⚠️ Panier vide pour userId: ${userId}. Événement ignoré.`
          );
          return NextResponse.json({ received: true });
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
          paymentIntentId: session.payment_intent,
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
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("🔥 Erreur webhook:", error);
    return NextResponse.json({ error: "Erreur webhook" }, { status: 400 });
  }
}
