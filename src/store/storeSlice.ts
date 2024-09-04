import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clear } from "console";
import Cookies from "js-cookie";

const CART_COOKIE_NAME = "user_cart";

interface ICartItem {
  id: string;
  title: string;
  retail: number;
  quantity: number;
  image: string;
  discount: number;
}

interface ICartItemInput {
  id: string;
  title: string;
  retail: number;
  image: string;
  discount: number;
}

interface StoreState {
  isModalOpen: boolean;
  cartItems: ICartItem[];
}

const initialState: StoreState = {
  isModalOpen: false,
  cartItems: [],
};

const loadCartFromCookie = () => {
  const savedCart = Cookies.get(CART_COOKIE_NAME);

  return savedCart ? JSON.parse(savedCart) : [];
};

const saveCartToCookie = (cartItems: ICartItem[]) => {
  Cookies.set(CART_COOKIE_NAME, JSON.stringify(cartItems), { expires: 7 });
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
    initializeCart: (state) => {
      state.cartItems = loadCartFromCookie();
    },
    addToCart: (state, action: PayloadAction<ICartItemInput>) => {
      const existingItemIndex = state.cartItems.findIndex(
        (i) => i.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      saveCartToCookie(state.cartItems);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
        saveCartToCookie(state.cartItems);
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      saveCartToCookie(state.cartItems);
    },
  },
});

export const {
  openModal,
  closeModal,
  initializeCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = storeSlice.actions;

export default storeSlice.reducer;
