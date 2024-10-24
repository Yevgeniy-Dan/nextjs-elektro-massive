"use client";

import React, { useState } from "react";
import { CREATE_SHOP_REVIEW, GET_SHOP_REVIEWS } from "@/graphql/queries/review";
import {
  CreateShopReviewMutation,
  CreateShopReviewMutationVariables,
  GetShopReviewsQuery,
} from "@/gql/graphql";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "graphql-request";
import ErrorMessage from "../shared/ErrorMessage";
import { useTranslation } from "@/app/i18n/client";

interface ReviewProps {
  lng: string;
}

const Reviews: React.FC<ReviewProps> = ({ lng }) => {
  const { t } = useTranslation(lng, "common");
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t("reviews.form.title")}</h1>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <ReviewForm onSubmit={handleSumbitReview} lng={lng} />
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
