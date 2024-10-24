"use client";

import { useQuery } from "@apollo/client";
import React from "react";
import { GET_HOME_PAGE_PRODUCTS } from "@/graphql/queries/products";
import {
  GetHomePageProductsQuery,
  GetHomePageProductsQueryVariables,
} from "@/gql/graphql";
import TopCardCarousel from "./TopCardCarousel";

interface HomePageProductsSectionProps {
  lng: string;
}

const HomePageProductsSection: React.FC<HomePageProductsSectionProps> = ({
  lng,
}) => {
  const { data, loading } = useQuery<
    GetHomePageProductsQuery,
    GetHomePageProductsQueryVariables
  >(GET_HOME_PAGE_PRODUCTS, {
    variables: { limit: 20, locale: lng },
  });

  return (
    <>
      <TopCardCarousel
        title="Популярне"
        label="top"
        products={data?.topProducts?.data || []}
        isLoading={loading}
      />
      <TopCardCarousel
        title="Акції"
        label="sale"
        products={data?.saleProducts?.data || []}
        isLoading={loading}
      />
      <TopCardCarousel
        title="Гарячі новинки"
        label="new"
        products={data?.newProducts?.data || []}
        isLoading={loading}
      />
    </>
  );
};

export default HomePageProductsSection;
