"use client";

import { Button } from "@/components/ui/button";
import { useSendWAStateModal } from "../hooks/use-push-customer-modal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const SendCustomerModal = () => {
  const { isOpen, onClose, selectedRows } = useSendWAStateModal();
  const [message, setMessage] = useState<string>(
    "Halo {name},\n\nIni pengingat untuk pembayaran ruko Anda di {pasarName} blok {shopBlock} nomor {shopNumber}. Total yang harus dibayar: Rp {amountDue}. Kontrak berakhir pada: {contractDue}.\n\nTerima kasih!"
  );

  const handleSendMessage = async () => {
    // Format phone numbers to start with 62 and remove any non-digit characters
    const formatPhoneNumber = (phone: string) => {
      const cleaned = phone.replace(/\D/g, "");
      return cleaned.startsWith("0") ? "62" + cleaned.substring(1) : cleaned.startsWith("62") ? cleaned : "62" + cleaned;
    };

    // Prepare payload exactly as your working example
    const payload = selectedRows.map((row) => {
      const data = row.original;
      const formattedNumber = formatPhoneNumber(data.phone);

      const customMessage = message
        .replace(/{name}/g, data.name)
        .replace(/{pasarName}/g, data.pasarName)
        .replace(/{shopBlock}/g, data.shopBlock)
        .replace(/{shopNumber}/g, data.shopNumber)
        .replace(
          /{amountDue}/g,
          Number(data.amountDue).toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          })
        )
        .replace(/{contractDue}/g, new Date(data.contractDue).toLocaleDateString("id-ID"));

      return {
        number: formattedNumber,
        message: customMessage,
      };
    });

    console.log("Payload being sent:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(`http://202.10.47.75:4567/api/messages/bulk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send messages");
      }

      toast.success(`Berhasil mengirim ${selectedRows.length} pesan WhatsApp`);
      onClose();
    } catch (error) {
      console.error("Error sending messages:", error);
      const errorMessage = typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : String(error);
      toast.error(`Gagal mengirim pesan: ${errorMessage}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Kirim Pesan WhatsApp</DialogTitle>
          <DialogDescription>Akan mengirim ke {selectedRows.length} penerima</DialogDescription>
        </DialogHeader>

        <div className="max-h-64 overflow-y-auto border rounded-md p-2 mb-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Nomor HP</TableHead>
                <TableHead>Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.original.name}</TableCell>
                  <TableCell>{row.original.phone}</TableCell>
                  <TableCell>
                    {Number(row.original.amountDue).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-2">
          <p className="font-medium">Isi Pesan:</p>
          <Textarea value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-32" placeholder="Tulis pesan WhatsApp disini..." />
          <div className="text-xs text-muted-foreground">
            Gunakan variabel: {"{name}"}, {"{pasarName}"}, {"{shopBlock}"}, {"{shopNumber}"}, {"{amountDue}"}, {"{contractDue}"}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSendMessage}>Kirim Pesan</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
