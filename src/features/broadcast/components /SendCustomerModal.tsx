"use client";

import { Button } from "@/components/ui/button";
import { useSendWAStateModal } from "../hooks/use-push-customer-modal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export const SendCustomerModal = () => {
  const { isOpen, onClose, selectedRows } = useSendWAStateModal();

  const handleSendMessage = async () => {
    const payload = selectedRows.map((row) => ({
      number: row.original.phone,
      message: `Halo ${row.original.name}, ini adalah pesan broadcast!`,
    }));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_WA_URL}/api/messages/bulk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // langsung array
      });

      console.log("Request Payload:", payload);

      const data = await res.json();

      if (res.ok) {
        toast.success(`✅ Berhasil mengirim pesan ke ${selectedRows.length} orang!`);
        console.log("Detail hasil pengiriman:", data.results);
      } else {
        toast.error("❌ Gagal mengirim sebagian atau seluruh pesan.");
        console.error("Error Response:", data);
      }
    } catch (error) {
      console.error("❌ Error saat mengirim pesan WA:", error);
      toast.error("Terjadi kesalahan saat menghubungi server WA.");
    } finally {
      onClose(); // Tutup modal
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Daftar Penerima WA</DialogTitle>
          <DialogDescription>Pesan akan dikirim ke {selectedRows.length} orang:</DialogDescription>
        </DialogHeader>
        <div className="max-h-[300px] overflow-auto  space-y-1 border p-2 rounded bg-gray-50">
          {selectedRows.map((row, idx) => (
            <div key={row.id} className="text-sm">
              {idx + 1}. {row.original.name} ({row.original.phone})
            </div>
          ))}
        </div>
        <div className=" grid w-full grid-cols-1 gap-2">
          <Button onClick={handleSendMessage}>Kirim Pesan</Button>
          <Button variant="destructive" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
