
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAddRuko } from "../hooks/use-add-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useCreateRuko } from "../api/use-create-ruko"

export const AddRukoDialog = () => {
  const { isOpen, onOpen, onClose } = useAddRuko()
  const mutation = useCreateRuko()

  const [name, setName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [contractDue, setContractDue] = useState<Date | null>(null)
  const [shopBlock, setShopBlock] = useState<string>("")
  const [shopNumber, setShopNumber] = useState<string>("")
  const [shopSize, setShopSize] = useState<number>(0)
  const [pasarName, setPasarName] = useState<string>("")

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validasi semua field
    if (
      !name ||
      !phone ||
      !address ||
      !contractDue ||
      !shopBlock ||
      !shopNumber ||
      !shopSize ||
      !pasarName
    ) {
      alert("Semua kolom harus diisi!")
      return
    }

    // Kirim data
    mutation.mutate({
      name,
      phone,
      address,
      contractDue,
      shopBlock,
      shopNumber,
      shopSize,
      pasarName,
    })

    // Reset dan tutup dialog
    setName("")
    setPhone("")
    setAddress("")
    setContractDue(null)
    setShopBlock("")
    setShopNumber("")
    setShopSize(0)
    setPasarName("")
    onClose()
  }


  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Ruko</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            <Button variant="destructive" onClick={onClose} className="mt-4">
              Close
            </Button>

          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="grid gap-4 mt-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={name} required onChange={e => setName(e.target.value)} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" value={phone} required onChange={e => setPhone(e.target.value)} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" value={address} required onChange={e => setAddress(e.target.value)} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="contract-due">Contract Due</Label>
            <Input
              id="contract-due"
              name="contractDue"
              type="date"
              required
              value={contractDue ? contractDue.toISOString().split("T")[0] : ""}
              onChange={e => setContractDue(e.target.value ? new Date(e.target.value) : null)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="shop-block">Shop Block</Label>
            <Input id="shop-block" name="shopBlock" value={shopBlock} required onChange={e => setShopBlock(e.target.value)} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="shop-number">Shop Number</Label>
            <Input id="shop-number" name="shopNumber" value={shopNumber} required onChange={e => setShopNumber(e.target.value)} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="shop-size">Shop Size (m<sup>3</sup>)</Label>
            <Input id="shop-size" name="shopSize" type="number" value={shopSize} required onChange={e => setShopSize(Number(e.target.value))} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="pasar-name">Pasar Name</Label>
            <Input id="pasar-name" name="pasarName" value={pasarName} required onChange={e => setPasarName(e.target.value)} />
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
          <Button type="button" variant="destructive" onClick={onClose}>
            Close
          </Button>
        </form>
      </DialogContent>
  )
}

