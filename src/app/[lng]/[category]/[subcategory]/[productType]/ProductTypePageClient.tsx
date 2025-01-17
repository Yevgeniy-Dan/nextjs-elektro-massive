"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { GET_PRODUCT_TYPE_BY_SLUG } from "@/graphql/queries/productType";
import ProductListingClient from "@/components/products/ProductListingClient";
import CenteredSpinner from "@/components/shared/CenteredSpinner";
import { GET_SUBCATEGORY_BY_SLUG } from "@/graphql/queries/subcategory";
import {
  GetProductTypeBySlugQuery,
  GetProductTypeBySlugQueryVariables,
  GetSubcategoryBySlugQuery,
  GetSubcategoryBySlugQueryVariables,
} from "@/gql/graphql";
import { ProductTypeData, SubcategoryData } from "@/types/types";
import { useLangMatches } from "@/hooks/useLangMatches";

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

  useLangMatches({
    data: productTypeData?.productTypes?.data,
    type: "productType",
  });

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
