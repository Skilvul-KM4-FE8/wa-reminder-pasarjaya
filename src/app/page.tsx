import { Button } from "@/app/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to the Dashboard</h1>
      <p className="mt-4 text-lg">This is a simple dashboard layout.</p>
      <Link href="/dashboard">
        <Button variant="default" className="mt-4">
          Dashboard Ruko
        </Button>
      </Link>
    </main>
  );
}
