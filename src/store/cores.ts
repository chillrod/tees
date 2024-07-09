import { create } from "zustand";

interface Cor {
  id: string;
  cor: string;
}

interface TeeState {
  cores: Cor[];
  updateColors: (cor: Cor[]) => void;
}

export const coresStore = create<TeeState>((set) => ({
  cores: [],
  updateColors: (cores) => set({ cores: cores }),
}));
