import { NextResponse } from "next/server";
import Order from "@/models/Order";
import  connectToDB  from "@/lib/mongoose";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const order = await Order.findById(params.id).populate("userId", "email");
    if (!order)
      return new NextResponse("Commande introuvable", { status: 404 });

    return NextResponse.json(order);
  } catch (error) {
    console.error("[ORDER_GET_ERROR]", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const { status } = await req.json();
    const updated = await Order.findByIdAndUpdate(
      params.id,
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
