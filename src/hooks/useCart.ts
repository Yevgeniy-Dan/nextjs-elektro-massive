"use client";

import {
  // addItemToLocalStorage,
  clearCartFromLocalStorage,
  getCartItemsFromLocaleStorage,
  removeCartItemFromLocalStorage,
  updateCartItemInLocalStorage,
} from "@/app/utils/cartHeplers";
import {
  CLEAR_CART_MUTATION,
  GET_AUTH_USER_CART_QUERY,
  REMOVE_FROM_CART_MUTATION,
  UPDATE_CART_ITEM_MUTATION,
} from "@/components/cart/queries";
import {
  CartInput,
  CartItem,
  GetUserCartQuery,
  MutationAddToCartArgs,
  MutationRemoveFromCartArgs,
  MutationUpdateCartArgs,
  RemoveFromCartInput,
  UpdateCartItemInput,
  UpdateCartItemMutation,
  UpdateCartItemMutationVariables,
} from "@/gql/graphql";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openSignInModal } from "@/store/signInModalSlice";
import { closeModal } from "@/store/storeSlice";
import { IGetUserCartResponse } from "@/types/cart";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "graphql-request";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { queryClient } from "../../lib/queryClient";
import axios from "axios";

export const useCart = () => {
  const { isModalOpen } = useAppSelector((state) => state.store);
  const dispatch = useAppDispatch();
  const { status } = useSession();
  const router = useRouter();

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      if (status === "authenticated") {
        const response = await request<GetUserCartQuery>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
          GET_AUTH_USER_CART_QUERY
        );

        return response.userCart?.cart.cart_items;
      } else {
        return getCartItemsFromLocaleStorage();
      }
    },
    refetchOnMount: "always",
  });

  const updateCartItemMutation = useMutation<
    CartItem[],
    Error,
    { product: CartItem; qtyChange: number }
  >({
    mutationFn: async (variables) => {
      if (status === "authenticated") {
        const response = await request<
          UpdateCartItemMutation,
          UpdateCartItemMutationVariables
        >(
          `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
          UPDATE_CART_ITEM_MUTATION,
          {
            input: {
              productId: variables.product.product.id,
              qtyChange: variables.qtyChange,
            },
          }
        );

        return response.updateCartItem?.cart.cart_items || [];
      } else {
        return updateCartItemInLocalStorage(
          variables.product,
          variables.qtyChange
        );
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeFromCartMutation = useMutation<
    MutationRemoveFromCartArgs,
    Error,
    RemoveFromCartInput
  >({
    mutationFn: async (variables) => {
      if (status === "authenticated") {
        return request(
          `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
          REMOVE_FROM_CART_MUTATION,
          {
            input: { productId: variables.productId },
          }
        );
      } else {
        removeCartItemFromLocalStorage(variables.productId);

        return {
          input: {
            productId: variables.productId,
          },
        };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      if (status === "authenticated") {
        return request(
          `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
          CLEAR_CART_MUTATION
        );
      } else {
        clearCartFromLocalStorage();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleUpdateItem = (product: CartItem, increaseQtyBy: number) => {
    updateCartItemMutation.mutate({
      product: product,
      qtyChange: increaseQtyBy,
    });
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCartMutation.mutate({
      productId,
    });
  };

  const handleClearCart = async () => {
    clearCartMutation.mutate();
  };

  const handleConfirm = () => {
    if (status === "unauthenticated") {
      dispatch(openSignInModal("/checkout"));
    } else if (status === "authenticated") {
      router.push("/checkout");
    }
    dispatch(closeModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const calculateTotal = useMemo(() => {
    return cartItems?.reduce(
      (total, item) => total + (item?.product?.retail ?? 0) * item.quantity,
      0
    );
  }, [cartItems]);

  const calculateDiscountTotal = useMemo(() => {
    return cartItems?.reduce(
      (total, item) =>
        total +
        (((item?.product?.retail ?? 0) * (item?.product?.discount ?? 0)) /
          100) *
          item.quantity,
      0
    );
  }, [cartItems]);

  return {
    isModalOpen,
    cartItems,
    isLoading,
    handleUpdateItem,
    handleRemoveItem,
    handleClearCart,
    handleConfirm,
    handleCloseModal,
    calculateTotal,
    calculateDiscountTotal,
  };
};
