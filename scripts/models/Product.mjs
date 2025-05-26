import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const ProductSchema = new Schema(
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

const Product = models.Product || model("Product", ProductSchema);

export default Product;
