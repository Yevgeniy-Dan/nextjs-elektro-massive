"use client";

import React, { useState } from "react";
import { CREATE_SHOP_REVIEW, GET_SHOP_REVIEWS } from "./queries";
import {
  CreateShopReviewMutation,
  CreateShopReviewMutationVariables,
  GetShopReviewsQuery,
} from "@/gql/graphql";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "graphql-request";
import { AlertCircle } from "lucide-react";

const Reviews = () => {
  const queryClient = useQueryClient();
  const [mutationError, setMutationError] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery<GetShopReviewsQuery>({
    queryKey: ["shopReviews"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
        GET_SHOP_REVIEWS
      ),
  });

  const createReviewMutation = useMutation<
    CreateShopReviewMutation,
    Error,
    CreateShopReviewMutationVariables
  >({
    mutationFn: (variables) =>
      request(
        `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
        CREATE_SHOP_REVIEW,
        {
          input: { ...variables.input, publishedAt: new Date().toISOString() },
        }
      ),
    onSuccess: () => {
      console.log("Review created successfully!");
      queryClient.invalidateQueries({ queryKey: ["shopReviews"] });
    },
    onError: (error) => {
      setMutationError(
        "Ой! Щось пішло не так при створенні відгуку. Спробуйте ще раз!"
      );
    },
  });

  const handleSumbitReview = async (reviewData: any) => {
    await createReviewMutation.mutateAsync({
      input: reviewData,
    });
  };

  const PlaceHolderCard = () => (
    <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg"></div>
  );

  const placeholders = Array(6)
    .fill(null)
    .map((_, index) => <PlaceHolderCard key={`placehodler-${index}`} />);

  const ErrorMessage = ({ message }: { message: string }) => (
    <div
      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
      role="alert"
    >
      <div className="flex items-center">
        <AlertCircle className="mr-2" />
        <p>{message}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Відгуки клієнтів</h1>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <ReviewForm onSubmit={handleSumbitReview} />
      </div>
      {mutationError && <ErrorMessage message={mutationError} />}
      {isError && (
        <ErrorMessage message="Ой-ой! Наші відгуки вирішили влаштувати собі перерву на каву.    Скоро повернуться!" />
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-col-3 gap-6">
        {isLoading
          ? placeholders
          : data?.shopReviews?.data.map((review: any) => (
              <ReviewCard key={review.id} review={review} />
            ))}
      </div>
    </div>
  );
};

export default Reviews;
