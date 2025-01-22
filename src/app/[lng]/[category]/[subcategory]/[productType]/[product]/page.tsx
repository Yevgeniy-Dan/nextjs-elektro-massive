"use server";

import { notFound } from "next/navigation";
import { Metadata } from "next";

import { getProduct } from "./actions";
import ProductPageClient from "./ProductPageClient";
import { languages } from "@/app/i18n/settings";
import { getProductType } from "../actions";
import { getSubcategory } from "../../actions";
import { getCategory } from "../../../actions";
import { cookies } from "next/headers";

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
    lng,
  } = params;
  const canonicalPath = `/${categorySlug}/${subcategorySlug}/${productTypeSlug}/${productSlug}`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_API_URL}${canonicalPath}`;

  const alternates = {
    canonical: canonicalUrl,
    languages: {
      uk: `${process.env.NEXT_PUBLIC_API_URL}/uk${canonicalPath}`,
      ru: `${process.env.NEXT_PUBLIC_API_URL}/ru${canonicalPath}`,
      "x-default": canonicalUrl,
    },
  };

  const productData = await getProduct(productSlug, productTypeSlug, lng);

  if (!productData) {
    return {
      title:
        params.lng === "uk"
          ? `Сторінку не знайдено | ELEKTRO-MASSIVE`
          : `Страница не найдена | ELEKTRO-MASSIVE`,
      description:
        params.lng === "uk"
          ? `Запитану сторінку не знайдено. Поверніться на головну або скористайтеся пошуком | ELEKTRO-MASSIVE`
          : `Запрашиваемая страница не найдена. Вернитесь на главную или воспользуйтесь поиском | ELEKTRO-MASSIVE`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${productData?.attributes?.title} | ELEKTRO-MASSIVE`,
    description:
      productData.attributes?.description?.slice(0, 155) + " | ELEKTRO-MASSIVE",
    alternates,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product, productType, lng, category, subcategory } = params;

  const [productTypeData, subcategoryData, categoryData, productData] =
    await Promise.all([
      getProductType(productType, lng),
      getSubcategory(subcategory, lng),
      getCategory(category, lng),
      getProduct(product, productType, lng),
    ]);
  if (
    !productTypeData?.productType?.id ||
    !subcategoryData?.id ||
    !categoryData?.id ||
    !productData?.id
  ) {
    notFound();
  }

  const fullTranslatedPath = languages.reduce(
    (acc, l) => ({
      ...acc,
      [l]: `${categoryData.attributes?.langMatches?.[l]}/${subcategoryData?.attributes?.langMatches?.[l]}/${productTypeData.productType.attributes?.langMatches?.[l]}/${productData.attributes?.langMatches?.[l]}`,
    }),
    {}
  );

  return (
    <ProductPageClient
      params={params}
      initialData={productData}
      fullTranslatedPath={fullTranslatedPath}
    />
  );
}
