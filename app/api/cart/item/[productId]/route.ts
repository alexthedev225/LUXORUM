import { NextResponse } from "next/server";
import { withAuth } from "@/utils/withAuth";
import Cart from "@/models/Cart";
import connect from "@/lib/mongoose";

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  await connect();

  return withAuth(req, async (_req, user) => {
    try {
      const { productId } = params;

      if (!productId) {
        return NextResponse.json(
          { message: "productId manquant" },
          { status: 400 }
        );
      }

      // Trouver le panier utilisateur
      const cart = await Cart.findOne({ userId: user.userId });
      if (!cart) {
        return NextResponse.json(
          { message: "Panier non trouvé" },
          { status: 404 }
        );
      }

      // Vérifier si produit est dans le panier
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex === -1) {
        return NextResponse.json(
          { message: "Produit non trouvé dans le panier" },
          { status: 404 }
        );
      }

      // Supprimer l'item du panier
      cart.items.splice(itemIndex, 1);
      await cart.save();

      return NextResponse.json({ message: "Produit supprimé du panier", cart });
    } catch (error) {
      console.error("Erreur DELETE /api/cart/item/:productId:", error);
      return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
    }
  });
}
