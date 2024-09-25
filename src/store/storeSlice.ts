import { CartItem } from "@/gql/graphql";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const CART_COOKIE_NAME = "user_cart";

interface StoreState {
  isModalOpen: boolean;
  addedProduct: CartItem | null;
  cartItems: CartItem[];
}

const initialState: StoreState = {
  isModalOpen: false,
  addedProduct: null,
  cartItems: [],
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<CartItem | undefined>) => {
      state.isModalOpen = true;
      state.addedProduct = action.payload ?? null;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    clearAddedProduct: (state) => {
      state.addedProduct = null;
    },
  },
});

export const { openModal, closeModal, clearAddedProduct } = storeSlice.actions;

export default storeSlice.reducer;
