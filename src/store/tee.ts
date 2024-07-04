import { create } from "zustand";

interface TeeState {
  tshirtColor: string;
  updateColor: (color: string) => void;
}

export const teeStore = create<TeeState>((set) => ({
  tshirtColor: "",

  updateColor: (color: string) => set({ tshirtColor: color }),
}));
