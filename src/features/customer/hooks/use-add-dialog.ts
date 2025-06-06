import { create } from "zustand";

type AddRukoState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useAddRuko = create<AddRukoState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
