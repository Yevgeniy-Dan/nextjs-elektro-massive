"use server";

import { IProductAttributes, IProductResponse } from "@/types/types";
import React, { Suspense } from "react";
import { GET_PRODUCT } from "@/components/product/queries";
import Image from "next/image";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { getClient } from "../../../../lib/apollo-client";
import ProductDetails from "@/components/product/ProductDetails";

interface ProductPageProps {
  params: {
    subcategory: string;
    product: string;
  };
}

async function getProduct(
  productId: string
): Promise<IProductAttributes | null> {
  const { data } = await getClient().query<IProductResponse>({
    query: GET_PRODUCT,
    variables: { productId },
  });

  return (data.product.data && data.product.data.attributes) || null;
}

function ProductLoading() {
  return <div className="text-center p-4">Loading product details...</div>;
}

function ProductError({ error }: { error: Error }) {
  return (
    <div className="text-center text-red-500">
      Error loading product: {error.message}
    </div>
  );
}

async function ProductContainer({ productId }: { productId: string }) {
  const product = await getProduct(productId);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return <ProductDetails product={product} />;
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  return (
    <div>
      <Suspense fallback={<ProductLoading />}>
        <ProductContainer productId={params.product} />
      </Suspense>
    </div>
  );
};

export default ProductPage;
