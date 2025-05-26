import { connectDB } from "./utils/dbConnect.mjs";
import Category from "./models/Category.mjs";

const category = [
  {
    name: "Montres",
    description: "Chronographes & Automatiques",
    slug: "montres",
    position: "Collection Horlogerie",
    longDescription:
      "Notre collection de montres de luxe allie tradition horlogère et innovation technique...",
  },
  {
    name: "Colliers",
    description: "Chaînes & Pendentifs",
    slug: "colliers",
    position: "Collection Prestige",
    longDescription: "Une collection raffinée de colliers pour homme...",
  },
  {
    name: "Bagues",
    description: "Chevalières & Alliances",
    slug: "bagues",
    position: "Collection Exclusive",
    longDescription:
      "Des bagues d'exception qui célèbrent l'art de la joaillerie masculine...",
  },
  {
    name: "Bracelets",
    description: "Joncs & Mailles",
    slug: "bracelets",
    position: "Collection Signature",
    longDescription:
      "Une sélection de bracelets qui incarnent l'élégance masculine moderne...",
  },
];

async function insertCategories() {
  await connectDB();

  for (const cat of category) {
    try {
      const existing = await Category.findOne({ slug: cat.slug });
      if (!existing) {
        await Category.create(cat);
        console.log(`✅ Catégorie insérée : ${cat.name}`);
      } else {
        console.log(`⚠️ Catégorie déjà existante : ${cat.name}`);
      }
    } catch (error) {
      console.error(`❌ Erreur insertion catégorie ${cat.name} :`, error);
    }
  }

  process.exit(0);
}

insertCategories();
