import mongoose from "mongoose";
import User from "./models/User"; // adapte le chemin si besoin

async function main(): Promise<void> {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI n'est pas défini dans les variables d'environnement"
    );
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connecté à MongoDB");

    // Exemple : passer tous les utilisateurs avec email dans une liste en ADMIN
    const emailsAdmins = ["bekanticode@gmail.com"]; // Doit être un tableau

    const result = await User.updateMany(
      { email: { $in: emailsAdmins } },
      { $set: { role: "ADMIN" } }
    );

    console.log(
      `Mise à jour terminée : ${result.modifiedCount} documents modifiés`
    );

    // Afficher la liste des admins
    const admins = await User.find({ role: "ADMIN" });
    console.log("Liste des admins :", admins);

    await mongoose.disconnect();
  } catch (err) {
    console.error("Erreur :", err);
  }
}

main();
