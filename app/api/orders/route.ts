import { NextResponse } from "next/server";
import { sendOrderConfirmation } from "@/lib/notifications";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const status = searchParams.get("status");

  const skip = (page - 1) * limit;

  try {
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: {
          AND: [
            userId ? { userId } : {},
            status ? { status: status as any } : {},
          ],
        },
        include: {
          items: {
            select: {
              quantity: true,
              price: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  images: true,
                },
              },
            },
          },
          address: {
            select: {
              street: true,
              city: true,
              postalCode: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.order.count({
        where: userId ? { userId } : {},
      }),
    ]);

    return NextResponse.json({
      orders,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        perPage: limit,
        hasMore: skip + orders.length < total,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des commandes" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.userId || !data.addressId || !data.items?.length) {
      return NextResponse.json(
        {
          error: "Données manquantes: userId, addressId et items sont requis",
        },
        { status: 400 }
      );
    }

    // Calcul du total de la commande
    const total = data.items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        userId: data.userId,
        addressId: data.addressId,
        total,
        items: {
          create: data.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: { product: true },
        },
        address: true,
      },
    });

    // Envoyer l'email de confirmation
    await sendOrderConfirmation(order);

    // Vider le panier après la commande
    if (data.cartId) {
      await prisma.cart.delete({
        where: { id: data.cartId },
      });
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création de la commande" },
      { status: 500 }
    );
  }
}
