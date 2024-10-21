"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

import { useSnapCarousel } from "react-snap-carousel";
import useEmblaCarousel from "embla-carousel-react";

import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "./queries";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GetCategoriesQuery, GetCategoriesQueryVariables } from "@/gql/graphql";

interface CategoryGridProps {
  lng: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ lng }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
    align: "start",
  });

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

  const { data, loading } = useQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >(GET_CATEGORIES, {
    variables: {
      locale: lng,
    },
  });

  const PlaceHolderCard = () => (
    <div className="flex flex-col items-center px-2">
      <div className="relative flex flex-col items-center justify-center">
        <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full md:rounded-lg overflow-hidden bg-gray-200 animate-pulse"></div>
        <div className="static transform-none w-[50%] ">
          <div className="md:hidden h-6 bg-gray-200 animate-pulse mt-2"></div>
        </div>
      </div>
    </div>
  );

  const placeholders = Array(6)
    .fill(null)
    .map((_, index) => <PlaceHolderCard key={`placehodler-${index}`} />);

  return (
    <div className=" text-white my-10">
      <div className="-ml-4 sm:-ml-8 md:-ml-12 lg:-ml-16 xl:ml-0 mb-10">
        <h2 className="bg-gradient-elektro-massive-horizontal text-white  font-bold mb-2 pl-4 sm:pl-12 pr-28 py-5 rounded-r-3xl xl:rounded-full text-xl uppercase tracking-wide">
          Електротовари
        </h2>
      </div>
      <div className="relative">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {loading
              ? placeholders
              : data?.categories?.data?.map((category) => (
                  <div
                    className="flex flex-col items-center px-2 cursor-pointer"
                    key={category.id}
                  >
                    <div className="relative flex flex-col items-center justify-center">
                      <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full md:rounded-lg overflow-hidden">
                        {category.attributes?.image?.data?.attributes?.url && (
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_STRAPI_URL +
                              category.attributes.image.data.attributes.url
                            }
                            alt={`${
                              category.attributes?.name || "Category"
                            } Image`}
                            layout="fill"
                            objectFit="cover"
                          />
                        )}
                      </div>
                      <div className="md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-y-1/2 md:-translate-x-1/2 static transform-none w-full md:w-[70%] text-center">
                        <p className="text-black md:text-white md:[text-shadow:1px_1px_0px_#000,-1px_1px_0px_#000,1px_-1px_0px_#000,-1px_-1px_0px_#000] text-base md:text-lg font-semibold mt-2  break-words">
                          {category.attributes?.name || "Unnamed Category"}
                        </p>
                      </div>
                    </div>
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
export default CategoryGrid;
