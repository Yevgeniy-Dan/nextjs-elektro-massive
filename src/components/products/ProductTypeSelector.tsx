import { ProductTypeBySlug } from "@/types/types";
import Image from "next/image";
import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductTypeSelectorProps {
  types: ProductTypeBySlug[];
  selectedTypeId: string | null;
  onTypeChange: (typeSlug: string) => void;
}

const ProductTypeSelector: React.FC<ProductTypeSelectorProps> = ({
  types,
  selectedTypeId,
  onTypeChange,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
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
    <div className="relative mb-6">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex items-end">
          {types.map((type, index) => (
            <div key={type.id} className="flex-shrink-0">
              <div className="flex items-end">
                {index > 0 && (
                  <div className="h-32 w-px bg-gray-300 mx-3"></div>
                )}
                <button
                  className={`flex flex-col items-center min-w-[80px] ${
                    selectedTypeId === type.id
                      ? "opacity-100"
                      : "opacity-50 hover:opacity-100"
                  }`}
                  onClick={() => onTypeChange(type?.attributes?.slug ?? "")}
                >
                  <div className="w-32 h-32 mb-2 relative">
                    {type?.attributes?.icon?.data?.attributes && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${type.attributes.icon.data.attributes.url}`}
                        alt={type.attributes.title}
                        fill
                        sizes="128px"
                        className="object-contain"
                        priority
                      />
                    )}
                  </div>
                  <span className="text-md text-center">
                    {type?.attributes?.title}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <>
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-1 shadow-lg"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-1 shadow-lg"
        >
          <ChevronRight size={24} />
        </button>
      </>
    </div>
  );
};

export default ProductTypeSelector;
