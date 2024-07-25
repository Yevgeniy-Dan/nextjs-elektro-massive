"use client";

import React from "react";
import Slider from "react-slick";
import TopCard from "./top-card";

import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";

const TopCardCarousel = () => {
  return (
    <div className="p-10">
      <Swiper
        slidesPerView={5}
        grid={{
          rows: 2,
          fill: "row",
        }}
        spaceBetween={30}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Navigation]}
        className="mySwiper "
        centeredSlidesBounds={true}
        breakpoints={{
          // when window width is >= 640px
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
            grid: {
              rows: 2,
            },
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
            grid: {
              rows: 2,
            },
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
            grid: {
              rows: 2,
            },
          },
          // when window width is >= 1024px
          1596: {
            slidesPerView: 5,
            spaceBetween: 40,
            grid: {
              rows: 2,
            },
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
