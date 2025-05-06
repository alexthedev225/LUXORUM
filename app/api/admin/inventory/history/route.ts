import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const productId = searchParams.get("productId");

  try {
    const [history, total] = await Promise.all([
      prisma.stockHistory.findMany({
        where: productId ? { productId } : {},
        select: {
          id: true,
          previousStock: true,
          newStock: true,
          createdAt: true,
          product: {
            select: { name: true },
          },
          updatedBy: {
            select: { username: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.stockHistory.count(),
    ]);

    const result = {
      history,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        hasMore: page * limit < total,
      },
    };

    // Mettre en cache les résultats
    await cacheSet(
      `stockHistory:${page}:${limit}:${productId || "all"}`,
      result,
      300
    );

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'historique" },
      { status: 500 }
    );
  }
}
