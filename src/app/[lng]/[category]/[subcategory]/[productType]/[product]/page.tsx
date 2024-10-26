"use client";

import { ProductData } from "@/types/types";
import React, { useEffect } from "react";
import { GET_PRODUCT_TRANSLATED_SLUGS } from "@/graphql/queries/slugs";
import { GET_PRODUCT_BY_SLUG } from "@/graphql/queries/product";
import ProductDetails from "@/components/product/ProductDetails";
import CenteredSpinner from "@/components/shared/CenteredSpinner";
import {
  GetProductBySlugQuery,
  GetProductBySlugQueryVariables,
  GetTranslatedSlugsQuery,
  GetTranslatedSlugsQueryVariables,
} from "@/gql/graphql";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { lngCookieName, prevLngCookieName } from "@/app/i18n/settings";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

interface ProductPageProps {
  params: {
    category: string;
    subcategory: string;
    productType: string;
    product: string;
    lng: string;
  };
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

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const router = useRouter();

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
  });

  const { refetch: refetchTranslatedSlugs } = useQuery<
    GetTranslatedSlugsQuery,
    GetTranslatedSlugsQueryVariables
  >({
    queryKey: ["translatedSlugs", params.product, params.lng],
    queryFn: async ({ queryKey }) => {
      const [, productSlug, currentLocale] = queryKey;
      const prevLng = getCookie(prevLngCookieName) as string;
      return request(
        `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
        GET_PRODUCT_TRANSLATED_SLUGS,
        {
          productSlug,
          currentLocale: prevLng,
          targetLocale: currentLocale,
        }
      );
    },
    enabled: false, // We don't want to run this query automatically
  });

  useEffect(() => {
    const handleLanguageChange = async () => {
      const currentLng = getCookie(lngCookieName);
      const prevLng = getCookie(prevLngCookieName);

      if (prevLng && currentLng && prevLng !== currentLng) {
        const { data: translatedSlugsData } = await refetchTranslatedSlugs();

        const product = translatedSlugsData?.products?.data[0]?.attributes;
        if (product) {
          const translatedProduct = product.localizations?.data[0]?.attributes;
          const translatedProductType =
            product.product_types?.data[0].attributes?.localizations?.data[0]
              ?.attributes;

          if (!translatedProduct || !translatedProductType) return null;

          const subcategoryData =
            translatedProduct.subcategory?.data?.attributes;
          if (!subcategoryData) return null;

          // Find the matching category from the categories array
          const categories = subcategoryData.categories?.data || [];

          const newPath = `/${currentLng}/${categories[0].attributes?.slug}/${subcategoryData.slug}/${translatedProductType.slug}/${translatedProduct.slug}`;

          router.push(newPath);
        }
      }
    };

    handleLanguageChange();
  }, [params.product, router, refetchTranslatedSlugs, categorySlug]);

  if (isProductLoading) {
    return <CenteredSpinner />;
  }

  if (productError) {
    return <div>Error loading product. Please try again later.</div>;
  }

  if (!productData?.products?.data[0]) {
    //TODO: maybe should be Not Found
    return <CenteredSpinner />;
  }
  const product = productData.products.data[0] as ProductData;

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

export default ProductPage;
