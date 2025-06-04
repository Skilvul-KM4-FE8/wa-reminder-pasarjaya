"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAddRuko } from "../hooks/use-add-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"


export const AddRukoDialog = () => {
  const { isOpen, onOpen, onClose } = useAddRuko()

  const [name, setName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [contractDue, setContractDue] = useState<Date | null>(null)
  const [shopBlock, setShopBlock] = useState<string>("")
  const [shopSize, setShopSize] = useState<string>("")
  const [pasarName, setPasarName] = useState<string>("")

  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Ruko</DialogTitle>
          <DialogDescription>
            <form className="space-y-4">
              Silahkan isi data pengguna yang ingin memesan ruko baru. Pastikan data yang dimasukkan sudah benar sebelum mengirimkan permintaan.
            <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name" name="name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone-1">Phone</Label>
              <Input id="phone" name="phone" value={""} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="address-1">Address</Label>
              <Input id="address" name="address" value={""} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="contract-due-1">Contract Due</Label>
              <Input
                id="contract-due"
                name="contractDue"
                type="date"
                value={""}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="shop-block-1">Shop Block</Label>
              <Input id="shop-block" name="shopBlock" value={""} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="shop-size-1">Shop Size</Label>
              <Input id="shop-size" name="shopSize" value={""} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="pasar-name-1">Pasar Name</Label>
              <Input id="pasar-name" name="pasarName" value={""} />
            </div>
            <Button type="submit">
              Submit
            </Button>
            <Button variant="destructive" onClick={onClose}>
              Close
            </Button>
          </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}