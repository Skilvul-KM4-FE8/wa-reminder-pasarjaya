"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useOpenEditRuko } from "../hooks/use-open-edit-dialog"
import { useGetRuko } from "../api/use-get-ruko"
import { Loader2 } from "lucide-react"
import { useEditRuko } from "../api/use-edit-ruko"

export const EditRukoDialog = () => {
  const { isOpen, onClose, id } = useOpenEditRuko()
  const rukoQuery = useGetRuko(id!)
  const editMutation = useEditRuko(id!)

  const isLoading =
    rukoQuery.isLoading ||
    rukoQuery.isFetching ||
    rukoQuery.isRefetching ||
    rukoQuery.isPending

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [contractDue, setContractDue] = useState<Date | null>(null)
  const [shopBlock, setShopBlock] = useState("")
  const [shopNumber, setShopNumber] = useState("")
  const [shopSize, setShopSize] = useState(0)
  const [pasarName, setPasarName] = useState("")

  // Set default value dari API
  useEffect(() => {
    if (rukoQuery.data) {
      setName(rukoQuery.data.name || "")
      setPhone(rukoQuery.data.phone || "")
      setAddress(rukoQuery.data.address || "")
      setContractDue(rukoQuery.data.contractDue ? new Date(rukoQuery.data.contractDue) : null)
      setShopBlock(rukoQuery.data.shopBlock || "")
      setShopNumber(rukoQuery.data.shopNumber || "")
      setShopSize(rukoQuery.data.shopSize || 0)
      setPasarName(rukoQuery.data.pasarName || "")
    }
  }, [rukoQuery.data])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!contractDue) {
      alert("Contract Due tidak boleh kosong")
      return
    }

    editMutation.mutate(
      {
        name,
        phone,
        address,
        contractDue: contractDue.toISOString(),
        shopBlock,
        shopNumber,
        shopSize,
        pasarName,
      },
      {
        onSuccess: () => {
          onClose()
        },
      }
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Ruko</DialogTitle>
          <DialogDescription>
            Silakan isi data ruko yang ingin diubah.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-8 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={address} onChange={e => setAddress(e.target.value)} required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="contract-due">Contract Due</Label>
              <Input
                id="contract-due"
                type="date"
                value={contractDue ? contractDue.toISOString().split("T")[0] : ""}
                onChange={e =>
                  setContractDue(e.target.value ? new Date(e.target.value) : null)
                }
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="shop-block">Shop Block</Label>
              <Input id="shop-block" value={shopBlock} onChange={e => setShopBlock(e.target.value)} required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="shop-number">Shop Number</Label>
              <Input id="shop-number" value={shopNumber} onChange={e => setShopNumber(e.target.value)} required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="shop-size">Shop Size (m³)</Label>
              <Input
                id="shop-size"
                type="number"
                value={shopSize}
                onChange={e => setShopSize(Number(e.target.value))}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="pasar-name">Pasar Name</Label>
              <Input id="pasar-name" value={pasarName} onChange={e => setPasarName(e.target.value)} required />
            </div>

            <Button type="submit" className="w-full">
              Submit
            </Button>
            <Button type="button" variant="destructive" onClick={onClose}>
              Close
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
