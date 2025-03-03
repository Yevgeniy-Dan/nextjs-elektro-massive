import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Language } from "@/app/i18n/settings";
import request from "graphql-request";
import {
  SyncCartBySignInMutation,
  SyncCartBySignInMutationVariables,
} from "@/gql/graphql";
import { SYNC_CART_MUTATION } from "@/graphql/queries/cart";

export type CartProductStore = { productId: string; quantity: number };

interface CartStoreState {
  productIds: CartProductStore[];
  syncCartWithServer: (locale: Language) => Promise<void>;
  addProduct: (productId: string, quantity: number) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
  getProductIds: () => string[];
  setProductIds: (productIds: CartProductStore[]) => void;
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      productIds: [],
      syncCartWithServer: async (locale) => {
        if (!get().productIds.length) return;
        await request<
          SyncCartBySignInMutation,
          SyncCartBySignInMutationVariables
        >(
          process.env.NEXT_PUBLIC_API_URL + "/api/graphql",
          SYNC_CART_MUTATION,
          { input: { products: get().productIds }, locale }
        );

        get().clearCart();
      },
      addProduct: (productId, quantity) => {
        const existing = get().productIds.find(
          (p) => p.productId === productId
        );

        set({
          productIds: existing
            ? get().productIds.map((p) =>
                p.productId === productId
                  ? { ...p, quantity: Math.max(1, p.quantity + quantity) }
                  : p
              )
            : [...get().productIds, { productId: productId, quantity }],
        });
      },
      removeProduct: (productId) => {
        set({
          productIds: get().productIds.filter((p) => p.productId !== productId),
        });
      },
      clearCart: () => {
        set({ productIds: [] });
      },
      getProductIds: () => get().productIds.map((p) => p.productId),
      setProductIds: (productIds: CartProductStore[]) => {
        set({ productIds });
      },
    }),
    { name: "cart-storage" }
  )
);
