import User from "@/models/User";
import dbConnect from "@/lib/mongoose";
import { withAuth } from "@/utils/withAuth";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

const passwordChangeSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

export async function PUT(req: Request) {
  return withAuth(req, async (req, user) => {
    await dbConnect();

    try {
      const data = await req.json();

      const parseResult = passwordChangeSchema.safeParse(data);
      if (!parseResult.success) {
        return NextResponse.json(
          { message: "Données invalides", errors: parseResult.error.errors },
          { status: 400 }
        );
      }

      const currentUser = await User.findById(user.userId).select("password");

      if (!currentUser) {
        return NextResponse.json(
          { message: "Utilisateur non trouvé" },
          { status: 404 }
        );
      }

      const isMatch = await bcrypt.compare(
        parseResult.data.oldPassword,
        currentUser.password
      );

      if (!isMatch) {
        return NextResponse.json(
          { message: "Ancien mot de passe incorrect" },
          { status: 400 }
        );
      }

      const hashed = await bcrypt.hash(parseResult.data.newPassword, 10);
      currentUser.password = hashed;
      await currentUser.save();

      return NextResponse.json({ message: "Mot de passe modifié" });
    } catch (error) {
      console.error("Erreur PUT security", error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  });
}
