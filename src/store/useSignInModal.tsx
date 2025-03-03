import { create } from "zustand";

interface SignInModalState {
  isOpen: boolean;
  redirectUrl: string | null;
  openSignInModal: (redirectUrl: string) => void;
  closeSignInModal: () => void;
}

export const useSignInModal = create<SignInModalState>((set) => ({
  isOpen: false,
  redirectUrl: null,
  openSignInModal: (redirectUrl: string) => set({ isOpen: true, redirectUrl }),
  closeSignInModal: () => set({ isOpen: false, redirectUrl: null }),
}));
