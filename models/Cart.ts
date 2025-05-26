import { Schema, model, models, Document, Types } from "mongoose";

// Définir un type pour un item de panier
interface CartItem {
  product: Types.ObjectId; // Référence au modèle Product
  quantity: number;
}

// Interface complète pour un document Cart
export interface ICart extends Document {
  userId: Types.ObjectId; // Référence à un utilisateur
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

// Schéma pour un item de panier
const CartItemSchema = new Schema<CartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
});

// Schéma principal du panier
const CartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [CartItemSchema],
  },
  { timestamps: true }
);

// ✅ Sécurise l'import multiple avec models.Cart
const Cart = models.Cart || model<ICart>("Cart", CartSchema);

export default Cart;
