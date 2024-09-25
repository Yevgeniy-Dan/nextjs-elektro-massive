"use server";

import { ProductAttributes } from "@/types/types";
import React, { Suspense } from "react";
import { GET_PRODUCT } from "@/components/product/queries";
import { getClient } from "../../../../lib/apollo-client";
import ProductDetails from "@/components/product/ProductDetails";
import CenteredSpinner from "@/components/shared/CenteredSpinner";
import { GetProductQuery } from "@/gql/graphql";

interface ProductPageProps {
  params: {
    subcategory: string;
    product: string;
  };
}

async function getProduct(
  productId: string
): Promise<ProductAttributes | null> {
  const { data } = await getClient().query<GetProductQuery>({
    query: GET_PRODUCT,
    variables: { productId },
  });

  return data?.product?.data?.attributes || null;
}

async function ProductContainer({ productId }: { productId: string }) {
  const product = await getProduct(productId);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return <ProductDetails product={product} id={productId} />;
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  return (
    <div>
      <Suspense fallback={<CenteredSpinner />}>
        <ProductContainer productId={params.product} />
      </Suspense>
    </div>
  );
};

export default ProductPage;
