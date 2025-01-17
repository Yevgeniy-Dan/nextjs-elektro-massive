"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { GET_SUBCATEGORY_BY_SLUG } from "@/graphql/queries/subcategory";
import ProductListingClient from "@/components/products/ProductListingClient";
import CenteredSpinner from "@/components/shared/CenteredSpinner";
import {
  GetSubcategoryBySlugQuery,
  GetSubcategoryBySlugQueryVariables,
} from "@/gql/graphql";
import { SubcategoryData } from "@/types/types";
import { useLangMatches } from "@/hooks/useLangMatches";

interface SubcategoryPageProps {
  params: {
    category: string;
    subcategory: string;
    lng: string;
  };
  initialData: SubcategoryData;
}

const SubcategoryPageClient: React.FC<SubcategoryPageProps> = ({
  params,
  initialData,
}) => {
  const { subcategory: subcategorySlug, category: categorySlug, lng } = params;

  const {
    data: subcategoryData,
    isLoading,
    error,
  } = useQuery<GetSubcategoryBySlugQuery, GetSubcategoryBySlugQueryVariables>({
    queryKey: ["subcategory", subcategorySlug, lng],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
        GET_SUBCATEGORY_BY_SLUG,
        {
          slug: subcategorySlug,
          locale: lng,
        }
      ),
    initialData: {
      subcategories: {
        data: [initialData],
      },
    },
  });

  useLangMatches({
    data: subcategoryData?.subcategories?.data,
    type: "subcategory",
  });

  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <div>Error loading subcategory. Please try again later.</div>;
  }

  const subcategory = subcategoryData?.subcategories?.data[0];

  return (
    <ProductListingClient
      categoryTitle={
        subcategory?.attributes?.categories?.data[0]?.attributes?.name || ""
      }
      categorySlug={categorySlug}
      subcategoryId={subcategory?.id || ""}
      subcategorySlug={subcategorySlug}
      subcategoryTitle={subcategory?.attributes?.title || ""}
      subcategoryDescription={subcategory?.attributes?.description || ""}
      lng={lng}
    />
  );
};

export default SubcategoryPageClient;
