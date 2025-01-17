"use client";

import { ProductData } from "@/types/types";
import React from "react";
import { GET_PRODUCT_BY_SLUG } from "@/graphql/queries/product";
import ProductDetails from "@/components/product/ProductDetails";
import CenteredSpinner from "@/components/shared/CenteredSpinner";
import {
  GetProductBySlugQuery,
  GetProductBySlugQueryVariables,
} from "@/gql/graphql";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { useLangMatches } from "@/hooks/useLangMatches";

interface ProductPageProps {
  params: {
    category: string;
    subcategory: string;
    productType: string;
    product: string;
    lng: string;
  };
  initialData: ProductData;
}

function ProductContainer({
  product,
  productTypeSlug,
  categorySlug,
  subcategorySlug,
}: {
  categorySlug: string;
  subcategorySlug: string;
  productTypeSlug: string;
  product: ProductData;
  lng: string;
}) {
  if (!product || !product.attributes || !product.id) {
    return <div>Product not found.</div>;
  }

  return (
    <ProductDetails
      product={product.attributes}
      id={product.id}
      productTypeId={
        product.attributes.product_types?.data.find(
          (type) => type.attributes?.slug === productTypeSlug
        )?.id || ""
      }
      productTypeSlug={productTypeSlug}
      productTypeTitle={
        product?.attributes?.product_types?.data.find(
          (type) => type.attributes?.slug === productTypeSlug
        )?.attributes?.title || ""
      }
      subcategorySlug={subcategorySlug || ""}
      subcategoryTitle={
        product?.attributes?.subcategory?.data?.attributes?.title || ""
      }
      categoryTitle={
        product.attributes?.subcategory?.data?.attributes?.categories?.data.find(
          (category) => category.attributes?.slug === categorySlug
        )?.attributes?.name || ""
      }
      categorySlug={categorySlug}
    />
  );
}

const ProductPageClient: React.FC<ProductPageProps> = ({
  params,
  initialData,
}) => {
  const { category: categorySlug } = params;

  const {
    data: productData,
    isLoading: isProductLoading,
    error: productError,
  } = useQuery<GetProductBySlugQuery, GetProductBySlugQueryVariables>({
    queryKey: ["product", params.product, params.productType, params.lng],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
        GET_PRODUCT_BY_SLUG,
        {
          productSlug: params.product,
          productTypeSlug: params.productType,
          locale: params.lng,
        }
      ),
    initialData: {
      products: {
        data: [initialData],
      },
    },
  });

  useLangMatches({
    data: productData?.products?.data,
    type: "product",
  });

  if (isProductLoading) {
    return <CenteredSpinner />;
  }

  if (productError) {
    return <div>Error loading product. Please try again later.</div>;
  }

  const product = productData.products?.data[0] as ProductData;

  return (
    <ProductContainer
      categorySlug={categorySlug}
      subcategorySlug={params.subcategory}
      product={product}
      productTypeSlug={params.productType}
      lng={params.lng}
    />
  );
};

export default ProductPageClient;
