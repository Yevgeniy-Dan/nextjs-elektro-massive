"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";

import CategoryListingClient from "@/components/category/CategoryListingClient";
import { GET_CATEGORY_BY_SLUG } from "@/graphql/queries/categories";
import {
  GetCategoryBySlugQuery,
  GetCategoryBySlugQueryVariables,
} from "@/gql/graphql";
import { CategoryData } from "@/types/types";
import { useLangMatches } from "@/hooks/useLangMatches";
import { AvailableLanguages } from "@/components/shared/LanguageToggler";

interface CategoryPageClientProps {
  params: {
    category: string;
    lng: string;
  };
  initialData: CategoryData;
  fullTranslatedPath: Record<AvailableLanguages, string>;
}

const CategoryPageClient: React.FC<CategoryPageClientProps> = ({
  params,
  initialData,
  fullTranslatedPath,
}) => {
  const { category: categorySlug, lng } = params;

  useLangMatches(fullTranslatedPath);

  const {
    data: categoryData,
    isLoading,
    error,
  } = useQuery<GetCategoryBySlugQuery, GetCategoryBySlugQueryVariables>({
    queryKey: ["category", categorySlug, lng],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
        GET_CATEGORY_BY_SLUG,
        {
          slug: categorySlug,
          locale: lng,
        }
      ),
    initialData: {
      categories: {
        data: [initialData],
      },
    },
  });

  useEffect(() => {
    if (categoryData && !isLoading && !error) {
      window.gtag("event", "view_item_list", {
        item_list_name: "Subcategory",
        item_list_id: categoryData.categories?.data[0].id,
        item_list_category: categoryData.categories?.data[0].attributes?.slug,
        items:
          categoryData.categories?.data[0].attributes?.subcategories?.data.map(
            (subcategory) => ({
              item_id: subcategory.id,
              item_name: subcategory.attributes?.title,
              item_category: subcategory.attributes?.slug,
            })
          ) || [],
      });
    }
  }, [categoryData, isLoading, error]);

  if (isLoading) {
    return (
      <CategoryListingClient
        categoryId=""
        categorySlug={categorySlug}
        categoryTitle="Loading..."
        lng={lng}
        subcategories={[]}
        isLoading={true}
      />
    );
  }

  if (error) {
    return <div>Error loading category. Please try again later.</div>;
  }

  const category = categoryData?.categories?.data[0];

  return (
    <>
      <CategoryListingClient
        categoryId={category?.id || ""}
        categorySlug={categorySlug}
        categoryTitle={category?.attributes?.name || ""}
        lng={lng}
        subcategories={category?.attributes?.subcategories?.data || []}
        isLoading={false}
      />
    </>
  );
};

export default CategoryPageClient;
