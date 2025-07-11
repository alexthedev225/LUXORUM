import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose"; // ta fonction de connexion à MongoDB
import Category from "@/models/Category";
import Product from "@/models/Product"; // ou le bon chemin absolu/relatif vers ton modèle Product

export async function GET() {
  await dbConnect();
  try {
    // Récupérer toutes les catégories et compter les produits liés
    const categories = await Category.find().exec();

    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const productsCount = await Product.countDocuments({
          category: cat._id,
        });

        return {
          _id: cat._id,
          name: cat.name,
          description: cat.description,
          slug: cat.slug,
          position: cat.position,
          longDescription: cat.longDescription,
          productsCount,
          createdAt: cat.createdAt,
          updatedAt: cat.updatedAt,
        };
      })
    );


    return NextResponse.json(categoriesWithCount);
  } catch (error) {
    console.error("Erreur récupération catégories:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des catégories" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const data = await req.json();

    // Validation minimale
    if (!data.name || !data.slug || !data.position || !data.longDescription) {
      return NextResponse.json(
        {
          error:
            "Les champs name, slug, position et longDescription sont requis",
        },
        { status: 400 }
      );
    }

    // Vérifier si une catégorie avec ce slug existe déjà
    const existingCategory = await Category.findOne({ slug: data.slug });
    if (existingCategory) {
      return NextResponse.json(
        { error: "Une catégorie avec ce slug existe déjà" },
        { status: 400 }
      );
    }

    const category = new Category({
      name: data.name,
      description: data.description || "",
      slug: data.slug,
      position: data.position,
      longDescription: data.longDescription,
      products: [],
    });

    await category.save();

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Erreur création catégorie:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la catégorie" },
      { status: 500 }
    );
  }
}
