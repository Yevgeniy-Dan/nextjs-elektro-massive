"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import TopCard from "./TopCard";
import useEmblaCarousel from "embla-carousel-react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { HomePageProductEntity } from "@/types/types";
import { useCookies } from "react-cookie";
import { fallbackLng, Language } from "@/app/i18n/settings";

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
  const [cookies] = useCookies(["i18next"]);
  const lng = (cookies.i18next || fallbackLng) as Language;

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

  const responsiveCardHeight = "h-80 lg:h-96";
  const responsiveCardWidth = "w-56 lg:w-64";

  const memoizedCards = useMemo(() => {
    if (isLoading) {
      return Array(6)
        .fill(null)
        .map((_, index) => (
          <div
            key={`placehodler-${index}`}
            className="flex flex-col items-center px-2"
          >
            <div
              className={`${responsiveCardWidth} ${responsiveCardHeight} p-1`}
            >
              <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          </div>
        ));
    }

    return products.map((card, index) => (
      <div
        key={card.id}
        className={`embla__slide flex-shrink-0 ${responsiveCardWidth} ${responsiveCardHeight} my-4 p-2 ${
          products && index === products.length - 1 ? "pl-4" : ""
        }`}
      >
        <TopCard
          lng={lng}
          id={card.id ?? ""}
          subcategoryId={card.attributes?.subcategory?.data?.id ?? ""}
          {...card.attributes}
          label={label}
          product={{
            id: card.id ?? "",
            currency: card.attributes?.currency ?? "",
            discount: card.attributes?.discount ?? 0,
            image_link: card.attributes?.image_link ?? "",
            retail: card.attributes?.retail ?? 0,
            title: card.attributes?.title ?? "",
            parameter_values: card.attributes?.parameter_values ?? { data: [] },
            part_number: card.attributes?.part_number ?? "",
            slug: card.attributes?.slug ?? "",
          }}
          productSlug={card.attributes?.slug ?? ""}
          categorySlug={
            card.attributes?.subcategory?.data?.attributes?.categories?.data[0]
              .attributes?.slug ?? ""
          }
          subcategorySlug={
            card.attributes?.subcategory?.data?.attributes?.slug ?? ""
          }
          productTypeSlug={
            card.attributes?.product_types?.data[0]?.attributes?.slug ?? ""
          }
          productTypeId={card.attributes?.product_types?.data[0]?.id ?? ""}
        />
      </div>
    ));
  }, [products, isLoading, lng, label]);

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="relative">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex mx-4">{memoizedCards}</div>
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
