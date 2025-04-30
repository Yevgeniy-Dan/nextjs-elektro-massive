"use client";

import React, { useCallback, useEffect, useState } from "react";

import { BannerImage, BannersData } from "@/types/types";
import OptimizedImage from "../shared/OptimizedImage";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AWS_CDN_URL } from "@/app/utils/constants";
import { dynamicBlurDataUrl } from "@/app/utils/dynamicBlurDataUrl";

interface BannerProps {
  banners: BannersData;
}

interface BannerData {
  id: string;
  src: string;
  altText: string;
  blurDataUrl: string;
}

const Banner: React.FC<BannerProps> = ({ banners }) => {
  const [data, setData] = useState<BannerData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = banners
        .map(async (banner) => {
          if (!banner.attributes?.image?.data?.attributes) return null;
          const img = await getResponsiveImage(banner.attributes.image);

          return {
            id: banner.id,
            src: img.src,
            blurDataUrl: img.blurDataUrl,
            altText: banner.attributes?.altText || "",
          };
        })
        .filter(Boolean);

      return Promise.all(data);
    };

    fetchData().then((result) => {
      setData(result.filter((item): item is BannerData => item !== null));
      setIsLoading(false);
    });
  }, [banners]);

  const getResponsiveImage = async (
    image: BannerImage
  ): Promise<{
    src: string;
    blurDataUrl: string;
  }> => {
    const original = image.data?.attributes?.url;

    const getAWSPath = (url: string) => {
      const match = url.match(/\/uploads\/(.+)$/);

      return match?.[1]
        ? `strapi-uploads/${match[1]}`
        : `strapi-uploads/${url}`;
    };

    const getFullUrl = (url: string) => `${AWS_CDN_URL}${getAWSPath(url)}`;

    const src = getFullUrl(original || "");

    return {
      src,
      blurDataUrl: await dynamicBlurDataUrl(src),
    };
  };

  if (isLoading)
    return (
      <div className="relative w-full py-2">
        <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gray-100 animate-pulse rounded-md"></div>
      </div>
    );

  if (!data || data.length === 0) return null;

  return (
    <div className="relative w-full py-2">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {data.map((banner) => {
            return (
              <div
                key={banner.id}
                className="flex-[0_0_100%] min-w-0 relative aspect-[21/9]"
              >
                <OptimizedImage
                  src={banner.src}
                  alt={banner.altText}
                  fill
                  placeholder="blur"
                  blurDataURL={banner.blurDataUrl}
                  sizes="100vw"
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
