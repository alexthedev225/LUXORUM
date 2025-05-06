import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as XLSX from "xlsx";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const period = searchParams.get("period") || "month";
    const startDate = getStartDate(period);

    const [orders, products] = await Promise.all([
      prisma.order.findMany({
        where: {
          createdAt: { gte: startDate },
          status: { in: ["PAID", "DELIVERED"] },
        },
        include: {
          items: { include: { product: true } },
          user: { select: { username: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.findMany({
        include: { category: true },
      }),
    ]);

    // Créer le workbook Excel avec plusieurs feuilles
    const workbook = XLSX.utils.book_new();

    // Feuille des commandes
    const ordersData = orders.map((order) => ({
      "ID Commande": order.id,
      Client: order.user.username,
      Date: order.createdAt,
      Statut: order.status,
      Total: order.total.toString(),
    }));
    const ordersSheet = XLSX.utils.json_to_sheet(ordersData);
    XLSX.utils.book_append_sheet(workbook, ordersSheet, "Commandes");

    // Feuille des produits
    const productsData = products.map((product) => ({
      Produit: product.name,
      Catégorie: product.category.name,
      Stock: product.stock,
      Prix: product.price.toString(),
    }));
    const productsSheet = XLSX.utils.json_to_sheet(productsData);
    XLSX.utils.book_append_sheet(workbook, productsSheet, "Produits");

    // Générer le buffer Excel
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=rapport-${
          new Date().toISOString().split("T")[0]
        }.xlsx`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la génération du rapport" },
      { status: 500 }
    );
  }
}
