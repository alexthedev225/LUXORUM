export type Product = {
  id: number;
  name: string;
  description: string;
  detailedDescription: string;
  price: number;
  image: string;
  category: "Montres" | "Colliers" | "Bagues" | "Bracelets";
  tag?: "Nouveau" | "Bestseller" | "Édition Limitée";
  stats: {
    craftsmanship: number; // Artisanat
    rarity: number; // Rareté
    prestige: number; // Prestige
    durability: number; // Durabilité
  };
  specifications: {
    materials: string;
    finish: string;
    certificate: string;
    collection?: string;
    additionalDetails?: string[];
  };
};

// Mise à jour des noms de stats en français
const statsLabels = {
  craftsmanship: "Artisanat",
  rarity: "Rareté",
  prestige: "Prestige",
  durability: "Durabilité",
} as const;

export { statsLabels };

export const products: Product[] = [
  {
    id: 1,
    name: "Brilliance Divine",
    detailedDescription:
      "Le bracelet **Brilliance Divine** est un chef-d'œuvre d'artisanat, conçu pour séduire les amateurs de bijoux raffinés. Composé d'une chaîne délicate en **or blanc 18 carats**, il est orné de diamants de qualité supérieure, soigneusement taillés pour offrir un éclat impressionnant à chaque mouvement. Ce bracelet fait partie de la **Divine Series**, une collection exclusive dédiée à l'élégance pure et à la modernité. Le **polissage miroir** parfait et la finition impeccable ajoutent à son allure sophistiquée. Avec son **système de double sécurité** et son design **ajustable**, il s'adapte à toutes les tailles de poignets, offrant à la fois confort et sécurité. Ce bijou est livré avec un **certificat GIA**, garantissant l'authenticité des diamants utilisés.",
    description:
      "Un bracelet exquis en chaîne de diamants, alliant raffinement et modernité",
    price: 4500,
    image: "/products/bracelet.png",
    category: "Bracelets",
    tag: "Nouveau",
    stats: {
      craftsmanship: 91,
      rarity: 87,
      prestige: 89,
      durability: 90,
    },
    specifications: {
      materials: "Or blanc 18 carats, Diamants",
      finish: "Poli miroir",
      certificate: "Certificat GIA",
      collection: "Divine Series",
      additionalDetails: ["Double sécurité", "Ajustable"],
    },
  },
  {
    id: 2,
    name: "Angelic Grace",
    detailedDescription:
      "Le collier **Angelic Grace** incarne l'élégance céleste. Ce pendentif en forme d'ange, finement détaillé, est suspendu à une chaîne en **or 18 carats** poli, mettant en valeur une beauté intemporelle. Son design est inspiré par la grâce et la pureté, offrant une touche divine à toute tenue. Le **pendant** est orné de **diamants**, ajoutant un éclat subtil et raffiné à l'ensemble. La chaîne, au **polissage double**, est douce au toucher et se distingue par sa robustesse. Ce collier fait partie de la **collection Celestial**, symbolisant la beauté et la lumière divine. Il est également doté d'un **fermoir signature**, offrant à la fois sécurité et esthétisme, et est réglable pour un ajustement parfait à toutes les morphologies. Chaque pièce est accompagnée d'un **certificat d'authenticité**.",
    description:
      "Une chaîne en or 18 carats ornée d'un pendentif en forme d'ange",
    price: 2000,
    image: "/products/chaine.png",
    category: "Colliers",
    tag: "Bestseller",
    stats: {
      craftsmanship: 88,
      rarity: 82,
      prestige: 85,
      durability: 93,
    },
    specifications: {
      materials: "Or 18 carats, Diamants",
      finish: "Double poli",
      certificate: "Certificat d'authenticité",
      collection: "Celestial",
      additionalDetails: ["Longueur ajustable", "Fermoir signature"],
    },
  },
  {
    id: 3,
    name: "Saphir Rouge",
    description: "La Saphir Rouge est une bague exclusive en diamant et rubis",
    detailedDescription:
      "La bague **Saphir Rouge** est un bijou exclusif, un véritable symbole de prestige et de rareté. Fabriquée en **or rose 18 carats**, cette bague est ornée d'un **rubis** majestueux, entouré de **diamants** de haute qualité. Le design sophistiqué et moderne de la bague la rend intemporelle, tandis que sa finition en **polissage miroir haute précision** garantit un éclat sublime. Elle fait partie de la **collection Red Legacy**, une série limitée de bijoux d'exception. La **bague est numérotée**, ce qui en fait un véritable objet de collection. Le **triple certificat** garantit la provenance des pierres précieuses et l'authenticité du bijou. Cette bague est livrée dans un **écrin collector**, prêt à être admiré ou offert en cadeau de luxe. Ce modèle est une pièce incontournable pour les collectionneurs et les connaisseurs.",
    price: 3500,
    image: "/products/bague.png",
    category: "Bagues",
    tag: "Édition Limitée",
    stats: {
      craftsmanship: 94,
      rarity: 96,
      prestige: 93,
      durability: 89,
    },
    specifications: {
      materials: "Or rose 18 carats, Rubis, Diamants",
      finish: "Poli miroir haute précision",
      certificate: "Triple certification",
      collection: "Red Legacy",
      additionalDetails: ["Édition numérotée", "Écrin collector"],
    },
  },
  {
    id: 4,
    name: "Eclipse Prestige",
    detailedDescription:
      "La montre **Eclipse Prestige** est une pièce d'horlogerie d'exception qui allie tradition et modernité. Son boîtier en **acier inoxydable** poli de haute qualité abrite un cadran **minimaliste** avec des aiguilles en **or rose** et des index en **diamants roses** pour une touche d'élégance discrète. Le mouvement mécanique, de fabrication suisse, assure une précision exceptionnelle et un mouvement fluide. Le bracelet en **cuir véritable** est soigneusement conçu pour offrir confort et durabilité, tout en apportant une touche de raffinement. Cette montre fait partie de la **Eclipse Collection**, une série limitée dédiée aux amateurs d'horlogerie de prestige. Son design épuré et ses matériaux de qualité en font une montre intemporelle, parfaite pour les occasions spéciales.",
    description:
      "Une montre sophistiquée en acier inoxydable avec cadran minimaliste et détails en or rose et diamants roses",
    price: 8500, // Un prix plus réaliste pour une montre de luxe avec des diamants roses
    image: "/products/montre.png",
    category: "Montres",
    tag: "Édition Limitée",
    stats: {
      craftsmanship: 92,
      rarity: 90,
      prestige: 94,
      durability: 88,
    },
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
    },
  },
];

export default products;
