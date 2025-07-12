import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Order from "@/models/Order";

interface Product {
  _id: string;
  name: string;
  images: string[];
  price: number;
}

interface OrderItem {
  product: Product | string | null; // ID ou objet produit ou null
  name?: string;
  price?: number;
  quantity: number;
}

export async function GET(_req: NextRequest) {
  try {
    await connectDB();

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("items.product", "name images price")
      .lean(); // important pour manipuler l'objet en plain JS

    const enrichedOrders = orders.map((order) => ({
      ...order,
      items: order.items.map((item: OrderItem) => {
        const product = item.product as Product | null;

        return {
          productId:
            product?._id ??
            (typeof item.product === "string" ? item.product : null),
          name: product?.name ?? item.name,
          price: product?.price ?? item.price,
          images: product?.images ?? [],
          quantity: item.quantity,
        };
      }),
    }));

    return NextResponse.json(enrichedOrders);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}
