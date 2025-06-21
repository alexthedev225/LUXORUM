import Address from "@/models/Address";
import dbConnect from "@/lib/mongoose";
import { withAuth } from "@/utils/withAuth";
import { NextResponse } from "next/server";
import { z } from "zod";

const addressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
  isDefault: z.boolean().optional(),
});

export async function GET(req: Request) {
  return withAuth(req, async (_req, user) => {
    await dbConnect();

    try {
      const addresses = await Address.find({ user: user.userId }).lean();
      return NextResponse.json(addresses);
    } catch (error) {
      console.error("Erreur GET addresses", error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  });
}

export async function POST(req: Request) {
  return withAuth(req, async (req, user) => {
    await dbConnect();

    try {
      const data = await req.json();

      const parseResult = addressSchema.safeParse(data);
      if (!parseResult.success) {
        return NextResponse.json(
          { message: "Données invalides", errors: parseResult.error.errors },
          { status: 400 }
        );
      }

      // Si isDefault true, retirer l'option par défaut des autres adresses
      if (parseResult.data.isDefault) {
        await Address.updateMany(
          { user: user.userId, isDefault: true },
          { isDefault: false }
        );
      }

      const newAddress = new Address({
        ...parseResult.data,
        user: user.userId,
      });

      await newAddress.save();

      return NextResponse.json(newAddress, { status: 201 });
    } catch (error) {
      console.error("Erreur POST address", error);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  });
}
