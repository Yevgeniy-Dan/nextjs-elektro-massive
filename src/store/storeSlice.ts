import { createSlice } from "@reduxjs/toolkit";

interface StoreState {
  isModalOpen: boolean;
}

const initialState: StoreState = {
  isModalOpen: false,
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = storeSlice.actions;

export default storeSlice.reducer;
