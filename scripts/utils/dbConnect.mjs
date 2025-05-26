import "dotenv/config"; // Charge automatiquement le fichier .env
import mongoose from "mongoose";

const uri = process.env.DATABASE_URL;

if (!uri) {
  throw new Error("DATABASE_URL is not defined in .env");
}

export async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connecté");
  } catch (e) {
    console.error("❌ Erreur de connexion MongoDB :", e);
    process.exit(1);
  }
}
