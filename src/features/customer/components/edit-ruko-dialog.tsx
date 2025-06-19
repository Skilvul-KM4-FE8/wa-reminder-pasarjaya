"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

import { useOpenEditRuko } from "../hooks/use-open-edit-dialog";
import { useGetRuko } from "../api/use-get-ruko";
import { useEditRuko } from "../api/use-edit-ruko";

const SHOP_BLOCK_OPTIONS = ["A", "B", "C", "D", "E", "F", "G"];
const PASAR_OPTIONS = ["PASAR SENIN", "PASAR MINGGU", "PASAR TANAH ABANG"];

export const EditRukoDialog = () => {
  const { isOpen, onClose, id } = useOpenEditRuko();
  const rukoQuery = useGetRuko(id!);
  const editMutation = useEditRuko(id!);

  const isLoading = rukoQuery.isLoading || rukoQuery.isFetching || rukoQuery.isRefetching || rukoQuery.isPending;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    contractDue: "",
    shopBlock: "",
    shopNumber: "",
    shopSize: 0,
    pasarName: "",
    amountDue: 0,
  });

  useEffect(() => {
    if (rukoQuery.data) {
      const data = rukoQuery.data;

      const shopBlock = (data.shopBlock || "").trim().toUpperCase();
      const pasarName = (data.pasarName || "").trim().toUpperCase();

      setForm({
        name: data.name || "",
        phone: data.phone || "",
        address: data.address || "",
        contractDue: data.contractDue ? new Date(data.contractDue).toISOString().split("T")[0] : "",
        shopBlock,
        shopNumber: data.shopNumber || "",
        shopSize: data.shopSize || 0,
        pasarName,
        amountDue: data.amountDue || 0,
      });
    }
  }, [rukoQuery.data]);

  const handleChange = (field: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.contractDue) {
      alert("Contract Due tidak boleh kosong");
      return;
    }

    editMutation.mutate(
      {
        ...form,
        contractDue: new Date(form.contractDue).toISOString(),
      },
      {
        onSuccess: () => onClose(),
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Ruko</DialogTitle>
          <DialogDescription>Silakan isi data ruko yang ingin diubah.</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
            <FormField label="Name">
              <Input id="name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} required />
            </FormField>

            <FormField label="Phone">
              <Input id="phone" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} required />
            </FormField>

            <FormField label="Address">
              <Input id="address" value={form.address} onChange={(e) => handleChange("address", e.target.value)} required />
            </FormField>

            <FormField label="Contract Due">
              <Input id="contract-due" type="date" value={form.contractDue} onChange={(e) => handleChange("contractDue", e.target.value)} required />
            </FormField>

            <FormField label="Shop Block">
              <Select value={form.shopBlock} onValueChange={(val) => handleChange("shopBlock", val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih blok" />
                </SelectTrigger>
                <SelectContent>
                  {SHOP_BLOCK_OPTIONS.map((block) => (
                    <SelectItem key={block} value={block}>
                      {block}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Shop Number">
              <Input id="shop-number" value={form.shopNumber} onChange={(e) => handleChange("shopNumber", e.target.value)} required />
            </FormField>

            <FormField label="Shop Size (m2)">
              <Input id="shop-size" type="number" min={1} value={form.shopSize} onChange={(e) => handleChange("shopSize", Number(e.target.value))} required />
            </FormField>

            <FormField label="Pasar Name">
              <Select value={form.pasarName} onValueChange={(val) => handleChange("pasarName", val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih pasar" />
                </SelectTrigger>
                <SelectContent>
                  {PASAR_OPTIONS.map((pasar) => (
                    <SelectItem key={pasar} value={pasar}>
                      {pasar}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Amount">
              <Input id="amount" type="number" min={1} value={form.amountDue} onChange={(e) => handleChange("amountDue", Number(e.target.value))} required />
            </FormField>

            <Button type="submit" className="w-full">
              Submit
            </Button>
            <Button type="button" variant="destructive" onClick={onClose} className="w-full">
              Close
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Reusable form field component
const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="grid gap-2">
    <Label>{label}</Label>
    {children}
  </div>
);
