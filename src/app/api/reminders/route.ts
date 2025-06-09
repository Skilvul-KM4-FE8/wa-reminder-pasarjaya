// model Reminder {
//   id          String         @id @default(cuid())
//   title       String
//   dueDate     DateTime
//   messageBody String
//   status      ReminderStatus @default(PENDING)
//   sentAt      DateTime?
//   userId      String
//   clientId    String
//   createdAt   DateTime       @default(now())
//   updatedAt   DateTime       @updatedAt
//   amountDue   Int
//   period      String
//   client      Client         @relation("ClientReminders", fields: [clientId], references: [id], onDelete: Cascade)

//   @@index([status])
//   @@index([dueDate])
//   @@index([userId])
// }

// decalre post get reminder
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
export async function GET() {
  const reminders = await prisma.reminder.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      client: true,
    },
  });

  return new Response(
    JSON.stringify({
      message: "success",
      data: reminders,
      total: reminders.length,
      totalPage: Math.ceil(reminders.length / 10),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

