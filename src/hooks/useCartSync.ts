"use client";

import { fallbackLng, Language } from "@/app/i18n/settings";
import {
  getCartItemsFromLocaleStorage,
  clearCartFromLocalStorage,
} from "@/app/utils/cartHeplers";
import {
  CartItem,
  SyncCartBySignInMutation,
  SyncCartBySignInMutationVariables,
} from "@/gql/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { SYNC_CART_MUTATION } from "@/graphql/queries/cart";
import request from "graphql-request";

const syncCart = async (
  cartItems: CartItem[],
  locale: Language
): Promise<SyncCartBySignInMutation> => {
  const input = {
    products: cartItems.map((item: CartItem) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
  };
  return request<SyncCartBySignInMutation, SyncCartBySignInMutationVariables>(
    process.env.NEXT_PUBLIC_API_URL + "/api/graphql",
    SYNC_CART_MUTATION,
    { input, locale }
  );
};

export const useSingInMergeCart = () => {
  const [cookies] = useCookies(["i18next"]);
  const currentLanguage = (cookies.i18next || fallbackLng) as Language;

  const queryClient = useQueryClient();

  const { status } = useSession();
  const hasSynced = useRef(false);

  const mutation = useMutation({
    mutationFn: (cartItems: CartItem[]) => syncCart(cartItems, currentLanguage),
    onSuccess(data, variables, context) {
      clearCartFromLocalStorage();
      const { syncCartBySingIn } = data;
      queryClient.setQueryData(["cart"], syncCartBySingIn?.cart.cart_items);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError(error, variables, context) {
      // toast.error(error.message);
    },
  });

  useEffect(() => {
    if (status === "authenticated" && !hasSynced.current) {
      const cartItems = getCartItemsFromLocaleStorage(currentLanguage);

      mutation.mutate(cartItems);
      hasSynced.current = true;
    }
  }, [status, mutation, currentLanguage]);

  return mutation;
};
