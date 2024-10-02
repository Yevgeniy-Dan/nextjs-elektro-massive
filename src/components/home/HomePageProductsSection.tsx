"use client";

import { useQuery } from "@apollo/client";
import React from "react";
import { GET_HOME_PAGE_PRODUCTS } from "./queries";
import {
  GetHomePageProductsQuery,
  GetHomePageProductsQueryVariables,
} from "@/gql/graphql";
import TopCardCarousel from "./TopCardCarousel";

const HomePageProductsSection = () => {
  const { data, loading, error } = useQuery<
    GetHomePageProductsQuery,
    GetHomePageProductsQueryVariables
  >(GET_HOME_PAGE_PRODUCTS, {
    variables: { limit: 20 },
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
