"use client";

import Image from "next/image";
import React from "react";
import Slider from "react-slick";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="relative py-2">
      <div className="rounded-t-2xl overflow-x-hidden pb-8">
        <Slider {...settings}>
          <div className="rounded-t-2xl overflow-hidden">
            <Image
              src="/carousel-1.png"
              alt="Carousel 1"
              className="w-full h-[30rem] object-cover pointer-events-none"
              width={1200}
              height={600}
            />
          </div>
          <div className="ounded-t-2xl overflow-hidden">
            <Image
              src="/carousel-2.png"
              alt="Carousel 2"
              className=" w-full h-[30rem]  object-cover pointer-events-none"
              width={1200}
              height={600}
            />
          </div>
          <div className="ounded-t-2xl overflow-hidden">
            <Image
              src="/carousel-3.png"
              alt="Carousel 3"
              className=" w-full h-[30rem]  object-cover pointer-events-none"
              width={1200}
              height={600}
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
