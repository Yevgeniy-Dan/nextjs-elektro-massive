"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { request } from "graphql-request";

import { lngCookieName, prevLngCookieName } from "@/app/i18n/settings";

import CategoryListingClient from "@/components/category/CategoryListingClient";
import { GET_CATEGORY_TRANSLATED_SLUGS } from "@/graphql/queries/slugs";
import { GET_CATEGORY_BY_SLUG } from "@/graphql/queries/categories";
import {
  GetCategoryBySlugQuery,
  GetCategoryBySlugQueryVariables,
  GetCategoryTranslatedSlugsQuery,
  GetCategoryTranslatedSlugsQueryVariables,
} from "@/gql/graphql";
import { CategoryData } from "@/types/types";

interface CategoryPageClientProps {
  params: {
    category: string;
    lng: string;
  };
  initialData: CategoryData;
}

const CategoryPageClient: React.FC<CategoryPageClientProps> = ({
  params,
  initialData,
}) => {
  const router = useRouter();
  const { category: categorySlug, lng } = params;

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

  /* It's for refetching translated slugs */
  const { refetch: refetchTranslatedSlugs } = useQuery<
    GetCategoryTranslatedSlugsQuery,
    GetCategoryTranslatedSlugsQueryVariables
  >({
    queryKey: ["translatedSlugsCategory", categorySlug, lng],
    queryFn: async ({ queryKey }) => {
      const [, currentCategorySlug, currentLocale] = queryKey;
      const prevLng = getCookie(prevLngCookieName) as string;
      return request(
        `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
        GET_CATEGORY_TRANSLATED_SLUGS,
        {
          categorySlug: currentCategorySlug,
          currentLocale: prevLng,
          targetLocale: currentLocale,
        }
      );
    },
    enabled: false,
  });

  useEffect(() => {
    const handleLanguageChange = async () => {
      const currentLng = getCookie(lngCookieName);
      const prevLng = getCookie(prevLngCookieName);

      if (prevLng && currentLng && prevLng !== currentLng) {
        const { data: translatedSlugsData } = await refetchTranslatedSlugs();
        const category = translatedSlugsData?.categories?.data[0]?.attributes;

        if (category) {
          const translatedCategorySlug =
            category.localizations?.data[0]?.attributes?.slug;

          if (translatedCategorySlug) {
            const newPath = `/${currentLng}/${translatedCategorySlug}`;
            router.push(newPath);
          }
        }
      }
    };

    handleLanguageChange();
  }, [categorySlug, router, refetchTranslatedSlugs]);
  /* The end of refetching translated slugs */

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
