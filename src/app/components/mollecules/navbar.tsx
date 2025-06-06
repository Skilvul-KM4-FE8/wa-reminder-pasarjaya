import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function navbar() {
  return (
    <div className="flex items-center justify-between w-full px-4 py-2 ">
      <div className="text-lg font-bold">PasarJaya</div>
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline">Home</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline">Dashboard</Button>
        </Link>
        <Link href="/whatsapp">
          <Button variant="outline">Connect WA</Button>
        </Link>
      </div>
    </div>
  );
}
