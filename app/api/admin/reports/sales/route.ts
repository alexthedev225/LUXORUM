import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { startOfDay, endOfDay, subDays } from "date-fns";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period") || "month";

  try {
    const startDate = getStartDate(period);
    const endDate = new Date();

    // Données de ventes quotidiennes
    const dailySales = await prisma.order.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        status: { in: ["PAID", "DELIVERED"] },
      },
      _sum: {
        total: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Données par statut
    const salesData = await prisma.order.groupBy({
      by: ["status"],
      where: {
        createdAt: { gte: startDate },
      },
      _sum: {
        total: true,
      },
      _count: true,
    });

    // Top produits
    const topProducts = await prisma.orderItem.groupBy({
      by: ["productId"],
      where: {
        order: {
          createdAt: { gte: startDate },
          status: { in: ["PAID", "DELIVERED"] },
        },
      },
      _sum: {
        quantity: true,
        price: true,
      },
    });

    // Formatage des données pour les graphiques
    const labels = dailySales.map((sale) =>
      new Date(sale.createdAt).toLocaleDateString()
    );
    const values = dailySales.map((sale) => sale._sum.total || 0);

    return NextResponse.json({
      labels,
      values,
      salesData,
      topProducts,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la génération du rapport" },
      { status: 500 }
    );
  }
}

function getStartDate(period: string): Date {
  const date = new Date();
  switch (period) {
    case "week":
      date.setDate(date.getDate() - 7);
      break;
    case "month":
      date.setMonth(date.getMonth() - 1);
      break;
    case "year":
      date.setFullYear(date.getFullYear() - 1);
      break;
    default:
      date.setMonth(date.getMonth() - 1);
  }
  return date;
}
