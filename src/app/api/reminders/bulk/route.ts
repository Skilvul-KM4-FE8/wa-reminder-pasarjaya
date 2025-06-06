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

// declare post bulk reminder
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
export async function POST(request: Request) {
  const { reminders } = await request.json();

  if (!Array.isArray(reminders) || reminders.length === 0) {
    return NextResponse.json({ message: "No reminders provided" }, { status: 400 });
  }

  try {
    const createdReminders = await prisma.reminder.createMany({
      data: reminders,
      skipDuplicates: true, // Skip duplicates if any
    });

    return NextResponse.json({ message: "Reminders created successfully", data: createdReminders }, { status: 201 });
  } catch (error) {
    console.error("Error creating reminders:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "Failed to create reminders", error: errorMessage }, { status: 500 });
  }
}
