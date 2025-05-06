import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { sendOrderStatusUpdate } from "@/lib/notifications";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});
const prisma = new PrismaClient();

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
        await prisma.order.update({
          where: { paymentIntent: session.id },
          data: { status: "PAID" },
        });
        await sendOrderStatusUpdate(session);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await prisma.order.update({
          where: { paymentIntent: paymentIntent.id },
          data: { status: "CANCELLED" },
        });
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erreur webhook:", error);
    return NextResponse.json({ error: "Erreur webhook" }, { status: 400 });
  }
}
