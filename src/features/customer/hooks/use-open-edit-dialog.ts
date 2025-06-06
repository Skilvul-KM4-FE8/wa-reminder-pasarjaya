import { create } from "zustand";

type EditRukoState = {
  id?: string;
  isOpen: boolean;
  onOpen: (id?: string) => void;
  onClose: () => void;
};

export const useOpenEditRuko = create<EditRukoState>((set) => ({
  isOpen: false,
  onOpen: (id?: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false }),
}));
