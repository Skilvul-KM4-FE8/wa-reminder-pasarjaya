// model Client {
//   id          String     @id @default(cuid())
//   name        String
//   phone       String     @unique
//   createdAt   DateTime   @default(now())
//   updatedAt   DateTime   @updatedAt
//   address     String
//   contractDue DateTime
//   shopBlock   String
//   shopNumber  String
//   shopSize    Float
//   pasarName   String
//   amountDue   Float?
//   reminders   Reminder[] @relation("ClientReminders")

//   @@index([phone])
//   @@index([pasarName])
// }

import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  const clients = await prisma.client.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      reminders: true,
    },
  });

  return new Response(
    JSON.stringify({
      message: "success",
      data: clients,
      total: clients.length,
      totalPage: Math.ceil(clients.length / 10),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function POST(request: Request) {
  const { name, phone, address, contractDue, shopBlock, shopNumber, shopSize, pasarName, amountDue } = await request.json();

  console.log("Received request body:", request.body);
  console.log("Received request headers:", request.headers.get("Content-Type"));
  console.log("Received request method:", request.method);

  console.log("Received data for new client:", { name, phone, address, contractDue, shopBlock, shopNumber, shopSize, pasarName, amountDue });

  try {
    // Validate required fields
    if (!name || !phone || !address || !contractDue || !shopBlock || !shopNumber || !shopSize || !pasarName || !amountDue) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const client = await prisma.client.create({
      data: {
        name,
        phone,
        address,
        contractDue,
        shopBlock,
        shopNumber,
        shopSize,
        pasarName,
        amountDue,
      },
    });
    return NextResponse.json(client);
  } catch (error) {
    console.error("Error validating client data:", error);
    return NextResponse.json({ message: "Error validating client data" }, { status: 500 });
  }
}
