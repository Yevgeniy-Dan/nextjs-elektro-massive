"use client";

import React, { useCallback } from "react";

import { BannerImage, BannersData } from "@/types/types";
import OptimizedImage from "../shared/OptimizedImage";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BannerProps {
  banners: BannersData;
}

const Banner: React.FC<BannerProps> = ({ banners }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const getResponsiveImage = (image: BannerImage) => {
    const formats = image?.data?.attributes?.formats;
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

    if (formats?.small?.width < 500) {
      return `${baseUrl}${formats.small.url}`;
    } else if (formats?.medium?.width < 750) {
      return `${baseUrl}${formats.medium.url}`;
    } else if (formats?.large?.width < 1000) {
      return `${baseUrl}${formats.large.url}`;
    }
    return `${baseUrl}${image.data?.attributes?.url}`;
  };

  return (
    <div className="relative w-full py-2">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner) => {
            const image = banner.attributes?.image;
            if (!image?.data?.attributes) return null;

            return (
              <div
                key={banner.id}
                className="flex-[0_0_100%] min-w-0 relative aspect-[21/9]"
              >
                <OptimizedImage
                  src={getResponsiveImage(image)}
                  alt={banner.attributes?.altText || ""}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Banner;
