import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/Order";
import connectToDB from "@/lib/mongoose";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // <-- await ici

    await connectToDB();

    const order = await Order.findById(id).populate("userId", "email");
    if (!order)
      return new NextResponse("Commande introuvable", { status: 404 });

    return NextResponse.json(order);
  } catch (error) {
    console.error("[ORDER_GET_ERROR]", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // <-- await ici

    await connectToDB();

    const { status } = await req.json();

    const updated = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated)
      return new NextResponse("Commande non trouvée", { status: 404 });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[ORDER_PATCH_ERROR]", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}
