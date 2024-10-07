"use client";

import {
  ADD_TO_FAVORITES,
  GET_FAVORITE_PRODUCTS,
  REMOVE_FROM_FAVORITES,
} from "@/components/products/queries";
import {
  AddToFavoritesMutation,
  AddToFavoritesMutationVariables,
  GetUserFavoriteProductsQuery,
  RemoveFromFavoritesMutation,
  RemoveFromFavoritesMutationVariables,
} from "@/gql/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "graphql-request";

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const {
    data: favorites,
    isLoading,
    isError,
    error,
  } = useQuery<GetUserFavoriteProductsQuery>({
    queryKey: ["favorites"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
        GET_FAVORITE_PRODUCTS
      ),
  });

  const addToFavorites = useMutation<
    AddToFavoritesMutation,
    Error,
    AddToFavoritesMutationVariables
  >({
    mutationFn: async (variables) =>
      request(
        `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
        ADD_TO_FAVORITES,
        {
          input: {
            ...variables.input,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (error) => {
      console.error("Error adding to favorites:", error);
    },
  });

  const removeFromFavorites = useMutation<
    RemoveFromFavoritesMutation,
    Error,
    RemoveFromFavoritesMutationVariables
  >({
    mutationFn: async (variables) =>
      request(
        `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
        REMOVE_FROM_FAVORITES,
        {
          input: {
            ...variables.input,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const handleAddToFavorites = (productId: string, productTypeId: string) => {
    addToFavorites.mutate({
      input: {
        productId,
        productTypeId,
      },
    });
  };

  const handleRemoveFromFavorites = (productId: string) => {
    removeFromFavorites.mutate({
      input: {
        productId,
      },
    });
  };

  return {
    isLoading,
    isError,
    error,
    favorites: favorites?.userFavorites?.favoriteProducts ?? [],
    handleAddToFavorites,
    handleRemoveFromFavorites,
  };
};
