import { NextRequest, NextResponse } from "next/server";
import { cacheGet, cacheSet, cacheDelete } from "@/lib/redis";
import Product, { IProduct } from "@/models/Product";
import "@/models/Category"; // Assure-toi que ce chemin est correct selon ta structure
import dbConnect from "@/lib/mongoose";
import { FilterQuery, ProjectionType } from "mongoose";
import cloudinary from "@/lib/cloudinary";

interface CloudinaryUploadResult {
  secure_url: string;
}
export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const search = searchParams.get("search");
  const category = searchParams.get("category") || undefined;
  const skip = (page - 1) * limit;

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

    const filter: FilterQuery<IProduct> = {};
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

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

    await cacheSet(cacheKey, result, 300);
    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ GET /api/products error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des produits" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

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

    for (const imageFile of imageFiles) {
      if (imageFile instanceof Blob) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result: CloudinaryUploadResult = await new Promise(
          (resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  folder: "products",
                  resource_type: "image",
                  transformation: [
                    { width: 1200, height: 1200, crop: "limit" }, // facultatif
                  ],
                },
                (error, result) => {
                  if (error) return reject(error);
                  if (result) {
                    resolve(result);
                  } else {
                    reject(new Error("Upload result is undefined"));
                  }
                }
              )
              .end(buffer);
          }
        );

        if (
          result &&
          typeof result.secure_url === "string" &&
          result.secure_url.trim() !== ""
        ) {
          images.push(result.secure_url);
        } else {
          console.warn(
            "⚠️ Invalid or undefined secure_url in upload result:",
            result
          );
        }
      }
    }

    const product = await Product.create({
      ...data,
      images,
    });

    await Promise.all([
      cacheDelete("products:all"),
      cacheDelete(`products:${product.category}`),
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
