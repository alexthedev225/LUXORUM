import User from "@/models/User";
import dbConnect from "@/lib/mongoose";
import { withAuth } from "@/utils/withAuth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  return withAuth(req, async (_req, user) => {
    await dbConnect();

    try {
      const deletedUser = await User.findByIdAndDelete(user.userId);

      if (!deletedUser) {
        return NextResponse.json(
          { message: "Utilisateur non trouvé" },
          { status: 404 }
        );
      }

      // Ici tu peux aussi supprimer en cascade les données liées : adresses, commandes, préférences, etc.

      return NextResponse.json({ message: "Compte supprimé" });
    } catch (error) {
      console.error("Erreur DELETE account", error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  });
}
