import useEmblaCarousel from "embla-carousel-react";
import OptimizedImage from "../shared/OptimizedImage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect } from "react";
import { ComponentImagesImages } from "@/gql/graphql";

interface CarouselProps {
  images: ComponentImagesImages[];
  title: string;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  onImageClick: () => void;
}

const Carousel = ({
  images,
  title,
  selectedIndex,
  setSelectedIndex,
  onImageClick,
}: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    containScroll: false,
    align: "center",
  });

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

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
        setSelectedIndex?.(index);
      }
    },
    [emblaApi, setSelectedIndex]
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
    <div>
      <div
        className="relative w-full aspect-square mb-4 flex items-center justify-center cursor-pointer"
        onClick={onImageClick}
      >
        {images.map((image, index) => (
          <OptimizedImage
            key={image.id}
            src={image.link ?? ""}
            alt={title}
            fill
            sizes="100%"
            priority={index === selectedIndex}
            className={`${index === selectedIndex ? "opacity-100" : "opacity-0"} object-contain   border-2 rounded-xl`}
          />
        ))}
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
                <OptimizedImage
                  src={image.link ?? ""}
                  alt={`Thumbnail ${image.id}`}
                  width={100}
                  height={100}
                  className="border-2 rounded-xl object-contain"
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
    </div>
  );
};

export default Carousel;
