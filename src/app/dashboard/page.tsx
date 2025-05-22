"use client";

import { Button } from "@/app/components/ui/button";
import { Ruko, columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetRuko } from "../utils /useGetRuko";

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
// }

export default function DemoPage() {
  const { data, isLoading, error } = useGetRuko();

  // console.log(data.data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container py-10 mx-4">
      <div>
        <h1 className="text-4xl font-bold">Ruko</h1>
        <p className="my-2 text-lg">This is a simple dashboard layout.</p>
      </div>
      <div className="">
        <DataTable columns={columns} data={data.data} />
      </div>
    </div>
  );
}
