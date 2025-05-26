import { Schema, model, Document, Types } from "mongoose";

export interface ICartItemDoc extends Document {
  cart: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItemDoc>(
  {
    cart: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

const CartItem = model<ICartItemDoc>("CartItem", CartItemSchema);
export default CartItem;
