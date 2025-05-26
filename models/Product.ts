import { Schema, model, models, Types, Document } from "mongoose";
import "@/models/Category";


export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: Types.ObjectId;
  specifications?: any;
  discount?: number;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    images: [{ type: String, required: true }],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    specifications: { type: Schema.Types.Mixed },
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = models.Product || model<IProduct>("Product", ProductSchema);
export default Product;

