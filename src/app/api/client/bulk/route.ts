import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);

    if (!Array.isArray(body) || body.length === 0) {
      return NextResponse.json({ message: "Invalid or empty data array" }, { status: 400 });
    }

    const result = await prisma.client.createMany({
      data: body,
      skipDuplicates: true, // Hindari error jika phone sudah ada
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating clients:", error);
    return NextResponse.json({ message: "Error creating clients", error }, { status: 500 });
  }
}
