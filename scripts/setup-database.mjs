import fs from "fs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function setupDatabase() {
  console.log("\n📦 Assistant de configuration Neon + Prisma");
  console.log("----------------------------------------");

  try {
    const url = await new Promise((resolve) => {
      rl.question(
        "\n🔗 Collez votre URL Neon (commence par postgresql://) : ",
        resolve
      );
    });

    if (!url.startsWith("postgresql://")) {
      throw new Error("URL invalide : doit commencer par postgresql://");
    }

    // Validation plus robuste de l'URL
    const regex = /postgresql:\/\/([^:]+):([^@]+)@([^/]+)\/([^?]+)/;
    const match = url.match(regex);

    if (!match) {
      throw new Error("Format d'URL invalide");
    }

    const [, user, password, host, dbname] = match;

    // Création des URLs avec validation
    if (!host.includes("-pooler.")) {
      console.log(
        '⚠️  Warning: L\'URL ne contient pas "-pooler" - ajout automatique'
      );
    }

    const poolerHost = host.includes("-pooler.")
      ? host
      : host.replace(".", "-pooler.");
    const directHost = poolerHost.replace("-pooler.", ".");

    const databaseUrl = `postgresql://${user}:${password}@${poolerHost}:5432/${dbname}?sslmode=require&connect_timeout=30`;
    const directUrl = `postgresql://${user}:${password}@${directHost}:5432/${dbname}?sslmode=require&connect_timeout=30`;

    // Sauvegarde avec backup
    if (fs.existsSync(".env")) {
      fs.renameSync(".env", ".env.backup");
      console.log("💾 Backup du fichier .env existant créé (.env.backup)");
    }

    const envContent = `# Configuration Neon + Prisma
DATABASE_URL="${databaseUrl}"
DIRECT_URL="${directUrl}"
`;

    fs.writeFileSync(".env", envContent);

    console.log("\n✅ Configuration terminée avec succès!");
    console.log("📝 Fichier .env créé avec :");
    console.log("   - DATABASE_URL (pooled)");
    console.log("   - DIRECT_URL (non-pooled)");
    console.log("\n▶️  Prochaine étape : npx prisma db push");
  } catch (error) {
    console.error("\n❌ Erreur:", error.message);
    console.log("🔄 Veuillez réessayer avec une URL valide");
  } finally {
    rl.close();
  }
}

setupDatabase();
