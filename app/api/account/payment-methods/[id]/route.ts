import { withAuth } from "@/utils/withAuth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  return withAuth(req, async (_req, user) => {
    try {
      // Détacher la carte Stripe
      await stripe.paymentMethods.detach(params.id);

      return NextResponse.json({ message: "Carte supprimée" });
    } catch (error) {
      console.error("Erreur DELETE payment method", error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  return withAuth(req, async (_req, user) => {
    try {
      // Mettre à jour la carte par défaut dans Stripe
      await stripe.customers.update(user.stripeCustomerId, {
        invoice_settings: { default_payment_method: params.id },
      });

      return NextResponse.json({ message: "Carte définie par défaut" });
    } catch (error) {
      console.error("Erreur PUT payment method default", error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  });
}
