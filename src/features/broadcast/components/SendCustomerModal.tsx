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

  const [message, setMessage] = useState<string>("");

  const handleSendMessage = async () => {
    const payload = selectedRows.map((row) => {
      const data = row.original;

      const customMessage = message
        .replace("{name}", data.name)
        .replace("{pasarName}", data.pasarName)
        .replace("{shopBlock}", data.shopBlock)
        .replace("{shopNumber}", data.shopNumber)
        .replace("{amountDue}", Number(data.amountDue).toLocaleString("id-ID", { style: "currency", currency: "IDR" }))
        .replace("{contractDue}", new Date(data.contractDue).toLocaleDateString("id-ID"));

      return {
        number: data.phone,
        message: customMessage,
      };
    });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_WA_URL}/api/messages/bulk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

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
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Daftar Penerima WA</DialogTitle>
          <DialogDescription>Pesan akan dikirim ke {selectedRows.length} orang:</DialogDescription>
        </DialogHeader>
        <div className="max-h-[300px] overflow-auto  space-y-1 border p-2 rounded-md">
          <div className="text-sm">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">No</TableHead>
                  <TableHead className="w-1/3">Nama</TableHead>
                  <TableHead className="w-1/3">Nomor Telepon</TableHead>
                  <TableHead className="w-1/3">Amount</TableHead>
                </TableRow>
              </TableHeader>
              {selectedRows.map((row, idx) => (
                <TableBody>
                  <TableRow>
                    <TableCell className="w-1/3">{idx + 1}</TableCell>
                    <TableCell className="w-1/3">{row.original.name}</TableCell>
                    <TableCell className="w-1/3">{row.original.phone}</TableCell>
                    <TableCell className="w-1/3">{row.original.amountDue}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </div>
        </div>
        <p className="text-l mt-2">Isi Pesan</p>
        {/* //text area untuk pesan */}
        <div className="">
          <Textarea
            className="w-full h-24"
            placeholder="Masukkan pesan yang ingin dikirim..."
            defaultValue={`Halo {name},\n\nIni pengingat untuk pembayaran ruko Anda di {pasarName} blok {shopBlock} nomor {shopNumber}. Total yang harus dibayar: Rp {amountDue}. Kontrak berakhir pada: {contractDue}.\n\nTerima kasih!`}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </div>
        <div>
          <p className="text-xs text-gray-500 mt-2">Pastikan nomor telepon sudah benar dan terdaftar di WhatsApp. Pesan akan dikirim secara bersamaan.</p>
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
