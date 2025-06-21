import Order from "@/models/Order";
import dbConnect from "@/lib/mongoose";
import { withAuth } from "@/utils/withAuth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return withAuth(req, async (_req, user) => {
    await dbConnect();

    try {
      // Pagination & filtres via query params
      const url = new URL(req.url);
      const page = parseInt(url.searchParams.get("page") || "1");
      const limit = parseInt(url.searchParams.get("limit") || "10");
      const statusFilter = url.searchParams.get("status");
      const dateFrom = url.searchParams.get("dateFrom");
      const dateTo = url.searchParams.get("dateTo");

      const filter: any = { userId: user.userId};

      if (statusFilter) filter.status = statusFilter;
      if (dateFrom || dateTo) filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
      if (dateTo) filter.createdAt.$lte = new Date(dateTo);

      const orders = await Order.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("items.product")
        .lean();

      const totalCount = await Order.countDocuments(filter);

      return NextResponse.json({ orders, totalCount, page, limit });
    } catch (error) {
      console.error("Erreur GET orders", error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  });
}
