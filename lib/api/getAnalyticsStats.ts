import connectToDB from "@/lib/mongoose";
import User from "@/models/User";
import Order from "@/models/Order";
import Product from "@/models/Product";

export async function getAnalyticsStats(timeRange: string = "7d") {
  await connectToDB();

  // Calcule la date de début selon timeRange
  const startDate = new Date();
  switch (timeRange) {
    case "24h":
      startDate.setDate(startDate.getDate() - 1);
      break;
    case "7d":
      startDate.setDate(startDate.getDate() - 7);
      break;
    case "30d":
      startDate.setDate(startDate.getDate() - 30);
      break;
    case "90d":
      startDate.setDate(startDate.getDate() - 90);
      break;
    default:
      startDate.setDate(startDate.getDate() - 7);
  }

  const [
    totalUsers,
    totalOrders,
    lowStockProductsCount,
    recentOrdersRaw,
    totalRevenueAgg,
  ] = await Promise.all([
    User.countDocuments(),
    Order.countDocuments({ createdAt: { $gte: startDate } }),
    Product.countDocuments({ stock: { $lt: 5 } }),
    Order.find({})
      .sort({ createdAt: -1 })
      .limit(4)
      .populate("userId", "username"),
    Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
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

  const salesLastDays = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
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

  return {
    totalUsers,
    totalOrders,
    totalRevenue: totalRevenueAgg[0]?.total || 0,
    lowStockProducts: lowStockProductsCount,
    recentOrders,
    salesData,
  };
}

