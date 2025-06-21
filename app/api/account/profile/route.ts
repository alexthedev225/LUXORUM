import User from "@/models/User";
import dbConnect from "@/lib/mongoose";
import { withAuth } from "@/utils/withAuth";
import { NextResponse } from "next/server";
import { z } from "zod";

const profileUpdateSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phone: z.string().min(5).max(20).optional(),
  // email non modifiable ici (à adapter si besoin)
});

export async function GET(req: Request) {
  return withAuth(req, async (_req, user) => {
    await dbConnect();

    try {
      const foundUser = await User.findById(user.userId)
        .select("firstName lastName email phone")
        .lean();

      if (!foundUser) {
        return NextResponse.json(
          { message: "Utilisateur non trouvé" },
          { status: 404 }
        );
      }

      return NextResponse.json(foundUser);
    } catch (error) {
      console.error("Erreur GET profile", error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  });
}

export async function PUT(req: Request) {
  return withAuth(req, async (req, user) => {
    await dbConnect();

    try {
      const data = await req.json();

      const parseResult = profileUpdateSchema.safeParse(data);
      if (!parseResult.success) {
        return NextResponse.json(
          { message: "Données invalides", errors: parseResult.error.errors },
          { status: 400 }
        );
      }

      const updatedUser = await User.findByIdAndUpdate(
        user.userId,
        parseResult.data,
        {
          new: true,
          runValidators: true,
          context: "query",
        }
      ).select("firstName lastName email phone");

      if (!updatedUser) {
        return NextResponse.json(
          { message: "Utilisateur non trouvé" },
          { status: 404 }
        );
      }

      return NextResponse.json(updatedUser);
    } catch (error) {
      console.error("Erreur PUT profile", error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  });
}
