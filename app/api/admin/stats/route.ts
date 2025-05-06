import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cacheGet, cacheSet } from "@/lib/redis";

const prisma = new PrismaClient();

export async function GET() {
  const cacheKey = "admin:stats";

  try {
    // Vérifier le cache
    const cached = await cacheGet(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    const [totalOrders, totalRevenue, totalProducts, lowStockProducts] =
      await Promise.all([
        prisma.order.count(),
        prisma.order.aggregate({
          _sum: { total: true },
        }),
        prisma.product.count(),
        prisma.product.findMany({
          where: { stock: { lte: 5 } },
          select: { id: true, name: true, stock: true },
        }),
      ]);

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { username: true } },
        items: { include: { product: true } },
      },
    });

    const stats = {
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      totalProducts,
      lowStockProducts,
      recentOrders,
    };

    // Cache pour 1 minute
    await cacheSet(cacheKey, stats, 60);

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des statistiques" },
      { status: 500 }
    );
  }
}
