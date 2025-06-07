import { Row } from "@tanstack/react-table";
import { create } from "zustand";

type SendWAState<T = any> = {
  isOpen: boolean;
  selectedRows: Row<T>[];
  onOpen: (rows: Row<T>[]) => void;
  onClose: () => void;
};

export const useSendWAStateModal = create<SendWAState>((set) => ({
  isOpen: false,
  selectedRows: [],
  onOpen: (rows) => set({ isOpen: true, selectedRows: rows }),
  onClose: () => set({ isOpen: false, selectedRows: [] }),
}));
