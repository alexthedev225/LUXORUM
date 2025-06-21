// app/api/orders/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("items.product", "name images price")
      .lean(); // important pour manipuler l'objet en plain JS

    const enrichedOrders = orders.map((order) => ({
      ...order,
      items: order.items.map((item) => {
        const product = item.product;

        return {
          // Référence au produit (peut être null)
          productId: product?._id ?? item.product,
          // Nom du produit : soit via le produit peuplé, soit via la copie
          name: product?.name ?? item.name,
          price: product?.price ?? item.price,
          images: product?.images ?? [], // si tu veux afficher l’image seulement si dispo
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
