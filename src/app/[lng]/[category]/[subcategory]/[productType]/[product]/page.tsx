import { notFound } from "next/navigation";
import { Metadata } from "next";

import { getProduct } from "./actions";
import ProductPageClient from "./ProductPageClient";
import LanguageUnavailablePlaceholder from "@/components/shared/LanguageUnavailablePlaceholder";

interface ProductPageProps {
  params: {
    category: string;
    subcategory: string;
    productType: string;
    product: string;
    lng: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const {
    category: categorySlug,
    subcategory: subcategorySlug,
    productType: productTypeSlug,
    product: productSlug,
  } = params;
  const canonicalPath = `/${categorySlug}/${subcategorySlug}/${productTypeSlug}/${productSlug}`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_API_URL}${canonicalPath}`;

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: {
        uk: `${process.env.NEXT_PUBLIC_API_URL}/uk${canonicalPath}`,
        ru: `${process.env.NEXT_PUBLIC_API_URL}/ru${canonicalPath}`,
        "x-default": canonicalUrl,
      },
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product, productType, lng } = params;

  const productData = await getProduct(product, productType, lng);

  // If the language is Russian, we show a special message
  if (lng === "ru") {
    return <LanguageUnavailablePlaceholder />;
  }

  if (!productData || !productData.id) {
    notFound();
  }

  return <ProductPageClient params={params} initialData={productData} />;
}
