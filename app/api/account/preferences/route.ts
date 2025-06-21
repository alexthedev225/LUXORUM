import UserPreferences from "@/models/UserPreferences";
import dbConnect from "@/lib/mongoose";
import { withAuth } from "@/utils/withAuth";
import { NextResponse } from "next/server";
import { z } from "zod";

const preferencesSchema = z.object({
  newsletter: z.boolean().optional(),
  language: z.string().min(2).max(10).optional(),
  notifications: z.boolean().optional(),
});

export async function GET(req: Request) {
  return withAuth(req, async (_req, user) => {
    await dbConnect();

    try {
      const prefs = await UserPreferences.findOne({ userId: user.userId }).lean();

      if (!prefs) {
        return NextResponse.json({}, { status: 204 }); // Pas de contenu
      }

      return NextResponse.json(prefs);
    } catch (error) {
      console.error("Erreur GET preferences", error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  });
}

export async function PUT(req: Request) {
  return withAuth(req, async (req, user) => {
    await dbConnect();

    try {
      const data = await req.json();
      const parseResult = preferencesSchema.safeParse(data);

      if (!parseResult.success) {
        return NextResponse.json(
          { message: "Données invalides", errors: parseResult.error.errors },
          { status: 400 }
        );
      }

      const updatedPrefs = await UserPreferences.findOneAndUpdate(
        { userId: user.userId },
        parseResult.data,
        { new: true, upsert: true, runValidators: true }
      );

      return NextResponse.json(updatedPrefs);
    } catch (error) {
      console.error("Erreur PUT preferences", error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  });
}
