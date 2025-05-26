import { Schema, model, Document, Types } from "mongoose";

export interface IStockHistory extends Document {
  product: Types.ObjectId;
  previousStock: number;
  newStock: number;
  updatedBy: Types.ObjectId;
  createdAt: Date;
}

const StockHistorySchema = new Schema<IStockHistory>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    previousStock: { type: Number, required: true },
    newStock: { type: Number, required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const StockHistory = model<IStockHistory>("StockHistory", StockHistorySchema);
export default StockHistory;
