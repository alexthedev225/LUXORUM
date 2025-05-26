import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CategorySchema = new Schema(
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

const Category = mongoose.models.Category || model("Category", CategorySchema);

export default Category;
