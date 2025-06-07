"use client";

import { Button } from "@/components/ui/button";
import { useSendWAStateModal } from "../hooks/use-push-customer-modal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export const CreateCustomerModal = () => {
  const { isOpen, onClose, selectedRows } = useSendWAStateModal();

  const handleSendMessage = () => {
    // Logika untuk mengirim pesan WA ke selectedRows
    console.log("Mengirim pesan WA ke:", selectedRows);
    toast.success(`Pesan WA berhasil dikirim ke ${selectedRows.length} penerima!`);
    onClose(); // Tutup modal setelah mengirim pesan
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
