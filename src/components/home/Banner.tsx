"use client";

import { useQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import { GET_BANNERS } from "./queries";
import { GetBannersQuery } from "@/gql/graphql";

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
          {banners.map((banner) => (
            <div key={banner.id} className="rounded-t-2xl overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${banner.attributes?.image?.data?.attributes?.url}`}
                alt={banner.attributes?.altText || ""}
                className="w-full h-[15rem] md:h-[30rem] object-cover pointer-events-none"
                width={1200}
                height={600}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
