// app/api/orders/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("items.product", "name images price");

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}
