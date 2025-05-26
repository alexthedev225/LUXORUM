import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose"; // Assure-toi que ce fichier existe
import Product from "@/models/Product";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { cacheDelete } from "@/lib/redis";


export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;

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
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;

  try {
    // Récupérer formData de la requête PUT
    const formData = await req.formData();

    // Extraire champs texte
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

    // Validation minimale
    if (!name || !description || isNaN(price) || isNaN(stock) || !category) {
      return NextResponse.json(
        { error: "Champs manquants ou invalides" },
        { status: 400 }
      );
    }

    // Upload images
    const imageFiles = formData.getAll("images");
    const images: string[] = [];
    const uploadDir = path.join(process.cwd(), "public", "uploads", "products");

    for (const imageFile of imageFiles) {
      if (typeof imageFile === "object" && "arrayBuffer" in imageFile) {
        await mkdir(uploadDir, { recursive: true });
        const buffer = Buffer.from(await (imageFile as Blob).arrayBuffer());
        const fileName = `${Date.now()}-${(imageFile as File).name.replace(
          /[^a-zA-Z0-9.]/g,
          "_"
        )}`;
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        images.push(`/uploads/products/${fileName}`);
      }
    }

    // Récupérer le produit actuel pour éventuellement garder les anciennes images si pas de nouvelles uploadées
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    // Si aucune nouvelle image uploadée, garder les anciennes images
    const updatedImages = images.length > 0 ? images : product.images;

    // Mise à jour produit
    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;
    product.category = category;
    product.images = updatedImages;
    if (specifications !== undefined) product.specifications = specifications;
    if (discount !== undefined) product.discount = discount;

    await product.save();

    // Invalider cache Redis lié aux produits
    await cacheDelete("products:all");
    await cacheDelete(`products:${category}`);

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
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;

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
