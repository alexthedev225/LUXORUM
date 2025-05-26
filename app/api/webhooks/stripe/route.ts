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
  await mongoose.connect(process.env.MONGODB_URI!);
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature")!;
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // On récupère userId custom dans metadata ou dans session.client_reference_id
        const userId = session.client_reference_id;
        if (!userId) {
          throw new Error("User ID manquant dans session Stripe");
        }

        // Récupérer le panier de l'utilisateur
        const cart = await Cart.findOne({ userId: userId }).populate(
          "items.product"
        );
        if (!cart || cart.items.length === 0) {
          throw new Error("Panier vide ou non trouvé pour l'utilisateur");
        }

        // Construire les items pour la commande
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

        // Créer une commande dans MongoDB
        const newOrder = new Order({
          userId,
          items: orderItems,
          amount,
          status: "paid",
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        await newOrder.save();

        // Ajouter l'order à l'utilisateur
        await User.findByIdAndUpdate(userId, {
          $push: { orders: newOrder._id },
        });

        // Vider le panier
        cart.items = [];
        await cart.save();

        // Optionnel : envoyer une notification
        // await sendOrderStatusUpdate(session);

        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        // Trouver la commande liée (si tu stockes paymentIntentId dans Order)
        const order = await Order.findOne({
          paymentIntentId: paymentIntent.id,
        });
        if (order) {
          order.status = "failed";
          await order.save();
        }

        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erreur webhook:", error);
    return NextResponse.json({ error: "Erreur webhook" }, { status: 400 });
  }
}
