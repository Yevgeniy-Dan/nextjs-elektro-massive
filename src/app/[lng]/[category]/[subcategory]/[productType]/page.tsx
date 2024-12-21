import React from "react";
import { notFound } from "next/navigation";

import { getProductType } from "./actions";
import ProductTypePageClient from "./ProductTypePageClient";
import { getSubcategory } from "../actions";

interface ProductTypePageProps {
  params: {
    category: string;
    subcategory: string;
    productType: string;
    lng: string;
  };
}

export default async function ProductTypePage({
  params,
}: ProductTypePageProps) {
  const {
    productType: productTypeSlug,
    lng,
    subcategory: subcategorySlug,
  } = params;

  const [productTypeData, subcategoryData] = await Promise.all([
    getProductType(productTypeSlug, lng),
    getSubcategory(subcategorySlug, lng),
  ]);

  const { productType, total } = productTypeData;
  const subcategory = subcategoryData;

  if (!productType || !productType.id || !subcategory || !subcategory.id) {
    notFound();
  }

  return (
    <ProductTypePageClient
      params={params}
      initialProductTypeData={productType}
      initialSubcategoryData={subcategory}
      total={total || 1}
    />
  );
}
