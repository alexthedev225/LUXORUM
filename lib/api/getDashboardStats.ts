// app/utils/getDashboardStats.ts
import connectToDB from "@/lib/mongoose";
import User from "@/models/User";
import Order from "@/models/Order";
import Product from "@/models/Product";

export async function getDashboardStats() {
  await connectToDB();

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
      .populate("userId", "username"), // ou "firstName lastName"
    Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]),
  ]);

  const recentOrders = recentOrdersRaw.map((order) => ({
    id: order._id.toString(),
    customer: order.userId?.username || "Client inconnu",
    status: order.status,
    total: order.amount,
    date: order.createdAt.toISOString(),
  }));

  const salesLast7Days = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
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

  const salesData = salesLast7Days.map((s) => ({
    date: s._id,
    amount: s.amount,
  }));

  return {
    totalUsers,
    totalOrders,
    totalRevenue: totalRevenueAgg[0]?.total || 0,
    lowStockProducts: lowStockProductsCount,
    recentOrders,
    salesData,
  };
}
