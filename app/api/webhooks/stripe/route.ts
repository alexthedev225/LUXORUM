import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import Order from "@/models/Order";
import Cart, { type ICart } from "@/models/Cart";
import User from "@/models/User";
import type { IProduct } from "@/models/Product";
import dbConnect from "@/lib/mongoose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  await dbConnect();

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
      console.error("⚠️ Échec validation webhook Stripe :", err);
      return NextResponse.json(
        { error: "Webhook non validé" },
        { status: 400 }
      );
    }

    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const userId = paymentIntent.metadata?.userId;
        if (!userId) {
          console.warn("⚠️ User ID manquant dans metadata du PaymentIntent.");
          return NextResponse.json({ received: true });
        }

        let order = await Order.findOne({ paymentIntentId: paymentIntent.id });

        if (!order) {
          const cart = await Cart.findOne({ userId }).populate("items.product");
          if (!cart || cart.items.length === 0) {
            console.warn(
              `⚠️ Panier introuvable ou vide pour userId: ${userId}.`
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
          console.log(`✅ Commande sauvegardée : ${order._id}`);

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
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id;
        if (!userId) {
          console.warn("⚠️ User ID manquant dans session Stripe.");
          return NextResponse.json({ received: true });
        }

        const cart = await Cart.findOne({ userId }).populate("items.product");
        if (!cart || cart.items.length === 0) {
          console.warn(`⚠️ Panier introuvable ou vide pour userId: ${userId}.`);
          return NextResponse.json({ received: true });
        }

        const orderItems = cart.items.map((item: ICart["items"][number]) => {
          const product = item.product as IProduct;
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
              (acc: number, item: { price: number; quantity: number; }) => acc + item.price * item.quantity,
              0
            );

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
        console.log(`✅ Commande sauvegardée : ${newOrder._id}`);

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
