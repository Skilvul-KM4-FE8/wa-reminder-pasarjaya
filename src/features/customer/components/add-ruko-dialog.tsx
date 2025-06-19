"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAddRuko } from "../hooks/use-add-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useCreateRuko } from "../api/use-create-ruko";

export const AddRukoDialog = () => {
  const { isOpen, onOpen, onClose } = useAddRuko();
  const mutation = useCreateRuko();

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [contractDue, setContractDue] = useState<Date | null>(null);
  const [shopBlock, setShopBlock] = useState<string>("");
  const [shopNumber, setShopNumber] = useState<string>("");
  const [shopSize, setShopSize] = useState<number>(1);
  const [pasarName, setPasarName] = useState<string>("");
  const [amountDue, setAmountDue] = useState<number>(1);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !address || !contractDue || !shopBlock || !shopNumber || !shopSize || !pasarName) {
      alert("Semua kolom harus diisi!");
      return;
    }

    mutation.mutate({
      name,
      phone,
      address,
      contractDue,
      shopBlock,
      shopNumber,
      shopSize,
      pasarName,
      amountDue,
    });

    setName("");
    setPhone("");
    setAddress("");
    setContractDue(null);
    setShopBlock("");
    setShopNumber("");
    setShopSize(1);
    setPasarName("");
    setAmountDue(1);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        open ? onOpen() : onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Ruko</DialogTitle>
          <DialogDescription>Isi data pemesanan ruko dengan lengkap. Pastikan semua kolom diisi sebelum mengirimkan data.</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="grid gap-4 mt-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={name} required onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" value={phone} required onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" value={address} required onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="contract-due">Contract Due</Label>
            <Input id="contract-due" name="contractDue" type="date" required value={contractDue ? contractDue.toISOString().split("T")[0] : ""} onChange={(e) => setContractDue(e.target.value ? new Date(e.target.value) : null)} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="shop-block">Shop Block</Label>
            <Select value={shopBlock} onValueChange={setShopBlock}>
              <SelectTrigger className="w-full" id="shop-block">
                <SelectValue placeholder="Pilih blok" />
              </SelectTrigger>
              <SelectContent>
                {["A", "B", "C", "D", "E", "F", "G"].map((block) => (
                  <SelectItem key={block} value={block}>
                    {block}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="shop-number">Shop Number</Label>
            <Input id="shop-number" name="shopNumber" value={shopNumber} required onChange={(e) => setShopNumber(e.target.value)} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="shop-size">
              Shop Size (m<sup>2</sup>)
            </Label>
            <Input id="shop-size" name="shopSize" type="number" value={shopSize} min={1} required onChange={(e) => setShopSize(Number(e.target.value))} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="pasar-name">Pasar Name</Label>
            <Select value={pasarName} onValueChange={setPasarName}>
              <SelectTrigger className="w-full" id="pasar-name">
                <SelectValue placeholder="Pilih Pasar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PASAR SENIN">PASAR SENIN</SelectItem>
                <SelectItem value="PASAR MINGGU">PASAR MINGGU</SelectItem>
                <SelectItem value="PASAR TANAH ABANG">PASAR TANAH ABANG</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" name="amount" type="number" value={amountDue} min={1} required onChange={(e) => setAmountDue(Number(e.target.value))} />
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
          <Button type="button" variant="destructive" onClick={onClose}>
            Close
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
