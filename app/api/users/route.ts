import User from "@/models/User";
import dbConnect from "@/lib/mongoose";
import { withAuth } from "@/utils/withAuth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return withAuth(req, async (_req, user) => {
    // Vérification du rôle ADMIN dans le handler
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Accès refusé : réservé aux administrateurs" },
        { status: 403 }
      );
    }

    await dbConnect();

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") ?? "1");
    const limit = parseInt(url.searchParams.get("limit") ?? "10");
    const roleFilter = url.searchParams.get("role") ?? "";

    const query: any = {};
    if (roleFilter) query.role = roleFilter;

    try {
      const total = await User.countDocuments(query);
      const users = await User.find(query, "-password")
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      return NextResponse.json({
        users,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  });
}
