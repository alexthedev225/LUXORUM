import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Settings from "@/models/Settings";

export async function GET() {
  await connectDB();

  let settings = await Settings.findOne({});
  if (!settings) {
    settings = new Settings();
    await settings.save();
  }

  return NextResponse.json(settings);
}

export async function PUT(req: Request) {
  await connectDB();

  const data = await req.json();

  // Mise à jour ou création
  const settings = await Settings.findOneAndUpdate({}, data, {
    new: true,
    upsert: true,
  });

  return NextResponse.json(settings);
}
