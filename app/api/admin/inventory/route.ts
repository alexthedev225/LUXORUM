import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lowStock = searchParams.get('lowStock') === 'true';

  try {
    const products = await prisma.product.findMany({
      where: lowStock ? { stock: { lte: 5 } } : {},
      include: { category: true },
      orderBy: { stock: 'asc' }
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération du stock" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const data = await req.json();
    
    if (!data.productId || typeof data.stock !== 'number') {
      return NextResponse.json({
        error: "ProductId et stock sont requis"
      }, { status: 400 });
    }

    const product = await prisma.product.update({
      where: { id: data.productId },
      data: { stock: data.stock },
      include: { category: true }
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du stock" },
      { status: 500 }
    );
  }
}
