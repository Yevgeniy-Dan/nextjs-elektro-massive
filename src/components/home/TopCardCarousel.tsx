"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import TopCard from "./TopCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";

interface TopCardCarousel {
  title: string;
  rows?: number;
  productLabelPath?: string;
}

const TopCardCarousel: React.FC<TopCardCarousel> = ({
  title,
  rows = 2,
  productLabelPath,
}) => {
  const [allowSlideNext, setAllowSlideNext] = useState(true);

  return (
    <div className="mb-5">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Swiper
        slidesPerView="auto"
        grid={{
          rows,
          fill: "row",
        }}
        spaceBetween={4}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Navigation]}
        className="mySwiper"
        style={{
          paddingBottom: "1rem",
        }}
        centeredSlides={true}
        centeredSlidesBounds={true}
        allowSlideNext={allowSlideNext}
        onSlideChange={(swiper) => {
          const slideWidth = 256; // 64 * 4 (учитывая rem)
          const visibleWidth = swiper.width;
          const totalWidth = swiper.slides.length * slideWidth;
          const currentPosition = swiper.translate * -1;

          if (currentPosition + visibleWidth >= totalWidth) {
            swiper.setTranslate(-(totalWidth - visibleWidth));
            swiper.allowSlideNext = false;
          } else {
            swiper.allowSlideNext = true;
          }
        }}
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
        {Array.from({ length: 16 }, (_, index: number) => (
          <SwiperSlide key={index} className="!w-64">
            {/* <TopCard productLabelPath={productLabelPath} /> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopCardCarousel;
