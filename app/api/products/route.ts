import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { cacheGet, cacheSet, cacheDelete } from "@/lib/redis";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const fields = searchParams.get("fields")?.split(",") || [
    "id",
    "name",
    "price",
    "stock",
  ];

  const skip = (page - 1) * limit;
  const cacheKey = `products:${category || "all"}:${page}:${limit}:${
    search || ""
  }:${fields.join(",")}`;

  try {
    const cached = await cacheGet(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    const select = fields.reduce(
      (acc, field) => ({ ...acc, [field]: true }),
      {}
    );

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: {
          AND: [
            category ? { categoryId: category } : {},
            search
              ? {
                  OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { description: { contains: search, mode: "insensitive" } },
                  ],
                }
              : {},
          ],
        },
        select: {
          ...select,
          category: {
            select: { id: true, name: true },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({
        where: category ? { categoryId: category } : {},
      }),
    ]);

    const result = {
      products,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
        limit,
        hasMore: skip + products.length < total,
      },
    };

    await cacheSet(cacheKey, result, 300);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des produits" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const data = {
      name: String(formData.get("name")),
      description: String(formData.get("description")),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")) || 0,
      categoryId: String(formData.get("categoryId")),
      specifications: formData.get("specifications")
        ? JSON.parse(String(formData.get("specifications")))
        : null,
    };

    // Validation
    if (!data.name || !data.description || !data.price || !data.categoryId) {
      return NextResponse.json(
        {
          error:
            "Données manquantes: name, description, price et categoryId sont requis",
        },
        { status: 400 }
      );
    }

    const images: string[] = [];
    const imageFiles = formData.getAll("images");

    // Les images sont stockées physiquement dans le dossier public/uploads/products
    const uploadDir = path.join(process.cwd(), "public", "uploads", "products");

    for (const imageFile of imageFiles) {
      if (typeof imageFile === "object" && "arrayBuffer" in imageFile) {
        try {
          await mkdir(uploadDir, { recursive: true });

          const buffer = Buffer.from(await (imageFile as Blob).arrayBuffer());
          const fileName = `${Date.now()}-${(imageFile as File).name.replace(
            /[^a-zA-Z0-9.]/g,
            "_"
          )}`;
          const filePath = path.join(uploadDir, fileName);

          await writeFile(filePath, buffer);

          // Seul le chemin d'accès est stocké dans la base de données
          images.push(`/uploads/products/${fileName}`);
        } catch (uploadError) {
          console.error("Erreur upload image:", uploadError);
        }
      }
    }

    const product = await prisma.product.create({
      data: {
        ...data,
        images,
      },
      include: { category: true },
    });

    // Invalider les caches concernés
    await Promise.all([
      cacheDelete("products:all"),
      cacheDelete(`products:${product.categoryId}`),
    ]);

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création du produit" },
      { status: 500 }
    );
  }
}
