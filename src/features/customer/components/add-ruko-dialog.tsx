"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAddRuko } from "../hooks/use-add-dialog";
import { Button } from "@/components/ui/button";

export const AddRukoDialog = () => {
  const { isOpen, onOpen, onClose } = useAddRuko();

  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            <Button variant="destructive" onClick={onClose} className="mt-4">
              Close
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
