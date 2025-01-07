"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

import useEmblaCarousel from "embla-carousel-react";

import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/graphql/queries/categories";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GetCategoriesQuery, GetCategoriesQueryVariables } from "@/gql/graphql";
import CategoryGridPlaceholder from "./CategoryGridPlaceholder";
import LocalizedLink from "../shared/LocalizedLink";

interface CategoryGridProps {
  lng: string;
}
type CategoryEntity = NonNullable<
  NonNullable<GetCategoriesQuery["categories"]>["data"][number]
>;

const CategoryCarousel = ({
  category,
  lng,
}: {
  category: CategoryEntity;
  lng: string;
}) => {
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

  return (
    <div key={category?.id} className="my-10">
      <div className="-ml-4 sm:-ml-8 md:-ml-12 lg:-ml-16 xl:ml-0 mb-10">
        <h2 className="bg-gradient-elektro-massive-horizontal text-white font-bold mb-2 pl-4 sm:pl-12 pr-28 py-5 rounded-r-3xl xl:rounded-full text-xl uppercase tracking-wide">
          {category.attributes?.name}
        </h2>
      </div>
      <div className="relative text-black">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {category.attributes?.subcategories?.data.map((subcategory) => (
              <LocalizedLink
                lng={lng}
                href={`/${category.attributes?.slug}/${subcategory.attributes?.slug}`}
                className="flex-shrink-0 w-48 md:w-64 flex flex-col items-center px-2 cursor-pointer"
                key={subcategory.id}
              >
                <div className="relative flex flex-col items-center justify-center">
                  <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full md:rounded-lg overflow-hidden">
                    {subcategory.attributes?.icon?.data?.attributes?.url && (
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_STRAPI_URL +
                          subcategory.attributes.icon.data.attributes.url
                        }
                        alt={`${subcategory.attributes?.title || "Category"} Image`}
                        fill
                        sizes="(max-width: 768px) 160px, 224px"
                        className="object-cover"
                        priority
                      />
                    )}
                  </div>
                  <div className="md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-y-1/2 md:-translate-x-1/2 static transform-none w-full md:w-[70%] text-center">
                    <p className="text-black md:text-white md:[text-shadow:1px_1px_0px_#000,-1px_1px_0px_#000,1px_-1px_0px_#000,-1px_-1px_0px_#000] text-base md:text-lg font-semibold mt-2 break-words">
                      {subcategory.attributes?.title || "Unnamed Category"}
                    </p>
                  </div>
                </div>
              </LocalizedLink>
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

const CategoryGrid: React.FC<CategoryGridProps> = ({ lng }) => {
  const { data, loading } = useQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >(GET_CATEGORIES, {
    variables: {
      locale: lng,
    },
  });

  if (loading) return <CategoryGridPlaceholder />;

  return (
    <div className=" text-white">
      {data?.categories?.data?.map((category) => (
        <CategoryCarousel key={category.id} category={category} lng={lng} />
      ))}
    </div>
  );
};
export default CategoryGrid;
