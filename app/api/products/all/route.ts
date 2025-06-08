import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";

export async function GET() {
  await dbConnect();

  try {
    // On récupère TOUTES les données produits, avec population de category (id + name)
    const products = await Product.find({})
      .populate("category", "name _id")
      .lean();

    return NextResponse.json({ products });
  } catch (error) {
    console.error("❌ GET /api/products/all error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des produits" },
      { status: 500 }
    );
  }
}
