import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/utils/withAuth";
import connect from "@/lib/mongoose";
import Cart from "@/models/Cart";
import Stripe from "stripe";
import { IProduct } from "@/models/Product";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

interface CartItem {
  product: IProduct;
  quantity: number;
}

function isStripeError(error: unknown): error is {
  code?: string;
  message: string;
  raw?: { payment_intent?: { id?: string } };
} {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message?: unknown }).message === "string"
  );
}

export async function POST(req: NextRequest) {
  await connect();

  return withAuth(req, async (_req, user) => {
    try {
      const origin = req.headers.get("origin") || process.env.BASE_URL;

      const { paymentMethodId } = await req.json();

      const cart = await Cart.findOne({ userId: user.userId }).populate(
        "items.product"
      );

      if (!cart || cart.items.length === 0) {
        return NextResponse.json(
          { error: "Panier vide ou introuvable" },
          { status: 400 }
        );
      }

      // Prépare les items pour Stripe
      const line_items = cart.items.map((item: CartItem) => {
        const product = item.product;

        if (!product) {
          throw new Error("Produit dans panier introuvable");
        }

        const firstImage = product.images?.[0];
        const imageUrl =
          firstImage && firstImage.startsWith("http")
            ? firstImage
            : firstImage
            ? `${origin}${
                firstImage.startsWith("/") ? firstImage : "/" + firstImage
              }`
            : undefined;

        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: product.name,
              description: product.description,
              images: imageUrl ? [imageUrl] : [],
            },
            unit_amount: Math.round(Number(product.price) * 100),
          },
          quantity: item.quantity,
        };
      });

      const amount = cart.items.reduce((total: number, item: CartItem) => {
        const price = Number(item.product?.price || 0);
        return total + price * item.quantity;
      }, 0);

      if (paymentMethodId) {
        // CAS 1 : PAYER DIRECTEMENT AVEC CARTE ENREGISTRÉE via PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100),
          currency: "eur",
          customer: user.stripeCustomerId,
          payment_method: paymentMethodId,
          off_session: true,
          confirm: true,
          metadata: {
            userId: user.userId,
          },
        });

        return NextResponse.json({
          success: true,
          paymentIntentId: paymentIntent.id,
        });
      } else {
        // CAS 2 : UTILISATEUR PAS DE CARTE ENREGISTRÉE => SESSION STRIPE CHECKOUT
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items,
          success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/checkout/cancel`,
          customer: user.stripeCustomerId,
          client_reference_id: user.userId.toString(),
        });

        return NextResponse.json({ sessionId: session.id });
      }
    } catch (error: unknown) {
      if (isStripeError(error)) {
        console.error("Erreur paiement Stripe :", error.message);

        if (
          error.code === "authentication_required" &&
          error.raw?.payment_intent?.id
        ) {
          return NextResponse.json(
            {
              requiresAction: true,
              paymentIntentId: error.raw.payment_intent.id,
            },
            { status: 400 }
          );
        }

        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      if (error instanceof Error) {
        console.error("Erreur paiement :", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json(
        { error: "Erreur serveur inconnue" },
        { status: 500 }
      );
    }
  });
}
