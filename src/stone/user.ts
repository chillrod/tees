import type { UserRecord } from "firebase-admin/auth";
import { create } from "zustand";

interface UserState {
  user: UserRecord | null;
  updateUser: (user: UserRecord) => void;
}

export const userStore = create<UserState>((set) => ({
  user: null,

  updateUser: (user: UserRecord) => set({ user }),
}));
