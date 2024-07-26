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
    <div className="my-5">
      <h2 className="px-10 text-2xl font-medium">{title}</h2>
      <Swiper
        slidesPerView={5}
        grid={{
          rows,
          fill: "row",
        }}
        spaceBetween={1}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Navigation]}
        className="mySwiper"
        style={{
          padding: "1rem",
        }}
        centeredSlidesBounds={true}
        breakpoints={{
          // when window width is >= 640px
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 3,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 4,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {Array.from({ length: 16 }, (_, index: number) => (
          <SwiperSlide
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TopCard />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopCardCarousel;
