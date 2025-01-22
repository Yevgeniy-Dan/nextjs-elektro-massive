import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductType } from "./actions";
import ProductTypePageClient from "./ProductTypePageClient";
import { getSubcategory } from "../actions";
import { getCategory } from "../../actions";
import { languages } from "@/app/i18n/settings";
import { cookies } from "next/headers";

interface ProductTypePageProps {
  params: {
    category: string;
    subcategory: string;
    productType: string;
    lng: string;
  };
}

export async function generateMetadata({
  params,
}: ProductTypePageProps): Promise<Metadata> {
  const {
    category: categorySlug,
    subcategory: subcategorySlug,
    productType: productTypeSlug,
    lng,
  } = params;

  const canonicalPath = `/${categorySlug}/${subcategorySlug}/${productTypeSlug}`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_API_URL}${canonicalPath}`;

  const alternates = {
    canonical: canonicalUrl,
    languages: {
      uk: `${process.env.NEXT_PUBLIC_API_URL}/uk${canonicalPath}`,
      ru: `${process.env.NEXT_PUBLIC_API_URL}/ru${canonicalPath}`,
      "x-default": canonicalUrl,
    },
  };
  const productTypeData = await getProductType(productTypeSlug, lng);

  if (!productTypeData) {
    return {
      title:
        params.lng === "uk"
          ? `Сторінку не знайдено | ELEKTRO-MASSIVE`
          : `Страница не найдена | ELEKTRO-MASSIVE`,
      description:
        params.lng === "uk"
          ? `Запитану сторінку не знайдено. Поверніться на головну або скористайтеся пошуком.`
          : `Запрашиваемая страница не найдена. Вернитесь на главную или воспользуйтесь поиском.`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${productTypeData.productType?.attributes?.metaTitle} | ELEKTRO-MASSIVE`,
    description:
      productTypeData.productType?.attributes?.metaDescription?.slice(0, 155) +
      "...",
    alternates,
  };
}

export default async function ProductTypePage({
  params,
}: ProductTypePageProps) {
  const {
    productType: productTypeSlug,
    lng,
    subcategory: subcategorySlug,
    category: categorySlug,
  } = params;

  const [productTypeData, subcategoryData, categoryData] = await Promise.all([
    getProductType(productTypeSlug, lng),
    getSubcategory(subcategorySlug, lng),
    getCategory(categorySlug, lng),
  ]);

  const { productType, total } = productTypeData;
  const subcategory = subcategoryData;

  if (!productType?.id || !subcategory?.id || !categoryData?.id) {
    notFound();
  }

  const fullTranslatedPath = languages.reduce(
    (acc, l) => ({
      ...acc,
      [l]: `${categoryData.attributes?.langMatches[l]}/${subcategoryData?.attributes?.langMatches[l]}/${productType.attributes?.langMatches[l]}`,
    }),
    {}
  );

  return (
    <ProductTypePageClient
      params={params}
      initialProductTypeData={productType}
      initialSubcategoryData={subcategory}
      total={total || 1}
      fullTranslatedPath={fullTranslatedPath}
    />
  );
}
