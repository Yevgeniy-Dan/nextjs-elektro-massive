"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

import { useSnapCarousel } from "react-snap-carousel";
import useEmblaCarousel from "embla-carousel-react";

import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { Carousel, CarouselItem } from "../shared/Carousel";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";
import {
  IGetCategoriesResponse,
  IGetCategoriesVariables,
} from "@/types/categories";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "./queries";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    name: "Світлодіодне освітлення",
    image:
      "https://plus.unsplash.com/premium_photo-1661962222708-3260c908a41d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TEVEJTIwbGFtcHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Елекрофурнітура",
    image:
      "https://plus.unsplash.com/premium_photo-1661962222708-3260c908a41d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TEVEJTIwbGFtcHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Кабельна продукція",
    image:
      "https://plus.unsplash.com/premium_photo-1661962222708-3260c908a41d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TEVEJTIwbGFtcHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Розетки та вимикачі",
    image:
      "https://plus.unsplash.com/premium_photo-1661962222708-3260c908a41d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TEVEJTIwbGFtcHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Автоматика",
    image:
      "https://plus.unsplash.com/premium_photo-1661962222708-3260c908a41d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TEVEJTIwbGFtcHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Лампи",
    image:
      "https://plus.unsplash.com/premium_photo-1661962222708-3260c908a41d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TEVEJTIwbGFtcHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Інструменти",
    image:
      "https://plus.unsplash.com/premium_photo-1661962222708-3260c908a41d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TEVEJTIwbGFtcHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Щити та шафи",
    image:
      "https://plus.unsplash.com/premium_photo-1661962222708-3260c908a41d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TEVEJTIwbGFtcHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Щити та шафи",
    image:
      "https://plus.unsplash.com/premium_photo-1661962222708-3260c908a41d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TEVEJTIwbGFtcHN8ZW58MHx8MHx8fDA%3D",
  },
];

const CategoryGrid = () => {
  const { scrollRef, next, prev, activePageIndex } = useSnapCarousel();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [allowSlideNext, setAllowSlideNext] = useState(true);

  useEffect(() => {
    setCurrentIndex(activePageIndex);
  }, [activePageIndex]);

  //TODO:
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

  const { data, loading, error } = useQuery<
    IGetCategoriesResponse,
    IGetCategoriesVariables
  >(GET_CATEGORIES);

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
              : data?.categories.data.map((category) => (
                  <div
                    className="flex flex-col items-center px-2"
                    key={category.id}
                  >
                    <div className="relative flex flex-col items-center justify-center">
                      <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full md:rounded-lg overflow-hidden">
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_STRAPI_URL +
                            category.attributes.image.data.attributes.url
                          }
                          alt={`${category.attributes.name} Image`}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-y-1/2 md:-translate-x-1/2 static transform-none w-[50%] md:w-[70%]">
                        <p className="text-black text-center text-base md:text-lg md:text-white font-semibold mt-2 break-words">
                          {category.attributes.name}
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
      {/* <div className="relative py-4">
        <Swiper
          slidesPerView="auto"
          grid={{
            rows: 1,
            fill: "row",
          }}
          spaceBetween={4}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Grid, Navigation]}
          className="swiper-category-grid "
          style={{
            paddingBottom: "1rem",
          }}
          centeredSlides={true}
          centeredSlidesBounds={true}
          allowSlideNext={allowSlideNext}
          // onSlideChange={(swiper) => {
          //   const slideWidth = 256; // 64 * 4 (учитывая rem)
          //   const visibleWidth = swiper.width;
          //   const totalWidth = swiper.slides.length * slideWidth;
          //   const currentPosition = swiper.translate * -1;

          //   if (currentPosition + visibleWidth >= totalWidth) {
          //     swiper.setTranslate(-(totalWidth - visibleWidth));
          //     swiper.allowSlideNext = false;
          //   } else {
          //     swiper.allowSlideNext = true;
          //   }
          // }}
          breakpoints={{
            // when window width is >= 640px
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 2,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 3,
            },
            1236: {
              slidesPerView: 4,
            },
            1536: {
              slidesPerView: 5,
            },
            // when window width is >= 2048px
            2048: {
              slidesPerView: 6,
            },
            2536: {
              slidesPerView: 7,
            },
          }}
        >
          {categories.map((item, index) => (
            // className="!w-56 md:!w-72"
            <SwiperSlide key={index} className="!w-56 md:!w-72">
              <div className="flex flex-col items-center">
                <div className="relative flex flex-col items-center justify-center">
                  <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full md:rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-y-1/2 md:-translate-x-1/2 static transform-none w-[50%] md:w-[70%]">
                    <p className=" text-black text-center text-base md:text-lg md:text-white font-semibold mt-2 break-words">
                      {item.name}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
      </div> */}
    </div>
  );
};

export default CategoryGrid;
