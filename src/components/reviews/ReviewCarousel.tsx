"use client";

import { useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { ChevronLeft, ChevronRight, PenTool } from "lucide-react";
import {
  GetShopReviewsQuery,
  GetShopReviewsQueryVariables,
} from "@/gql/graphql";
import ReviewCard from "./ReviewCard";
import { GET_SHOP_REVIEWS } from "@/graphql/queries/review";
import { useTranslation } from "@/app/i18n/client";
import LocalizedLink from "../shared/LocalizedLink";

interface ReviewCarouselProps {
  lng: string;
}

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({ lng }) => {
  const { t } = useTranslation(lng, "common");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
    align: "start",
  });

  const { data, loading, error } = useQuery<
    GetShopReviewsQuery,
    GetShopReviewsQueryVariables
  >(GET_SHOP_REVIEWS);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const reviews = data?.shopReviews?.data || [];

  const PlaceHolderCard = () => (
    <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-2">
      <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>
    </div>
  );

  const placeholders = Array(6)
    .fill(null)
    .map((_, index) => <PlaceHolderCard key={`placehodler-${index}`} />);

  return (
    <div className="relative w-full max-w-4xl mx-auto px-10">
      <h2 className="text-2xl uppercase font-bold mb-4 text-center">
        {t("reviews.title")}
      </h2>
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {loading && placeholders}
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="embla__slide flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-2"
              >
                <ReviewCard review={review} />
              </div>
            ))
          ) : (
            <div className="embla__slide flex-shrink-0 w-full p-2">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center justify-center h-40">
                <p className="text-lg font-semibold mb-4">
                  {t("reviews.leaveReviewFirst")}
                </p>
                <LocalizedLink
                  lng={lng}
                  href="/reviews"
                  className="bg-gradient-elektro-massive-horizontal text-white py-2 px-4 rounded-full flex items-center"
                >
                  <PenTool className="mr-2" size={18} />
                  {t("reviews.form.submitReview")}
                </LocalizedLink>
              </div>
            </div>
          )}
        </div>
        {reviews.length > 0 && (
          <div className="embla__slide flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-2">
            <LocalizedLink
              lng={lng}
              href="/reviews"
              className="bg-gradient-elektro-massive-horizontal text-white py-2 px-4 rounded-full flex items-center"
            >
              <PenTool className="mr-2" size={18} />
              {t("reviews.form.submitReview")}
            </LocalizedLink>
          </div>
        )}
      </div>
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default ReviewCarousel;
