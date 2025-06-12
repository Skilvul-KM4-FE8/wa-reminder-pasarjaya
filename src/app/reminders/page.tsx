import { Card } from "@/components/ui/card";
import { Header } from "../components/header";

export default function BroadcastPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center w-full pb-10 -mt-29 px-2 lg:px-14">
        <Card className="w-full  p-6 border-none bg-white drop-shadow-sm">
          <h1 className="text-2xl font-bold mb-4">Reminders Log Page</h1>
          <p className="text-lg">This is the broadcast page.</p>
        </Card>
      </div>
    </>
  );
}
