"use client";

import { useQuery } from "@apollo/client";
import React from "react";
import { GET_HOME_PAGE_PRODUCTS } from "@/graphql/queries/products";
import {
  GetHomePageProductsQuery,
  GetHomePageProductsQueryVariables,
} from "@/gql/graphql";
import TopCardCarousel from "./TopCardCarousel";
import { useTranslation } from "@/app/i18n/client";

interface HomePageProductsSectionProps {
  lng: string;
}

const HomePageProductsSection: React.FC<HomePageProductsSectionProps> = ({
  lng,
}) => {
  const { t } = useTranslation(lng, "common");

  const { data, loading } = useQuery<
    GetHomePageProductsQuery,
    GetHomePageProductsQueryVariables
  >(GET_HOME_PAGE_PRODUCTS, {
    variables: { limit: 20, locale: lng },
  });

  return (
    <>
      <TopCardCarousel
        title={`${t("home.sections.top")}`}
        label="top"
        products={data?.topProducts?.data || []}
        isLoading={loading}
      />
      <TopCardCarousel
        title={`${t("home.sections.sale")}`}
        label="sale"
        products={data?.saleProducts?.data || []}
        isLoading={loading}
      />
      <TopCardCarousel
        title={`${t("home.sections.new")}`}
        label="new"
        products={data?.newProducts?.data || []}
        isLoading={loading}
      />
    </>
  );
};

export default HomePageProductsSection;
