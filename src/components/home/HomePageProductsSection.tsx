"use client";

import React, { useEffect } from "react";
import { GetHomePageProductsQuery } from "@/gql/graphql";
import TopCardCarousel from "./TopCardCarousel";
import { useTranslation } from "@/app/i18n/client";

interface HomePageProductsSectionProps {
  lng: string;
  homePageProducts: GetHomePageProductsQuery | null;
}

const HomePageProductsSection: React.FC<HomePageProductsSectionProps> = ({
  lng,
  homePageProducts,
}) => {
  const { t } = useTranslation(lng, "common");

  const [isLoading] = React.useState(false);

  return (
    <>
      <TopCardCarousel
        title={`${t("home.sections.top")}`}
        label="top"
        products={homePageProducts?.topProducts?.data || []}
        isLoading={isLoading}
      />
      <TopCardCarousel
        title={`${t("home.sections.sale")}`}
        label="sale"
        products={homePageProducts?.saleProducts?.data || []}
        isLoading={isLoading}
      />
      <TopCardCarousel
        title={`${t("home.sections.new")}`}
        label="new"
        products={homePageProducts?.newProducts?.data || []}
        isLoading={isLoading}
      />
    </>
  );
};

export default HomePageProductsSection;
