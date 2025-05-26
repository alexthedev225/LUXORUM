import { Schema, model, Document, Types } from "mongoose";

export interface IOrderItem extends Document {
  order: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const OrderItem = model<IOrderItem>("OrderItem", OrderItemSchema);
export default OrderItem;
