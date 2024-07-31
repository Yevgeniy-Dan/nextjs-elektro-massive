"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { useSnapCarousel } from "react-snap-carousel";

import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

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
];

const CategoryGrid = () => {
  const { scrollRef, next, prev, activePageIndex } = useSnapCarousel();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(activePageIndex);
  }, [activePageIndex]);

  return (
    <div className=" text-white my-10">
      <div className="xl:ml-0 -ml-16 mb-10">
        <h2 className="bg-gradient-elektro-massive text-white  font-bold mb-2 px-28 py-5 rounded-r-3xl xl:rounded-full   text-2xl">
          Електротовари
        </h2>
      </div>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden snap-x snap-mandatory"
        >
          {categories.map((category, index) => (
            <div key={index} className="flex-shrink-0  mx-2 snap-start">
              <div className="flex flex-col items-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <p className="text-black text-center text-md font-semibold mt-2">
                  {category.name}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* <button
          onClick={() => prev()}
          className="absolute left-0 top-1/2 transform -translate-y-1/2  text-black p-2 rounded-full"
        >
          <FaChevronLeft className="text-[#990000] text-5xl stroke-none" />
        </button>
        <button
          onClick={() => next()}
          className="absolute right-0 top-1/2 transform -translate-y-1/2  text-black p-2 rounded-full"
        >
          <FaChevronRight className="text-[#990000] text-5xl stroke-none" />
        </button> */}
        {currentIndex > 0 && (
          <button
            onClick={() => prev()}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-black p-2 rounded-full"
          >
            <FaChevronLeft className="text-[#990000] text-5xl" />
          </button>
        )}
        {currentIndex < categories.length - 1 && (
          <button
            onClick={() => next()}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-black p-2 rounded-full"
          >
            <FaChevronRight className="text-[#990000] text-5xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryGrid;
