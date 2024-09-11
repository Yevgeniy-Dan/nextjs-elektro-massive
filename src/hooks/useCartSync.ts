"use client";

import {
  getCartItemsFromCookie,
  clearCartFromCookie,
} from "@/app/utils/cartHeplers";
import { useAppDispatch } from "@/store/hooks";
import { ICartItem, ISyncCartMutationResponse } from "@/types/cart";
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
          }
        }
      }
    }
  }
`;

const syncCart = async (
  cartItems: ICartItem[]
): Promise<ISyncCartMutationResponse> => {
  const input = {
    products: cartItems.map((item: ICartItem) => ({
      id: item.id,
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
      toast.success("Cart synced successfully");
    },
    onError(error, variables, context) {
      console.log(error);
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (status === "authenticated" && !hasSynced.current) {
      const cartItems = getCartItemsFromCookie();
      if (cartItems.length > 0) {
        mutation.mutate(cartItems);
      } else {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      }
      hasSynced.current = true;
    }
  }, [status, mutation, queryClient]);

  return mutation;
};
