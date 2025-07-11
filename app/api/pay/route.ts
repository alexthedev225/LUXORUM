import { NextResponse } from "next/server";
import connect from "@/lib/mongoose";
import User from "@/models/User";
import Stripe from "stripe";
import { withAuth } from "@/utils/withAuth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  return withAuth(req, async (_req, user) => {
    // Connexion à MongoDB ici
    await connect();

    try {
      const { paymentMethodId, amount } = await req.json();

      if (!paymentMethodId || !amount) {
        return NextResponse.json(
          { error: "paymentMethodId et amount sont requis" },
          { status: 400 }
        );
      }

      // Vérifier que l'utilisateur a un stripeCustomerId
      // (même si tu as le user dans withAuth, le user peut être juste un payload de session,
      // on vérifie en base ici pour être sûr)
      const dbUser = await User.findOne({ email: user.email });
      if (!dbUser || !dbUser.stripeCustomerId) {
        return NextResponse.json(
          { error: "Client Stripe non configuré pour cet utilisateur" },
          { status: 400 }
        );
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "eur",
        customer: dbUser.stripeCustomerId,
        payment_method: paymentMethodId,
        off_session: true,
        confirm: true,
      });

      return NextResponse.json({ success: true, paymentIntent });
    } catch (err: any) {
      if (err.code === "authentication_required") {
        return NextResponse.json(
          {
            error: "Authentification requise",
            paymentIntentId: err.raw.payment_intent.id,
          },
          { status: 402 }
        );
      }

      console.error("Erreur lors du paiement", err);

      return NextResponse.json(
        { error: err.message || "Erreur lors du paiement" },
        { status: 500 }
      );
    }
  });
}
