//InsertProducts.mjs
// Ce script insère des produits dans la base de données MongoDB
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
    name: "Éclat Solaire",
    description:
      "Un bracelet lumineux aux reflets dorés, inspiré de la puissance solaire",
    price: 3200,
    stock: 15,
    images: ["/products/bracelet2.png"],
    category: categoryIds.Bracelets,
    discount: 0,
    specifications: {
      materials: "Or jaune 18 carats, Citrine",
      finish: "Poli satiné",
      certificate: "Certificat d'origine",
      collection: "Solar Essence",
      additionalDetails: ["Fermoir magnétique", "Ultra léger"],
      stats: {
        craftsmanship: 89,
        rarity: 80,
        prestige: 84,
        durability: 85,
      },
      detailedDescription:
        "Le bracelet **Éclat Solaire** évoque la lumière pure du soleil capturée dans un bijou. Fabriqué en **or jaune 18 carats**, il est serti d’une **citrine éclatante** qui évoque la chaleur et l’énergie vitale. Léger et confortable, il est doté d’un **fermoir magnétique** discret et sécurisé. Ce bijou fait partie de la collection **Solar Essence**, qui incarne la lumière intérieure. Livré avec un **certificat d'origine**, il s’adresse aux amoureux de l’élégance naturelle.",
      tag: "Coup de cœur",
    },
  },
  {
    name: "Larme Céleste",
    description:
      "Un collier pendentif en forme de goutte céleste, en saphir bleu profond",
    price: 2800,
    stock: 8,
    images: ["/products/collier2.png"],
    category: categoryIds.Colliers,
    discount: 0,
    specifications: {
      materials: "Or blanc 18 carats, Saphir",
      finish: "Poli miroir",
      certificate: "Certificat gemmologique",
      collection: "Heaven's Tear",
      additionalDetails: ["Chaîne fine", "Design épuré"],
      stats: {
        craftsmanship: 90,
        rarity: 85,
        prestige: 88,
        durability: 87,
      },
      detailedDescription:
        "Le collier **Larme Céleste** est une ode à la beauté mystique du ciel nocturne. Il met en avant un **saphir bleu profond**, taillé en forme de goutte, suspendu à une chaîne en **or blanc 18 carats**. Ce bijou minimaliste, issu de la **collection Heaven's Tear**, capture l’essence de la sérénité céleste. Son design fluide et épuré s’adapte à tous les styles. Il est livré avec un **certificat gemmologique** attestant la pureté de sa pierre.",
      tag: "Nouvelle Collection",
    },
  },
  {
    name: "Émeraude Nocturne",
    description: "Bague ornée d’une émeraude sombre entourée de diamants noirs",
    price: 4700,
    stock: 6,
    images: ["/products/bague2.png"],
    category: categoryIds.Bagues,
    discount: 0,
    specifications: {
      materials: "Or noirci, Émeraude, Diamants noirs",
      finish: "Brossé",
      certificate: "Certificat de collection",
      collection: "Noir Mystique",
      additionalDetails: ["Design asymétrique", "Sertissage profond"],
      stats: {
        craftsmanship: 95,
        rarity: 92,
        prestige: 90,
        durability: 86,
      },
      detailedDescription:
        "La **bague Émeraude Nocturne** est une création audacieuse, jouant sur les contrastes et les textures. L’**émeraude centrale**, d’un vert intense, est sublimée par un entourage de **diamants noirs**, conférant à l’ensemble une aura de mystère. La monture en **or noirci**, légèrement **brossée**, renforce son allure énigmatique. Cette pièce unique appartient à la collection **Noir Mystique**, dédiée aux bijoux de caractère.",
      tag: "Édition Spéciale",
    },
  },
  {
    name: "Astro Chronos",
    description: "Montre en titane inspirée des constellations et de l’univers",
    price: 9000,
    stock: 5,
    images: ["/products/montre2.png"],
    category: categoryIds.Montres,
    discount: 0,
    specifications: {
      materials: "Titane, Verre saphir, Luminova",
      finish: "Sablé",
      certificate: "Garantie 10 ans",
      collection: "Galactic Time",
      additionalDetails: ["Phase lunaire", "Bracelet interchangeable"],
      stats: {
        craftsmanship: 93,
        rarity: 91,
        prestige: 95,
        durability: 92,
      },
      detailedDescription:
        "L’**Astro Chronos** est une montre à l’esthétique galactique, conçue pour les passionnés d’astronomie. Son boîtier en **titane sablé** abrite un cadran étoilé avec affichage de **phase lunaire**. Protégée par un **verre saphir** anti-rayures, elle allie modernité et robustesse. Issue de la collection **Galactic Time**, elle propose un **bracelet interchangeable** et une **garantie 10 ans**.",
      tag: "Exclusivité",
    },
  },
  {
    name: "Rose d’Hiver",
    description:
      "Collier orné d’un quartz rose givré monté sur chaîne en argent poli",
    price: 1500,
    stock: 12,
    images: ["/products/collier3.png"],
    category: categoryIds.Colliers,
    discount: 0,
    specifications: {
      materials: "Argent sterling, Quartz rose",
      finish: "Poli glacé",
      certificate: "Certificat artisanal",
      collection: "Floral Ice",
      additionalDetails: ["Chaîne fine", "Monture sculptée"],
      stats: {
        craftsmanship: 87,
        rarity: 79,
        prestige: 81,
        durability: 82,
      },
      detailedDescription:
        "Le collier **Rose d’Hiver** allie la délicatesse du **quartz rose givré** à la pureté de l’**argent sterling**. Inspiré de la flore hivernale, il évoque la douceur au cœur de la saison froide. Sa chaîne fine et sa monture sculptée en font un bijou romantique. Il appartient à la collection **Floral Ice**, reflet de l’élégance naturelle et artisanale.",
      tag: "Poétique",
    },
  },
  {
    name: "Cercle Infini",
    description: "Bracelet rigide circulaire représentant l’infini",
    price: 2400,
    stock: 9,
    images: ["/products/bracelet3.png"],
    category: categoryIds.Bracelets,
    discount: 0,
    specifications: {
      materials: "Or blanc 14 carats",
      finish: "Brillant",
      certificate: "Certificat de garantie",
      collection: "Infinity Loop",
      additionalDetails: ["Gravure intérieure", "Design minimaliste"],
      stats: {
        craftsmanship: 86,
        rarity: 78,
        prestige: 80,
        durability: 88,
      },
      detailedDescription:
        "Le bracelet **Cercle Infini** est un hommage à la **forme éternelle** de l’infini. D’un **design rigide et épuré**, il est forgé en **or blanc 14 carats**, avec une **gravure intérieure** portant le symbole ∞. Sa brillance subtile et sa forme parfaite s’accordent à toutes les tenues. Cette pièce fait partie de la collection **Infinity Loop**, dédiée à l’amour sans fin.",
      tag: "Intemporel",
    },
  },
  {
    name: "Flamme Intérieure",
    description:
      "Bague sculptée en forme de flamme en or rose et topaze impériale",
    price: 3100,
    stock: 7,
    images: ["/products/bague3.png"],
    category: categoryIds.Bagues,
    discount: 0,
    specifications: {
      materials: "Or rose, Topaze impériale",
      finish: "Martelé",
      certificate: "Certificat d’artiste",
      collection: "Inner Fire",
      additionalDetails: ["Forme organique", "Fabrication artisanale"],
      stats: {
        craftsmanship: 91,
        rarity: 86,
        prestige: 88,
        durability: 84,
      },
      detailedDescription:
        "La **Flamme Intérieure** est une bague inspirée par la puissance des émotions profondes. Forgée en **or rose**, elle entoure une **topaze impériale** à la teinte chaude et changeante. Sa **forme organique** et sa finition **martelée** reflètent un feu sacré en constante évolution. Elle appartient à la collection **Inner Fire**, un hommage aux passions intérieures.",
      tag: "Signature",
    },
  },
  {
    name: "Minuit Polaire",
    description: "Montre au cadran bleu nuit avec index en nacre",
    price: 7100,
    stock: 6,
    images: ["/products/montre3.png"],
    category: categoryIds.Montres,
    discount: 0,
    specifications: {
      materials: "Acier inoxydable, Nacre, Verre saphir",
      finish: "Brossé",
      certificate: "Certificat Swiss Made",
      collection: "Arctic Line",
      additionalDetails: ["Étanche 100m", "Mécanisme automatique"],
      stats: {
        craftsmanship: 90,
        rarity: 84,
        prestige: 89,
        durability: 91,
      },
      detailedDescription:
        "La montre **Minuit Polaire** évoque la clarté glacée des nuits arctiques. Son cadran **bleu nuit**, orné d’**index en nacre**, est protégé par un **verre saphir** ultra-résistant. Elle est dotée d’un **mécanisme automatique suisse**, garantissant précision et élégance. Cette montre de la collection **Arctic Line** allie **sobriété et performance**, avec une étanchéité jusqu’à 100m.",
      tag: "Haute Horlogerie",
    },
  },
  {
    name: "Feuille d'Or",
    description: "Collier à pendentif feuille finement gravée en or pur",
    price: 3800,
    stock: 10,
    images: ["/products/collier4.png"],
    category: categoryIds.Colliers,
    discount: 0,
    specifications: {
      materials: "Or pur 24 carats",
      finish: "Gravure satinée",
      certificate: "Certificat de pureté",
      collection: "Nature Élégante",
      additionalDetails: ["Pendentif mobile", "Chaîne ajustable"],
      stats: {
        craftsmanship: 89,
        rarity: 91,
        prestige: 85,
        durability: 80,
      },
      detailedDescription:
        "Le collier **Feuille d'Or** est un hommage à la nature et à la finesse artisanale. Son **pendentif en forme de feuille**, délicatement **gravé**, est réalisé en **or pur 24 carats**. Léger et mobile, il repose sur une chaîne ajustable conçue pour un port quotidien. Ce bijou appartient à la collection **Nature Élégante**, symbolisant la beauté organique.",
      tag: "Artisanat",
    },
  },
  {
    name: "Ombre Lunaire",
    description: "Bague mystérieuse avec opale noire et sertissage inversé",
    price: 3300,
    stock: 8,
    images: ["/products/bague4.png"],
    category: categoryIds.Bagues,
    discount: 0,
    specifications: {
      materials: "Or gris, Opale noire",
      finish: "Satiné",
      certificate: "Certificat opale",
      collection: "Shadow Light",
      additionalDetails: ["Effet caméléon", "Design mystérieux"],
      stats: {
        craftsmanship: 92,
        rarity: 89,
        prestige: 87,
        durability: 85,
      },
      detailedDescription:
        "La bague **Ombre Lunaire** joue avec les contrastes entre lumière et obscurité. Elle met en valeur une **opale noire** aux reflets changeants, montée en **sertissage inversé** sur de l’**or gris satiné**. Ce modèle, issu de la collection **Shadow Light**, évoque l’équilibre entre mystère et clarté. Un bijou rare, conçu pour fasciner.",
      tag: "Mystique",
    },
  },
];


// Script d'insertion
async function seedProducts() {
  await connectDB();

  // Insérer les produits
  await Product.insertMany(productsToInsert);

  console.log("Produits insérés");
  await mongoose.disconnect();
}

seedProducts().catch(console.error);
