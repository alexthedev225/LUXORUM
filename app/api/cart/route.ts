import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "UserId requis" }, { status: 400 });
  }

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          // Utilise la relation CartItem[]
          include: {
            product: true, // Utilise la relation Product
          },
        },
      },
    });

    return NextResponse.json(cart || { items: [] });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération du panier" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.userId || !data.productId || typeof data.quantity !== "number") {
      return NextResponse.json(
        {
          error:
            "Données manquantes ou invalides: userId, productId et quantity (nombre) sont requis",
        },
        { status: 400 }
      );
    }

    // Vérification que la quantité est positive
    if (data.quantity <= 0) {
      return NextResponse.json(
        {
          error: "La quantité doit être supérieure à 0",
        },
        { status: 400 }
      );
    }

    // Vérification que le produit existe
    const product = await prisma.product.findUnique({
      where: { id: data.productId },
    });

    if (!product) {
      return NextResponse.json(
        {
          error: "Produit non trouvé",
        },
        { status: 404 }
      );
    }

    let cart = await prisma.cart.findUnique({
      where: { userId: data.userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: data.userId },
      });
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: data.productId,
        quantity: data.quantity,
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'ajout au panier" },
      { status: 500 }
    );
  }
}
