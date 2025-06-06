"use client";

import { useBroadcastCustomerModal } from "../hooks/use-push-customer-modal";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const CreateCustomerModal = () => {
  const { isOpen, setIsOpen, close } = useBroadcastCustomerModal();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
