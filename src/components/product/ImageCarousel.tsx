import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ComponentImagesImages } from "@/gql/graphql";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface ImageCarouselProps {
  images: ComponentImagesImages[];
  title: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, title }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    containScroll: false,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = (index: number) => {
    setIsOpen(true);
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      const prevIndex = emblaApi.selectedScrollSnap() - 1;
      const lastIndex = emblaApi.scrollSnapList().length - 1;
      const targetIndex = prevIndex < 0 ? lastIndex : prevIndex;
      emblaApi.scrollTo(targetIndex);
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      const nextIndex = emblaApi.selectedScrollSnap() + 1;
      const lastIndex = emblaApi.scrollSnapList().length - 1;
      const targetIndex = nextIndex > lastIndex ? 0 : nextIndex;
      emblaApi.scrollTo(targetIndex);
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
        setSelectedIndex(index);
      }
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="border-2 rounded-xl">
      <div
        className="relative w-full aspect-square mb-4 flex items-center justify-center cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={images[selectedIndex].link ?? ""}
          alt={title}
          layout="intrinsic"
          width={500}
          height={500}
          objectFit="contain"
        />
      </div>
      <div className="relative px-8">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`embla__slide flex-shrink-0 w-24 h-24 mx-1 ${
                  index === selectedIndex ? "scale-110" : ""
                }`}
                onClick={() => scrollTo(index)}
              >
                <Image
                  src={image.link ?? ""}
                  alt={`Thumbnail ${image.id}`}
                  layout="intrinsic"
                  width={100}
                  height={100}
                  objectFit="contain"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-1"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-1"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={selectedIndex}
        slides={images.map((image) => ({
          src: image.link ?? "",
        }))}
        plugins={[Zoom]}
      />
    </div>
  );
};

export default ImageCarousel;
