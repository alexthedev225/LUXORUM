import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Address from "@/models/Address";
import { withAuth } from "@/utils/withAuth";
import { z } from "zod";

const addressUpdateSchema = z.object({
  street: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
  state: z.string().min(1).optional(),
  postalCode: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
  isDefault: z.boolean().optional(),
});

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  return withAuth(req, async (_req, user) => {
    await dbConnect();

    try {
      const data = await req.json();

      const parseResult = addressUpdateSchema.safeParse(data);
      if (!parseResult.success) {
        return NextResponse.json(
          { message: "Données invalides", errors: parseResult.error.errors },
          { status: 400 }
        );
      }

      if (parseResult.data.isDefault) {
        await Address.updateMany(
          { user: user.userId, isDefault: true },
          { isDefault: false }
        );
      }

      const updatedAddress = await Address.findOneAndUpdate(
        { userId: user.userId, _id: id },
        parseResult.data,
        { new: true, runValidators: true }
      );

      if (!updatedAddress) {
        return NextResponse.json(
          { message: "Adresse non trouvée" },
          { status: 404 }
        );
      }

      return NextResponse.json(updatedAddress);
    } catch (error) {
      console.error("Erreur PUT address", error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  });
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  return withAuth(req, async (_req, user) => {
    await dbConnect();

    try {
      const deletedAddress = await Address.findOneAndDelete({
        userId: user.userId,
        _id: id,
      });

      if (!deletedAddress) {
        return NextResponse.json(
          { message: "Adresse non trouvée" },
          { status: 404 }
        );
      }

      return NextResponse.json({ message: "Adresse supprimée" });
    } catch (error) {
      console.error("Erreur DELETE address", error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  });
}
