import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CartItemType } from "@/types/types";

interface CartItemsCarouselProps {
  cartItems: CartItemType[];
}

const CartItemsCarousel: React.FC<CartItemsCarouselProps> = ({ cartItems }) => {
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
    (e: React.MouseEvent) => {
      e.stopPropagation();
      emblaApi && emblaApi.scrollPrev();
    },
    [emblaApi]
  );
  const scrollNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      emblaApi && emblaApi.scrollNext();
    },
    [emblaApi]
  );

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-72 mr-4 border border-gray-300 rounded-md  p-4"
            >
              <div className="flex items-center">
                <Image
                  src={item?.product?.image_link ?? ""}
                  alt={item?.product?.title ?? ""}
                  width={60}
                  height={60}
                  className="rounded-md mr-2"
                />
                <div className="flex-grow min-w-0 flex flex-col justify-center">
                  <p className="text-sm font-medium truncate m-0">
                    {item.product.title}
                  </p>

                  <p className="text-xs text-gray-500 m-0">
                    {item.quantity} шт
                  </p>
                  <p className="text-sm font-semibold m-0">
                    {(item.product.retail * item.quantity).toFixed(2)} грн
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {canScrollPrev && (
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-1"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      {canScrollNext && (
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-1"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default CartItemsCarousel;
