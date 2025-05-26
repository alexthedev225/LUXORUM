import { Schema, model, Document, Types } from "mongoose";
import mongoose from "mongoose";


export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
}

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  role: Role;
  permissions: string[];
  firstName?: string;
  lastName?: string;
  addresses: Types.ObjectId[];
  orders: Types.ObjectId[];
  cart?: Types.ObjectId;
  stockUpdates: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    permissions: { type: [String], default: [] },
    firstName: String,
    lastName: String,
    addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    cart: { type: Schema.Types.ObjectId, ref: "Cart" },
    stockUpdates: [{ type: Schema.Types.ObjectId, ref: "StockHistory" }],
  },
  { timestamps: true }
);

const User = mongoose.models.User || model<IUser>("User", UserSchema);
export default User;
