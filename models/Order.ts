import { Schema, model, models, Document, Types } from "mongoose";

// Définir le type pour un article de commande
interface OrderItem {
  product: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

// Interface complète du document Order
export interface IOrder extends Document {
  userId: Types.ObjectId;
  items: OrderItem[];
  amount: number;
  status: "paid" | "pending" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

// Schéma pour un item de commande
const OrderItemSchema = new Schema<OrderItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Schéma principal de commande
const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [OrderItemSchema],
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["paid", "pending", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// ✅ Empêche l'erreur de redéclaration
const Order = models.Order || model<IOrder>("Order", OrderSchema);

export default Order;
