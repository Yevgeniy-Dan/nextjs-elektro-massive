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

interface ProductPageProps {
  params: {
    subcategory: string;
    product: string;
  };
}

async function getProductBySlug(slug: string): Promise<ProductData | null> {
  const { data } = await getClient().query<
    GetProductBySlugQuery,
    GetProductBySlugQueryVariables
  >({
    query: GET_PRODUCT_BY_SLUG,
    variables: {
      slug,
    },
  });

  return data?.products?.data[0] || null;
}

async function ProductContainer({ slug }: { slug: string }) {
  const product = await getProductBySlug(slug);

  if (!product || !product.attributes || !product.id) {
    return <div>Product not found.</div>;
  }

  return <ProductDetails product={product.attributes} id={product.id} />;
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  return (
    <div>
      <Suspense fallback={<CenteredSpinner />}>
        <ProductContainer slug={params.product} />
      </Suspense>
    </div>
  );
};

export default ProductPage;
