"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { request } from "graphql-request";
import { GET_PRODUCT_TYPE_BY_SLUG } from "@/components/products/queries";
import { lngCookieName, prevLngCookieName } from "@/app/i18n/settings";
import ProductListingClient from "@/components/products/ProductListingClient";
import CenteredSpinner from "@/components/shared/CenteredSpinner";
import {
  GET_PRODUCT_TYPE_TRANSLATED_SLUGS,
  GET_SUBCATEGORY_BY_SLUG,
} from "@/components/product/queries";
import {
  GetProductBySlugQuery,
  GetProductBySlugQueryVariables,
  GetProductTypeBySlugQuery,
  GetProductTypeBySlugQueryVariables,
  GetSubcategoryBySlugQuery,
  GetSubcategoryBySlugQueryVariables,
  GetTranslatedSlugsProductTypeQuery,
  GetTranslatedSlugsProductTypeQueryVariables,
} from "@/gql/graphql";

interface ProductTypePageProps {
  params: {
    subcategory: string;
    productType: string;
    lng: string;
  };
}

const ProductTypePage: React.FC<ProductTypePageProps> = ({ params }) => {
  const router = useRouter();
  const {
    subcategory: subcategorySlug,
    productType: productTypeSlug,
    lng,
  } = params;

  const {
    data: productTypeData,
    isLoading: isProductTypeLoading,
    error: productTypeError,
  } = useQuery<GetProductTypeBySlugQuery, GetProductTypeBySlugQueryVariables>({
    queryKey: ["productType", productTypeSlug, lng],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
        GET_PRODUCT_TYPE_BY_SLUG,
        {
          slug: productTypeSlug,
          locale: lng,
        }
      ),
  });

  const {
    data: subcategoryData,
    isLoading: isSubcategoryLoading,
    error: subcategoryError,
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
    GetTranslatedSlugsProductTypeQuery,
    GetTranslatedSlugsProductTypeQueryVariables
  >({
    queryKey: ["translatedSlugsProductType", productTypeSlug, lng],
    queryFn: async ({ queryKey }) => {
      const [, currentProductTypeSlug, currentLocale] = queryKey;
      const prevLng = getCookie(prevLngCookieName) as string;
      return request(
        `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
        GET_PRODUCT_TYPE_TRANSLATED_SLUGS,
        {
          productTypeSlug: currentProductTypeSlug,
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
        const productType =
          translatedSlugsData?.productTypes?.data[0]?.attributes;

        if (productType) {
          const translatedProductTypeSlug =
            productType.localizations?.data[0]?.attributes?.slug;
          const translatedSubcategorySlug =
            productType.subcategories?.data[0]?.attributes?.localizations
              ?.data[0]?.attributes?.slug;

          if (translatedProductTypeSlug && translatedSubcategorySlug) {
            const newPath = `/${currentLng}/${translatedSubcategorySlug}/${translatedProductTypeSlug}`;
            router.push(newPath);
          }
        }
      }
    };

    handleLanguageChange();
  }, [productTypeSlug, router, refetchTranslatedSlugs]);

  if (isProductTypeLoading || isSubcategoryLoading) {
    return <CenteredSpinner />;
  }

  if (productTypeError || subcategoryError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  const productType = productTypeData?.productTypes?.data[0];
  const subcategory = subcategoryData?.subcategories?.data[0];

  if (!productType || !subcategory) {
    //TODO: maybe should be Not Found
    return <CenteredSpinner />;
  }

  return (
    <ProductListingClient
      subcategoryId={subcategory.id || ""}
      subcategoryTitle={subcategory.attributes?.title || ""}
      productTypeId={productType.id || ""}
      subcategorySlug={subcategorySlug}
      productTypeSlug={productTypeSlug}
      productTypeTitle={productType.attributes?.title}
      lng={lng}
    />
  );
};

export default ProductTypePage;
