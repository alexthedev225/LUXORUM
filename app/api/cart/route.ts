import { NextResponse } from "next/server";
import { withAuth } from "@/utils/withAuth";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import connect from "@/lib/mongoose";  // ta fonction connect


export async function GET(req: Request) {
    await connect();

  return withAuth(req, async (_req, user) => {
    try {
      // Chercher le panier utilisateur, peupler les produits dans items
      const cart = await Cart.findOne({ userId: user.userId }).populate(
        "items.product"
      );

      if (!cart) {
        return NextResponse.json({ items: [] });
      }

      return NextResponse.json(cart);
    } catch (error) {
      console.error("Erreur GET /api/cart:", error);
      return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
    }
  });
}

export async function POST(req: Request) {
    await connect();

  return withAuth(req, async (req, user) => {
    try {
      const body = await req.json();
      const { productId, quantity } = body;

      if (!productId || !quantity || quantity < 1) {
        return NextResponse.json(
          { message: "Données invalides" },
          { status: 400 }
        );
      }

      // Vérifier que le produit existe
      const product = await Product.findById(productId);
      if (!product) {
        return NextResponse.json(
          { message: "Produit non trouvé" },
          { status: 404 }
        );
      }

      // Chercher panier existant
      let cart = await Cart.findOne({ userId: user.userId });

      if (!cart) {
        // Créer panier si inexistant
        cart = new Cart({
          userId: user.userId,
          items: [{ product: productId, quantity }],
        });
      } else {
        // Vérifier si produit déjà dans panier
        const index = cart.items.findIndex(
          (item) => item.product.toString() === productId
        );
        if (index > -1) {
          // Incrémenter quantité
          cart.items[index].quantity += quantity;
        } else {
          // Ajouter nouveau produit
          cart.items.push({ product: productId, quantity });
        }
      }

      await cart.save();
      return NextResponse.json(cart);
    } catch (error) {
      console.error("Erreur POST /api/cart:", error);
      return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
    }
  });
}

export async function PUT(req: Request) {
    await connect();

  return withAuth(req, async (req, user) => {
    try {
      const body = await req.json();
      const { items } = body;

      if (!Array.isArray(items)) {
        return NextResponse.json(
          { message: "Données invalides" },
          { status: 400 }
        );
      }

      // Valider chaque item
      for (const item of items) {
        if (
          !item.productId ||
          typeof item.quantity !== "number" ||
          item.quantity < 0
        ) {
          return NextResponse.json(
            { message: "Données invalides dans les items" },
            { status: 400 }
          );
        }

        // Vérifier produit existe (optionnel mais recommandé)
        const prod = await Product.findById(item.productId);
        if (!prod) {
          return NextResponse.json(
            { message: `Produit ${item.productId} non trouvé` },
            { status: 404 }
          );
        }
      }

      let cart = await Cart.findOne({ userId: user.userId });
      if (!cart) {
        return NextResponse.json(
          { message: "Panier non trouvé" },
          { status: 404 }
        );
      }

      // Remplacer les items par ceux reçus
      cart.items = items.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
      }));

      await cart.save();
      return NextResponse.json(cart);
    } catch (error) {
      console.error("Erreur PUT /api/cart:", error);
      return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
    }
  });
}

export async function DELETE(req: Request) {
    await connect();

  return withAuth(req, async (_req, user) => {
    try {
      const cart = await Cart.findOne({ userId: user.userId });
      if (!cart) {
        return NextResponse.json(
          { message: "Panier non trouvé" },
          { status: 404 }
        );
      }

      cart.items = [];
      await cart.save();
      return NextResponse.json({ message: "Panier vidé" });
    } catch (error) {
      console.error("Erreur DELETE /api/cart:", error);
      return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
    }
  });
}
