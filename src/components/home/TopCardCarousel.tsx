"use client";

import React, { useCallback, useEffect, useState } from "react";
import TopCard from "./TopCard";
import useEmblaCarousel from "embla-carousel-react";

import { GET_PRODUCTS } from "../products/queries";
import { useQuery } from "@apollo/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GetHomePageProductsQuery, GetProductsQuery } from "@/gql/graphql";
import { HomePageProductEntity } from "@/types/types";

interface TopCardCarousel {
  isLoading: boolean;
  products: HomePageProductEntity[];
  title: string;
  label: "top" | "new" | "sale";
}

const TopCardCarousel: React.FC<TopCardCarousel> = ({
  isLoading,
  title,
  label,
  products,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
    align: "start",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const { data, loading, error } = useQuery<GetProductsQuery>(GET_PRODUCTS, {
    variables: {
      pageSize: 20,
    },
  });

  const responsiveCardHeight = "h-64 sm:h-72 md:h-80 lg:h-96";
  const responsiveCardWidth = "w-40 sm:w-48 md:w-56 lg:w-64";

  const PlaceHolderCard = () => (
    <div className="flex flex-col items-center px-2">
      <div className={`${responsiveCardWidth} ${responsiveCardHeight} p-1`}>
        <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    </div>
  );

  const placeholders = Array(6)
    .fill(null)
    .map((_, index) => <PlaceHolderCard key={`placehodler-${index}`} />);

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="relative">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex mx-4">
            {isLoading
              ? placeholders
              : products.map((card, index) => (
                  <div
                    key={card.id}
                    className={`embla__slide flex-shrink-0 ${responsiveCardWidth} ${responsiveCardHeight} my-4 p-2 ${
                      data?.products?.data &&
                      index === data.products.data.length - 1
                        ? "pl-4"
                        : ""
                    }`}
                  >
                    <TopCard
                      id={card.id ?? ""}
                      subcategoryId={
                        card.attributes?.subcategory?.data?.id ?? ""
                      }
                      {...card.attributes}
                      label={label}
                      product={{
                        id: card.id ?? "",
                        currency: card.attributes?.currency ?? "",
                        discount: card.attributes?.discount ?? 0,
                        image_link: card.attributes?.image_link ?? "",
                        retail: card.attributes?.retail ?? 0,
                        title: card.attributes?.title ?? "",
                        params: card.attributes?.params ?? [],
                        part_number: card.attributes?.part_number ?? "",
                        slug: card.attributes?.slug ?? "",
                      }}
                      productSlug={card.attributes?.slug ?? ""}
                      subcategorySlug={
                        card.attributes?.subcategory?.data?.attributes?.slug ??
                        ""
                      }
                      productTypeSlug={
                        card.attributes?.product_types?.data[0].attributes
                          ?.slug ?? ""
                      }
                    />
                  </div>
                ))}
          </div>
        </div>
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-1"
        >
          <ChevronLeft size={48} />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-1"
        >
          <ChevronRight size={48} />
        </button>
      </div>
    </div>
  );
};

export default TopCardCarousel;
