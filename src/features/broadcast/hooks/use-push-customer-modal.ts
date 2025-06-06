"use client";

import { useQueryState, parseAsBoolean } from "nuqs";

export const useBroadcastCustomerModal = () => {
  const [isOpen, setIsOpen] = useQueryState("broadcast-customer", parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }));

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};
