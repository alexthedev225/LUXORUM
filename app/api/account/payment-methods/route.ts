import { withAuth } from "@/utils/withAuth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function GET(req: Request) {
  return withAuth(req, async (_req, user) => {
    try {
      const paymentMethods = await stripe.paymentMethods.list({
        customer: user.stripeCustomerId, // suppose que ce champ existe
        type: "card",
      });

      return NextResponse.json(paymentMethods.data);
    } catch (error) {
      console.error("Erreur GET payment methods", error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  });
}

export async function POST(req: Request) {
  return withAuth(req, async (req, user) => {
    try {
      const { paymentMethodId } = await req.json();

      if (!paymentMethodId) {
        return NextResponse.json(
          { message: "paymentMethodId est requis" },
          { status: 400 }
        );
      }

      // Attacher la carte au client Stripe
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: user.stripeCustomerId,
      });

      // Mettre à jour la méthode par défaut dans Stripe
      await stripe.customers.update(user.stripeCustomerId, {
        invoice_settings: { default_payment_method: paymentMethodId },
      });

      return NextResponse.json({ message: "Carte ajoutée" });
    } catch (error) {
      console.error("Erreur POST payment method", error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  });
}
