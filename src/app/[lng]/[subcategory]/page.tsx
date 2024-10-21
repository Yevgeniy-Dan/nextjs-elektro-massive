"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { request } from "graphql-request";
import {
  GET_SUBCATEGORY_BY_SLUG,
  GET_SUBCATEGORY_TRANSLATED_SLUGS,
} from "@/components/product/queries";
import { lngCookieName, prevLngCookieName } from "@/app/i18n/settings";
import ProductListingClient from "@/components/products/ProductListingClient";
import CenteredSpinner from "@/components/shared/CenteredSpinner";
import {
  GetSubcategoryBySlugQuery,
  GetSubcategoryBySlugQueryVariables,
  GetSubcategoryTranslatedSlugsQuery,
  GetSubcategoryTranslatedSlugsQueryVariables,
} from "@/gql/graphql";

interface SubcategoryPageProps {
  params: {
    subcategory: string;
    lng: string;
  };
}

const SubcategoryPage: React.FC<SubcategoryPageProps> = ({ params }) => {
  const router = useRouter();
  const { subcategory: subcategorySlug, lng } = params;

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
  });

  const { refetch: refetchTranslatedSlugs } = useQuery<
    GetSubcategoryTranslatedSlugsQuery,
    GetSubcategoryTranslatedSlugsQueryVariables
  >({
    queryKey: ["translatedSlugsSubcategory", subcategorySlug, lng],
    queryFn: async ({ queryKey }) => {
      const [, currentSubcategorySlug, currentLocale] = queryKey;
      const prevLng = getCookie(prevLngCookieName) as string;
      return request(
        `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
        GET_SUBCATEGORY_TRANSLATED_SLUGS,
        {
          subcategorySlug: currentSubcategorySlug,
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
        const subcategory =
          translatedSlugsData?.subcategories?.data[0]?.attributes;

        if (subcategory) {
          const translatedSubcategorySlug =
            subcategory.localizations?.data[0]?.attributes?.slug;

          if (translatedSubcategorySlug) {
            const newPath = `/${currentLng}/${translatedSubcategorySlug}`;
            router.push(newPath);
          }
        }
      }
    };

    handleLanguageChange();
  }, [subcategorySlug, router, refetchTranslatedSlugs]);

  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <div>Error loading subcategory. Please try again later.</div>;
  }

  const subcategory = subcategoryData?.subcategories?.data[0];

  if (!subcategory || !subcategory.id) {
    //TODO: maybe should be Not Found
    return <CenteredSpinner />;
  }

  return (
    <ProductListingClient
      subcategoryId={subcategory.id}
      subcategorySlug={subcategorySlug}
      subcategoryTitle={subcategory.attributes?.title || ""}
      lng={lng}
    />
  );
};

export default SubcategoryPage;
