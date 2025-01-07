"use client";

import { useQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import { GET_BANNERS } from "@/graphql/queries/common";
import { GetBannersQuery } from "@/gql/graphql";
import { BannerImage } from "@/types/types";

const BannerPlaceholder = () => (
  <div className="rounded-t-2xl overflow-hidden">
    <div className="w-full h-[15rem] md:h-[30rem] bg-gray-200 animate-pulse"></div>
  </div>
);

const Banner = () => {
  const { data, loading } = useQuery<GetBannersQuery>(GET_BANNERS);

  const banners = data?.banners?.data || [];
  const singleBanner = banners.length === 1;

  const settings = {
    dots: !singleBanner,
    infinite: !singleBanner,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const getResponsiveImage = (image: BannerImage) => {
    const formats = image?.data?.attributes?.formats;
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

    if (formats?.small?.width < 500) {
      return `${baseUrl}${formats.small.url}`;
    } else if (formats?.medium?.width < 750) {
      return `${baseUrl}${formats.medium.url}`;
    } else if (formats?.large?.width < 1000) {
      return `${baseUrl}${formats.large.url}`;
    }
    return `${baseUrl}${image.data?.attributes?.url}`;
  };

  if (loading) {
    return (
      <div className="relative py-2">
        <div className="rounded-t-2xl overflow-x-hidden pb-8">
          <Slider {...settings}>
            {[1, 2, 3].map((index) => (
              <BannerPlaceholder key={`placeholder-${index}`} />
            ))}
          </Slider>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-2">
      <div className="rounded-t-2xl overflow-x-hidden pb-8">
        <Slider {...settings}>
          {banners.map((banner) => {
            const image = banner.attributes?.image;
            if (!image?.data?.attributes) return null;

            return (
              <div key={banner.id} className="rounded-t-2xl overflow-hidden">
                <Image
                  src={getResponsiveImage(image)}
                  alt={banner.attributes?.altText || ""}
                  sizes="(max-width: 500px) 500px, (max-width: 750px) 750px, (max-width: 1000px) 1000px, 1280px"
                  className="w-full h-full object-contain"
                  width={Number(image.data.attributes.width)}
                  height={Number(image.data.attributes.height)}
                  priority
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
