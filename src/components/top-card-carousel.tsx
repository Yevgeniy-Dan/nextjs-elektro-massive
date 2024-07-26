"use client";

import React from "react";
import Slider from "react-slick";
import TopCard from "./top-card";

import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";

interface TopCardCarousel {
  title: string;
  rows?: number;
}

const TopCardCarousel: React.FC<TopCardCarousel> = ({ title, rows = 2 }) => {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Swiper
        slidesPerView={5}
        grid={{
          rows,
          fill: "row",
        }}
        spaceBetween={0}
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
        breakpoints={{
          // when window width is >= 640px
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 4,
          },
          1236: {
            slidesPerView: 5,
          },
          1536: {
            slidesPerView: 6,
          },
          // when window width is >= 2048px
          2048: {
            slidesPerView: 8,
          },
          2536: {
            slidesPerView: 10,
          },
        }}
      >
        {Array.from({ length: 16 }, (_, index: number) => (
          <SwiperSlide key={index}>
            <TopCard />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopCardCarousel;
