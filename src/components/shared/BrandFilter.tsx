import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BrandFilterProps {
  brands: any[];
  selectedBrand: string | null;
  onBrandSelect: (brandName: string) => void;
}

const BrandFilter: React.FC<BrandFilterProps> = ({
  brands,
  selectedBrand,
  onBrandSelect,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
    align: "start",
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  return (
    <div className="relative mb-6">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 space-x-4"
            >
              <button
                onClick={() => onBrandSelect(brand.attributes.title.trim())}
                className={`flex flex-col items-center justify-between p-2 rounded-md w-full h-full transition-all duration-100 hover:bg-gray-100 ${
                  selectedBrand?.toLowerCase() ===
                  brand.attributes.title.trim().toLowerCase()
                    ? "bg-gray-200"
                    : ""
                }`}
              >
                <div className="w-full aspect-[8/2] relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${brand.attributes.logo.data.attributes.url}`}
                    alt={brand.attributes.title}
                    fill
                    sizes="(max-width: 640px) 50vw, 
                       (max-width: 768px) 33.333vw,
                       (max-width: 1024px) 25vw,
                       (max-width: 1280px) 20vw,
                       16.666vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
      {canScrollPrev && (
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-1"
          aria-label="Scroll previous"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}
      {canScrollNext && (
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-1"
          aria-label="Scroll next"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}
    </div>
  );
};

export default BrandFilter;
