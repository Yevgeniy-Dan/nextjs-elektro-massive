"use server";

import { ProductData } from "@/types/types";
import React, { Suspense } from "react";
import { GET_PRODUCT_BY_SLUG } from "@/components/product/queries";
import { getClient } from "../../../../../lib/apollo-client";
import ProductDetails from "@/components/product/ProductDetails";
import CenteredSpinner from "@/components/shared/CenteredSpinner";
import {
  GetProductBySlugQuery,
  GetProductBySlugQueryVariables,
} from "@/gql/graphql";
import { Metadata } from "next";

interface ProductPageProps {
  params: {
    subcategory: string;
    productType: string;
    product: string;
  };
}

async function getProductBySlug(
  productSlug: string,
  productTypeSlug: string
): Promise<ProductData | null> {
  const { data } = await getClient().query<
    GetProductBySlugQuery,
    GetProductBySlugQueryVariables
  >({
    query: GET_PRODUCT_BY_SLUG,
    variables: {
      productSlug,
      productTypeSlug,
    },
  });

  return data?.products?.data[0] || null;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.product, params.subcategory);

  if (!product || !product.attributes) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  const { title, description, image_link } = product.attributes;

  return {
    title: title || "Product",
    description: description || "No description available",
    openGraph: {
      title: title || "Product",
      description: description || "No description available",
      images: image_link ? [image_link] : [],
    },
  };
}

async function ProductContainer({
  productSlug,
  productTypeSlug,
}: {
  productSlug: string;
  productTypeSlug: string;
}) {
  const product = await getProductBySlug(productSlug, productTypeSlug);

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
      subcategorySlug={
        product.attributes.subcategory?.data?.attributes?.slug || ""
      }
      productTypeTitle={
        product?.attributes?.product_types?.data[0]?.attributes?.title || ""
      }
      subcategoryTitle={
        product?.attributes?.subcategory?.data?.attributes?.title || ""
      }
    />
  );
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  return (
    <div>
      <Suspense fallback={<CenteredSpinner />}>
        <ProductContainer
          productSlug={params.product}
          productTypeSlug={params.productType}
        />
      </Suspense>
    </div>
  );
};

export default ProductPage;
