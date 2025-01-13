"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { request } from "graphql-request";
import { GET_PRODUCT_TYPE_BY_SLUG } from "@/graphql/queries/productType";
import { lngCookieName, prevLngCookieName } from "@/app/i18n/settings";
import ProductListingClient from "@/components/products/ProductListingClient";
import CenteredSpinner from "@/components/shared/CenteredSpinner";
import { GET_PRODUCT_TYPE_TRANSLATED_SLUGS } from "@/graphql/queries/slugs";
import { GET_SUBCATEGORY_BY_SLUG } from "@/graphql/queries/subcategory";
import {
  GetProductTypeBySlugQuery,
  GetProductTypeBySlugQueryVariables,
  GetSubcategoryBySlugQuery,
  GetSubcategoryBySlugQueryVariables,
  GetTranslatedSlugsProductTypeQuery,
  GetTranslatedSlugsProductTypeQueryVariables,
} from "@/gql/graphql";
import { ProductTypeData, SubcategoryData } from "@/types/types";

interface ProductTypePageProps {
  params: {
    category: string;
    subcategory: string;
    productType: string;
    lng: string;
  };
  initialProductTypeData: ProductTypeData;
  initialSubcategoryData: SubcategoryData;
  total: number;
}

const ProductTypePageClient: React.FC<ProductTypePageProps> = ({
  params,
  initialProductTypeData,
  initialSubcategoryData,
  total,
}) => {
  const router = useRouter();
  const {
    subcategory: subcategorySlug,
    productType: productTypeSlug,
    category: categorySlug,
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
    initialData: {
      productTypes: {
        data: [initialProductTypeData],
        meta: {
          pagination: {
            total: total,
          },
        },
      },
    },
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
    initialData: {
      subcategories: {
        data: [initialSubcategoryData],
      },
    },
  });

  /* It's for getting translated slugs of product type */
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
          const subcategoryData =
            productType.subcategories?.data[0]?.attributes;

          if (subcategoryData) {
            const translatedSubcategorySlug =
              subcategoryData.localizations?.data[0]?.attributes?.slug;

            // Find the matching category by current slug first
            const categoryData = subcategoryData.categories?.data.find(
              (cat) => cat.attributes?.slug === categorySlug
            );

            // Then get its translation
            const translatedCategorySlug =
              categoryData?.attributes?.localizations?.data[0]?.attributes
                ?.slug;

            if (
              translatedProductTypeSlug &&
              translatedSubcategorySlug &&
              translatedCategorySlug
            ) {
              const newPath = `/${currentLng}/${translatedCategorySlug}/${translatedSubcategorySlug}/${translatedProductTypeSlug}`;
              router.push(newPath);
            }
          }
        }
      }
    };

    handleLanguageChange();
  }, [productTypeSlug, router, refetchTranslatedSlugs, categorySlug]);
  /* End of getting translated slugs of product type */

  if (isProductTypeLoading || isSubcategoryLoading) {
    return <CenteredSpinner />;
  }

  if (productTypeError || subcategoryError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  const productType = productTypeData?.productTypes?.data[0];
  const subcategory = subcategoryData?.subcategories?.data[0];

  return (
    <ProductListingClient
      categoryTitle={
        subcategory?.attributes?.categories?.data[0]?.attributes?.name || ""
      }
      categorySlug={categorySlug}
      subcategoryId={subcategory?.id || ""}
      subcategoryTitle={subcategory?.attributes?.title || ""}
      productTypeId={productType?.id || ""}
      subcategorySlug={subcategorySlug}
      productTypeSlug={productTypeSlug}
      productTypeTitle={productType?.attributes?.title}
      lng={lng}
    />
  );
};

export default ProductTypePageClient;
