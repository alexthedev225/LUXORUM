import { Schema, model, Document, Types, models } from "mongoose";
import Product from "@/models/Product";

export interface ICategory extends Document {
  name: string;
  description: string;
  slug: string;
  position: string;
  longDescription: string;
  products: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    longDescription: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

const Category =
  models.Category || model<ICategory>("Category", CategorySchema);
export default Category;
