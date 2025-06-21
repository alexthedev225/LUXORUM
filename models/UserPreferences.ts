import { Schema, model, Document, Types, models } from "mongoose";

export interface IUserPreferences extends Document {
  userId: Types.ObjectId;
  newsletter: boolean;
  language: string;
  notifications: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserPreferencesSchema = new Schema<IUserPreferences>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    newsletter: { type: Boolean, default: true },
    language: { type: String, default: "fr" }, // ou "en", etc.
    notifications: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const UserPreferences =
  models.UserPreferences ||
  model<IUserPreferences>("UserPreferences", UserPreferencesSchema);
export default UserPreferences;
