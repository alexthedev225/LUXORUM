import { NextResponse } from "next/server";
import { withAuth } from "@/utils/withAuth";
import connect from "@/lib/mongoose";
import Cart from "@/models/Cart";
import Stripe from "stripe";
import { IProduct } from "@/models/Product";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  await connect();

  return withAuth(req, async (_req, user) => {
    try {
      const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_URL;

      const cart = await Cart.findOne({ userId: user.userId }).populate(
        "items.product"
      );

      if (!cart || cart.items.length === 0) {
        return NextResponse.json(
          { error: "Panier vide ou introuvable" },
          { status: 400 }
        );
      }

const line_items = cart.items.map(
  (item: { product: IProduct; quantity: number }) => {
    const product = item.product as unknown as IProduct;

    if (!product) {
      throw new Error("Produit dans panier introuvable");
    }

    // Créer une image absolue valide si elle existe
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
          images: imageUrl ? [imageUrl] : [], // Stripe exige une URL absolue valide
        },
        unit_amount: Math.round(Number(product.price) * 100),
      },
      quantity: item.quantity,
    };
  }
);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items,
        client_reference_id: user.userId,
        success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/cart`,
      });

      return NextResponse.json({ sessionId: session.id });
    } catch (error) {
      console.error("Erreur lors de la création de session checkout:", error);
      return NextResponse.json(
        { error: "Erreur lors du paiement" },
        { status: 500 }
      );
    }
  });
}
