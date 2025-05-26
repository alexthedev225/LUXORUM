import mongoose from "mongoose";
import Product from "./models/Product.mjs";
import { connectDB } from "./utils/dbConnect.mjs";


const categoryIds = {
  Montres: new mongoose.Types.ObjectId("6830aff5579322a97c7c0b13"),
  Colliers: new mongoose.Types.ObjectId("6830aff6579322a97c7c0b16"),
  Bagues: new mongoose.Types.ObjectId("6830aff6579322a97c7c0b19"),
  Bracelets: new mongoose.Types.ObjectId("6830aff7579322a97c7c0b1c"),
};

// Tes produits d'origine, adaptant category en ObjectId et image en images (tableau)
const productsToInsert = [
  {
    name: "Brilliance Divine",
    description: "Un bracelet exquis en chaîne de diamants, alliant raffinement et modernité",
    price: 4500,
    stock: 10,
    images: ["/products/bracelet.png"],
    category: categoryIds.Bracelets,
    discount: 0,
    specifications: {
      materials: "Or blanc 18 carats, Diamants",
      finish: "Poli miroir",
      certificate: "Certificat GIA",
      collection: "Divine Series",
      additionalDetails: ["Double sécurité", "Ajustable"],
      stats: {
        craftsmanship: 91,
        rarity: 87,
        prestige: 89,
        durability: 90,
      },
      detailedDescription:
        "Le bracelet **Brilliance Divine** est un chef-d'œuvre d'artisanat, conçu pour séduire les amateurs de bijoux raffinés. Composé d'une chaîne délicate en **or blanc 18 carats**, il est orné de diamants de qualité supérieure, soigneusement taillés pour offrir un éclat impressionnant à chaque mouvement. Ce bracelet fait partie de la **Divine Series**, une collection exclusive dédiée à l'élégance pure et à la modernité. Le **polissage miroir** parfait et la finition impeccable ajoutent à son allure sophistiquée. Avec son **système de double sécurité** et son design **ajustable**, il s'adapte à toutes les tailles de poignets, offrant à la fois confort et sécurité. Ce bijou est livré avec un **certificat GIA**, garantissant l'authenticité des diamants utilisés.",
      tag: "Nouveau",
    },
  },
  {
    name: "Angelic Grace",
    description: "Une chaîne en or 18 carats ornée d'un pendentif en forme d'ange",
    price: 2000,
    stock: 10,
    images: ["/products/chaine.png"],
    category: categoryIds.Colliers,
    discount: 0,
    specifications: {
      materials: "Or 18 carats, Diamants",
      finish: "Double poli",
      certificate: "Certificat d'authenticité",
      collection: "Celestial",
      additionalDetails: ["Longueur ajustable", "Fermoir signature"],
      stats: {
        craftsmanship: 88,
        rarity: 82,
        prestige: 85,
        durability: 93,
      },
      detailedDescription:
        "Le collier **Angelic Grace** incarne l'élégance céleste. Ce pendentif en forme d'ange, finement détaillé, est suspendu à une chaîne en **or 18 carats** poli, mettant en valeur une beauté intemporelle. Son design est inspiré par la grâce et la pureté, offrant une touche divine à toute tenue. Le **pendant** est orné de **diamants**, ajoutant un éclat subtil et raffiné à l'ensemble. La chaîne, au **polissage double**, est douce au toucher et se distingue par sa robustesse. Ce collier fait partie de la **collection Celestial**, symbolisant la beauté et la lumière divine. Il est également doté d'un **fermoir signature**, offrant à la fois sécurité et esthétisme, et est réglable pour un ajustement parfait à toutes les morphologies. Chaque pièce est accompagnée d'un **certificat d'authenticité**.",
      tag: "Bestseller",
    },
  },
  {
    name: "Saphir Rouge",
    description: "La Saphir Rouge est une bague exclusive en diamant et rubis",
    price: 3500,
    stock: 10,
    images: ["/products/bague.png"],
    category: categoryIds.Bagues,
    discount: 0,
    specifications: {
      materials: "Or rose 18 carats, Rubis, Diamants",
      finish: "Poli miroir haute précision",
      certificate: "Triple certification",
      collection: "Red Legacy",
      additionalDetails: ["Édition numérotée", "Écrin collector"],
      stats: {
        craftsmanship: 94,
        rarity: 96,
        prestige: 93,
        durability: 89,
      },
      detailedDescription:
        "La bague **Saphir Rouge** est un bijou exclusif, un véritable symbole de prestige et de rareté. Fabriquée en **or rose 18 carats**, cette bague est ornée d'un **rubis** majestueux, entouré de **diamants** de haute qualité. Le design sophistiqué et moderne de la bague la rend intemporelle, tandis que sa finition en **polissage miroir haute précision** garantit un éclat sublime. Elle fait partie de la **collection Red Legacy**, une série limitée de bijoux d'exception. La **bague est numérotée**, ce qui en fait un véritable objet de collection. Le **triple certificat** garantit la provenance des pierres précieuses et l'authenticité du bijou. Cette bague est livrée dans un **écrin collector**, prêt à être admiré ou offert en cadeau de luxe. Ce modèle est une pièce incontournable pour les collectionneurs et les connaisseurs.",
      tag: "Édition Limitée",
    },
  },
  {
    name: "Eclipse Prestige",
    description:
      "Une montre sophistiquée en acier inoxydable avec cadran minimaliste et détails en or rose et diamants roses",
    price: 8500,
    stock: 10,
    images: ["/products/montre.png"],
    category: categoryIds.Montres,
    discount: 0,
    specifications: {
      materials: "Acier inoxydable, Or rose, Diamants roses, Cuir véritable",
      finish: "Poli miroir",
      certificate: "Certificat d'authenticité",
      collection: "Eclipse Collection",
      additionalDetails: [
        "Mouvement mécanique suisse",
        "Bracelet en cuir véritable",
        "Édition limitée",
      ],
      stats: {
        craftsmanship: 92,
        rarity: 90,
        prestige: 94,
        durability: 88,
      },
      detailedDescription:
        "La montre **Eclipse Prestige** est une pièce d'horlogerie d'exception qui allie tradition et modernité. Son boîtier en **acier inoxydable** poli de haute qualité abrite un cadran **minimaliste** avec des aiguilles en **or rose** et des index en **diamants roses** pour une touche d'élégance discrète. Le mouvement mécanique, de fabrication suisse, assure une précision exceptionnelle et un mouvement fluide. Le bracelet en **cuir véritable** est soigneusement conçu pour offrir confort et durabilité, tout en apportant une touche de raffinement. Cette montre fait partie de la **Eclipse Collection**, une série limitée dédiée aux amateurs d'horlogerie de prestige. Son design épuré et ses matériaux de qualité en font une montre intemporelle, parfaite pour les occasions spéciales.",
      tag: "Édition Limitée",
    },
  },
];

// Script d'insertion
async function seedProducts() {
  await connectDB();

  // Nettoyer la collection produits (optionnel)
  await Product.deleteMany();

  // Insérer les produits
  await Product.insertMany(productsToInsert);

  console.log("Produits insérés");
  await mongoose.disconnect();
}

seedProducts().catch(console.error);
