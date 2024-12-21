import { notFound } from "next/navigation";

import { getProduct } from "./actions";
import ProductPageClient from "./ProductPageClient";

interface ProductPageProps {
  params: {
    category: string;
    subcategory: string;
    productType: string;
    product: string;
    lng: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product, productType, lng } = params;

  const productData = await getProduct(product, productType, lng);

  if (!productData || !productData.id) {
    notFound();
  }

  return <ProductPageClient params={params} initialData={productData} />;
}
