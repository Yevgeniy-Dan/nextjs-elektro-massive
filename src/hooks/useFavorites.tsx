"use client";

import {
  ADD_TO_FAVORITES,
  GET_FAVORITE_PRODUCTS,
  REMOVE_FROM_FAVORITES,
} from "@/graphql/queries/favorites";
import {
  AddToFavoritesMutation,
  AddToFavoritesMutationVariables,
  GetUserFavoriteProductsQuery,
  RemoveFromFavoritesMutation,
  RemoveFromFavoritesMutationVariables,
} from "@/gql/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "graphql-request";
import { useCookies } from "react-cookie";
import { useCallback, useMemo } from "react";

export const useFavorites = () => {
  const [cookies] = useCookies(["i18next"]);

  const queryClient = useQueryClient();

  const {
    data: favorites,
    isLoading,
    isError,
    error,
  } = useQuery<GetUserFavoriteProductsQuery>({
    queryKey: ["favorites", cookies.i18next],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
        GET_FAVORITE_PRODUCTS,
        {
          locale: cookies.i18next,
        }
      ),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const memoizedFavorites = useMemo(() => {
    return favorites?.userFavorites?.favoriteProducts ?? [];
  }, [favorites?.userFavorites?.favoriteProducts]);

  const totalCount = useMemo(() => {
    return memoizedFavorites.length;
  }, [memoizedFavorites]);

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
          locale: variables.locale,
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
          locale: variables.locale,
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const handleAddToFavorites = useCallback(
    (productId: string, productTypeId: string) => {
      addToFavorites.mutate({
        input: {
          productId,
          productTypeId,
        },
        locale: cookies.i18next,
      });
    },
    [addToFavorites, cookies.i18next]
  );

  const handleRemoveFromFavorites = useCallback(
    (productId: string) => {
      removeFromFavorites.mutate({
        input: {
          productId,
        },
        locale: cookies.i18next,
      });
    },
    [removeFromFavorites, cookies.i18next]
  );

  return {
    isLoading,
    isError,
    error,
    favorites: memoizedFavorites,
    totalCount,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  };
};
