import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignInModalState {
  isOpen: boolean;
  redirectUrl: string | null;
}

const initialState: SignInModalState = {
  isOpen: false,
  redirectUrl: null,
};

export const signInModalSlice = createSlice({
  name: "signInModal",
  initialState,
  reducers: {
    openSignInModal: (state, action: PayloadAction<string | undefined>) => {
      state.isOpen = true;
      state.redirectUrl = action.payload || null;
    },
    closeSignInModal: (state) => {
      state.isOpen = false;
      state.redirectUrl = null;
    },
  },
});

export const { openSignInModal, closeSignInModal } = signInModalSlice.actions;

export default signInModalSlice.reducer;
