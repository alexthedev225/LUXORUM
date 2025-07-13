import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";
import { cacheDelete } from "@/lib/redis";
import cloudinary from "@/lib/cloudinary";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  try {
    const product = await Product.findById(id).populate("category");
    if (!product) {
      return NextResponse.json(
        { error: "Produit introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Erreur GET produit :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const price = Number(formData.get("price") ?? 0);
    const stock = Number(formData.get("stock") ?? 0);
    const category = formData.get("categoryId")?.toString() || "";
    const specificationsRaw =
      formData.get("specifications")?.toString() || null;
    const discountRaw = formData.get("discount")?.toString() || null;

    const specifications = specificationsRaw
      ? JSON.parse(specificationsRaw)
      : undefined;
    const discount = discountRaw ? Number(discountRaw) : undefined;

    if (!name || !description || isNaN(price) || isNaN(stock) || !category) {
      return NextResponse.json(
        { error: "Champs manquants ou invalides" },
        { status: 400 }
      );
    }

    const imageFiles = formData.getAll("images");
    const newImages: string[] = [];

    for (const imageFile of imageFiles) {
      if (typeof imageFile === "object" && "arrayBuffer" in imageFile) {
        const buffer = Buffer.from(await (imageFile as Blob).arrayBuffer());

        const uploaded = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "products",
                resource_type: "image",
                transformation: [{ width: 1200, height: 1200, crop: "limit" }],
              },
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              }
            )
            .end(buffer);
        });

        interface UploadedResult {
          secure_url: string;
        }

        newImages.push((uploaded as UploadedResult).secure_url);
      }
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    // Si pas de nouvelles images, on garde les anciennes
    const finalImages = newImages.length > 0 ? newImages : product.images;

    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;
    product.category = category;
    product.images = finalImages;
    if (specifications !== undefined) product.specifications = specifications;
    if (discount !== undefined) product.discount = discount;

    await product.save();

    await Promise.all([
      cacheDelete("products:all"),
      cacheDelete(`products:${category}`),
    ]);

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Erreur PUT produit :", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  try {
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Produit introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Produit supprimé" }, { status: 200 });
  } catch (error) {
    console.error("Erreur DELETE produit :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
