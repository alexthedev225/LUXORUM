const mongoose= require("mongoose")

const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
  console.error(
    "Erreur : La variable d'environnement DATABASE_URL est manquante."
  );
  process.exit(1);
}

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connexion MongoDB réussie !");
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Erreur de connexion MongoDB :", error);
    process.exit(1);
  }
}

testConnection();
