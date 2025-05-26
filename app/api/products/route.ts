import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { cacheGet, cacheSet, cacheDelete } from "@/lib/redis";
import Product, { IProduct } from "@/models/Product";
import "@/models/Category"; // Assure-toi que ce chemin est correct selon ta structure
import dbConnect from "@/lib/mongoose";
import { ProjectionType } from "mongoose";

export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const search = searchParams.get("search");
  const category = searchParams.get("category") || undefined;
  const skip = (page - 1) * limit;

  // Tous les champs nécessaires au front
  const ALLOWED_FIELDS = [
    "_id",
    "name",
    "description",
    "price",
    "stock",
    "images",
    "category",
    "specifications",
    "discount",
    "createdAt",
    "updatedAt",
  ];

  // Pour afficher tout ce dont le front a besoin, on force ici la projection complète
  // Sinon on peut garder la logique du paramètre fields si tu veux filtrer côté client
  const fields = [
    "_id",
    "name",
    "description",
    "price",
    "stock",
    "images",
    "category",
    "specifications",
    "discount",
    "createdAt",
    "updatedAt",
  ];

  const projection = Object.fromEntries(
    fields.map((f) => [f, 1])
  ) as ProjectionType<IProduct>;

  const cacheKey = `products:${category || "all"}:${page}:${limit}:${
    search || ""
  }:${fields.join(",")}`;

  try {
    const cached = await cacheGet(cacheKey);
    if (cached) return NextResponse.json(cached);

    const filter: Record<string, any> = {};
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Récupération avec population de category (seulement _id et name)
    const [products, total] = await Promise.all([
      Product.find(filter, projection)
        .populate("category", "name _id")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Product.countDocuments(filter),
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

    await cacheSet(cacheKey, result, 300); // cache 5 minutes
    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ GET /api/products error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des produits" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await dbConnect();
  // console.log("▶️ [API] POST /api/products - Début du traitement"); // décommenter si debug

  try {
    const formData = await req.formData();

    const data = {
      name: String(formData.get("name")),
      description: String(formData.get("description")),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock") || 0),
      category: String(formData.get("categoryId")),
      specifications: formData.get("specifications")
        ? JSON.parse(String(formData.get("specifications")))
        : null,
    };

    if (!data.name || !data.description || !data.price || !data.category) {
      return NextResponse.json(
        {
          error:
            "Données manquantes : name, description, price et categoryId sont requis",
        },
        { status: 400 }
      );
    }

    const images: string[] = [];
    const imageFiles = formData.getAll("images");
    const uploadDir = path.join(process.cwd(), "public", "uploads", "products");

    for (const imageFile of imageFiles) {
      // Vérifie que l'élément est un fichier (Blob)
      if (imageFile instanceof Blob) {
        await mkdir(uploadDir, { recursive: true });
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const fileName = `${Date.now()}-${(imageFile as File).name.replace(
          /[^a-zA-Z0-9.]/g,
          "_"
        )}`;
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        images.push(`/uploads/products/${fileName}`);
      }
    }

    const product = await Product.create({
      ...data,
      images,
    });

    // Supprime les caches qui peuvent être invalides
    await Promise.all([
      cacheDelete("products:all"),
      cacheDelete(`products:${product.category}`),
      // éventuellement, si tu as d'autres clés de cache spécifiques, les supprimer aussi
    ]);

    return NextResponse.json(product);
  } catch (error) {
    console.error("❌ Erreur serveur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du produit" },
      { status: 500 }
    );
  }
}
