// app/api/analytics/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/lib/mongoose";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const timeRange = searchParams.get("timeRange") || "7d";

    await connectToDB();

    // Convertir timeRange en nombre de jours (ex: "24h", "7d", "30d", "90d")
    let daysAgo = 7; // default 7 days
    if (timeRange === "24h") daysAgo = 1;
    else if (timeRange.endsWith("d"))
      daysAgo = parseInt(timeRange.slice(0, -1)) || 7;

    // Récupérer stats globales
    const [
      totalUsers,
      totalOrders,
      lowStockProductsCount,
      recentOrdersRaw,
      totalRevenueAgg,
    ] = await Promise.all([
      User.countDocuments(),
      Order.countDocuments(),
      Product.countDocuments({ stock: { $lt: 5 } }),
      Order.find({})
        .sort({ createdAt: -1 })
        .limit(4)
        .populate("userId", "username"),
      Order.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]),
    ]);

    // Préparer les commandes récentes formatées
    const recentOrders = recentOrdersRaw.map((order) => ({
      id: order._id.toString(),
      customer: order.userId?.username || "Client inconnu",
      status: order.status,
      total: order.amount,
      date: order.createdAt.toISOString(),
    }));

    // Agrégation des ventes sur la période demandée
    const salesLastDays = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - daysAgo)),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%d-%m-%Y", date: "$createdAt" },
          },
          amount: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const salesData = salesLastDays.map((s) => ({
      date: s._id,
      amount: s.amount,
    }));

    return NextResponse.json({
      totalUsers,
      totalOrders,
      totalRevenue: totalRevenueAgg[0]?.total || 0,
      lowStockProducts: lowStockProductsCount,
      recentOrders,
      salesData,
    });
  } catch (error) {
    console.error("Erreur dans api/analytics:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
