import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendLowStockAlert } from "@/lib/notifications";

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
  try {
    const data = await req.json();

    if (!data.productIds || typeof data.stockChange !== "number") {
      return NextResponse.json(
        {
          error:
            "Données manquantes ou invalides: productIds et stockChange sont requis",
        },
        { status: 400 }
      );
    }

    const updatedProducts = await Promise.all(
      data.productIds.map(async (productId: string) => {
        const product = await prisma.product.findUnique({
          where: { id: productId },
        });

        if (!product) {
          throw new Error(`Produit avec ID ${productId} non trouvé`);
        }

        const newStock = product.stock + data.stockChange;

        await prisma.product.update({
          where: { id: productId },
          data: { stock: newStock },
        });

        await prisma.stockHistory.create({
          data: {
            productId: product.id,
            previousStock: product.stock,
            newStock,
            userId: data.userId,
          },
        });

        return { ...product, stock: newStock };
      })
    );

    const lowStockProducts = await prisma.product.findMany({
      where: { stock: { lte: 5 } },
    });

    if (lowStockProducts.length > 0) {
      await sendLowStockAlert(lowStockProducts);
    }

    return NextResponse.json({ success: true, updatedProducts });
  } catch (error) {
    console.error("Erreur lors de la mise à jour des stocks:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour des stocks" },
      { status: 500 }
    );
  }
}
