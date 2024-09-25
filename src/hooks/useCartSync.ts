"use client";

import {
  getCartItemsFromCookie,
  clearCartFromCookie,
} from "@/app/utils/cartHeplers";
import { CartItem } from "@/gql/graphql";
import { ISyncCartMutationResponse } from "@/types/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export const SYNC_CART_MUTATION = `
  mutation SyncCart($input: SyncCartInput!) {
    syncCartBySingIn(input: $input) {
      cart {
        cart_items {
          id
          quantity
          product {
            id
            title
            retail
            currency
            discount
            image_link
            part_number
            params
          }
        }
      }
    }
  }
`;

const syncCart = async (
  cartItems: CartItem[]
): Promise<ISyncCartMutationResponse> => {
  const input = {
    products: cartItems.map((item: CartItem) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
  };

  return axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/graphql", {
    query: SYNC_CART_MUTATION,
    variables: { input },
  });
};

export const useSingInMergeCart = () => {
  const queryClient = useQueryClient();

  const { status } = useSession();
  const hasSynced = useRef(false);

  const mutation = useMutation({
    mutationFn: syncCart,
    onSuccess(data, variables, context) {
      clearCartFromCookie();
      const { syncCartBySingIn } = data.data.data;
      queryClient.setQueryData(["cart"], syncCartBySingIn.cart.cart_items);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (status === "authenticated" && !hasSynced.current) {
      const cartItems = getCartItemsFromCookie();

      mutation.mutate(cartItems);
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      hasSynced.current = true;
    }
  }, [status, mutation, queryClient]);

  return mutation;
};
