"use client";

import { IProductAttributes } from "@/types/types";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Heart,
  Share2,
  Truck,
  CreditCard,
  ChevronUp,
  ChevronDown,
  BarChart2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

const initialParamsCount = 5;

const ProductDetails: React.FC<{ product: IProductAttributes }> = ({
  product,
}) => {
  const [showAllParams, setShowAllParams] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    containScroll: false,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const toggleParams = () => {
    setShowAllParams(!showAllParams);
  };

  const {
    additional_images,
    currency,
    image_link,
    params,
    part_number,
    retail,
    title,
    description,
  } = product;

  const images = [{ id: "main", link: image_link }, ...additional_images];

  // const scrollPrev = useCallback(() => {
  //   if (emblaApi) emblaApi.scrollPrev();
  // }, [emblaApi]);

  // const scrollNext = useCallback(() => {
  //   if (emblaApi) emblaApi.scrollNext();
  // }, [emblaApi]);

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

  const paramsToShow = showAllParams
    ? Object.entries(params)
    : Object.entries(params).slice(0, initialParamsCount);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="border-2 rounded-xl">
            <div className="relative w-full aspect-square mb-4  flex items-center justify-center">
              <Image
                src={images[selectedIndex].link}
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
                        src={image.link}
                        alt={`Thumbnail ${image.id}`}
                        layout="intrinsic"
                        width={100}
                        height={100}
                        objectFit="contain"
                        // className={
                        //   index === selectedIndex
                        //     ? "border-2 border-red-800 rounded-xl"
                        //     : ""
                        // }
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

          <div className="flex items-center justify-center gap-4 my-3 border-b-2 border-gray-400">
            <p>Поділитися:</p>
            <div className="flex gap-3">
              <Image
                className="w-8 h-8"
                src="/telegram.png"
                alt="Telegram icon"
                width={36}
                height={36}
              />

              <Image
                className="w-8 h-8"
                src="/viber.png"
                alt="Viber icon"
                width={36}
                height={36}
              />

              <Image
                className="w-8 h-8"
                src="/instagram.png"
                alt="Instagram icon"
                width={36}
                height={36}
              />
            </div>
          </div>
        </div>

        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-2 border-b-2 md:border-0">
            {title}
          </h1>
          <div className="hidden md:block border-t-2 -ml-8 border-gray-300 mb-2"></div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-500">В наявності</span>
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-base mb-4">
            {paramsToShow.map(([key, value]) => (
              <div key={key} className="flex py-1 ">
                <span className="font-medium w-1/2">{key}:</span>
                <span className="ml-4">{value}</span>
              </div>
            ))}
            {Object.keys(params).length > initialParamsCount && (
              <button
                onClick={toggleParams}
                className="w-full mt-2 p-2 flex justify-center items-center border-t-2 border-t-black border-b-4 border-b-gray-400 font-semibold text-lg"
              >
                {showAllParams ? (
                  <>
                    Приховати
                    <ChevronUp size={24} className="ml-1" />
                  </>
                ) : (
                  <>
                    Показати ще
                    <ChevronDown size={24} className="ml-1" />
                  </>
                )}
              </button>
            )}
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-bold">
              {retail} {currency}
            </span>
            <div className="flex items-center gap-2">
              <button
                // onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border rounded"
              >
                -
              </button>
              {/* <span className="w-8 text-center">{quantity}</span> */}
              <span className="w-8 text-center">1</span>
              <button
                // onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>
          </div>
          <button className="w-full bg-gradient-elektro-massive-horizontal text-white py-2 rounded-xl mb-4">
            Купити
          </button>
          <div className="flex justify-between mb-4">
            <button className="flex items-center gap-2 text-gray-600">
              <Heart size={20} /> Додати в обране
            </button>

            <button className="flex items-center gap-2 text-gray-600">
              <BarChart2 size={20} />
              Додати в порівняння
            </button>
          </div>

          {/* Delivery and Payment Methods */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="p-3">
              <h3 className="font-bold flex items-center gap-2 mb-2">
                {/* <Truck size={20} /> */}
                Способи доставки:
              </h3>
              <ul className="text-sm">
                <li className="flex items-start gap-2">
                  <Image
                    src="/novaposhta.jpg"
                    width={24}
                    height={24}
                    alt="Nova Poshta"
                    className="w-5 h-5"
                  />
                  <div>
                    <span>Нова Пошта</span>
                    <span className="block">
                      Безкоштовна доставка від 3000 грн
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="p-3">
              <h3 className="font-bold flex items-center gap-2 mb-2">
                {/* <CreditCard size={20} /> */}
                Способи плати:
              </h3>
              <ul className="text-sm flex flex-row md:flex-col gap-2">
                <li className="flex items-center gap-2">
                  <Image
                    src="/mastercard.png"
                    width={48}
                    height={48}
                    alt="Visa"
                    className="w-8 h-5"
                  />
                  <div>
                    <span>
                      Оплата онлайн - Visa/MasterCard, Google Pay/Apple Pay
                    </span>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <Image
                    src="/mastercard.png"
                    width={48}
                    height={48}
                    alt="Visa"
                    className="w-8 h-5"
                  />
                  <div>
                    <span>Переказ на рахунок</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-4">
            <h2 className="font-bold mb-2">Опис:</h2>
            <ReactMarkdown className="text-sm">{description}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
