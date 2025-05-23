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
  const { name, phone, address, contractDue, shopBlock, shopNumber, shopSize, pasarName } = await request.json();

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
    },
  });

  return NextResponse.json(client);
}
