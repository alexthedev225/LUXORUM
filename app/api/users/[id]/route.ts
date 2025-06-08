import User from "@/models/User";
import dbConnect from "@/lib/mongoose";
import { withAuth } from "@/utils/withAuth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return withAuth(req, async (_req, user) => {
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Accès refusé : réservé aux administrateurs" },
        { status: 403 }
      );
    }

    await dbConnect();

    try {
      const { id } = params;
      const foundUser = await User.findById(id).select("-password").lean();

      if (!foundUser) {
        return NextResponse.json(
          { message: "Utilisateur non trouvé" },
          { status: 404 }
        );
      }

      return NextResponse.json(foundUser);
    } catch (error) {
      console.error("Erreur GET user", error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  return withAuth(req, async (req, user) => {
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Accès refusé : réservé aux administrateurs" },
        { status: 403 }
      );
    }

    await dbConnect();

    try {
      const { id } = params;
      const data = await req.json();

      // Exclure la mise à jour du password ici (si besoin, faire une route dédiée)
      const { password, ...updateData } = data;

      // Valider ici éventuellement le role et permissions (à adapter selon besoin)
      if (
        updateData.role &&
        !["USER", "ADMIN", "MANAGER"].includes(updateData.role)
      ) {
        return NextResponse.json({ message: "Role invalide" }, { status: 400 });
      }

      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
        context: "query",
      }).select("-password");

      if (!updatedUser) {
        return NextResponse.json(
          { message: "Utilisateur non trouvé" },
          { status: 404 }
        );
      }

      return NextResponse.json(updatedUser);
    } catch (error) {
      console.error("Erreur PUT user", error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  return withAuth(req, async (_req, user) => {
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Accès refusé : réservé aux administrateurs" },
        { status: 403 }
      );
    }

    await dbConnect();

    try {
      const { id } = params;
      const deletedUser = await User.findByIdAndDelete(id).select("-password");

      if (!deletedUser) {
        return NextResponse.json(
          { message: "Utilisateur non trouvé" },
          { status: 404 }
        );
      }

      return NextResponse.json({ message: "Utilisateur supprimé" });
    } catch (error) {
      console.error("Erreur DELETE user", error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  });
}
