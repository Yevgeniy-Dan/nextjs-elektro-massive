import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import { getCategory } from "./actions";
import CategoryPageClient from "./CategoryPageClient";
import { languages } from "@/app/i18n/settings";
import { getTrimmedMetaDescription } from "@/app/utils/strapiDataTransformations";

interface CategoryPageProps {
  params: {
    category: string;
    lng: string;
  };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug, lng } = params;

  const canonicalPath = `/${categorySlug}`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_API_URL}${canonicalPath}`;

  const alternates = {
    canonical: canonicalUrl,
    languages: {
      uk: `${process.env.NEXT_PUBLIC_API_URL}/uk${canonicalPath}`,
      ru: `${process.env.NEXT_PUBLIC_API_URL}/ru${canonicalPath}`,
      "x-default": canonicalUrl,
    },
  };

  const category = await getCategory(categorySlug, lng);

  const name = category?.attributes?.metaTitle;
  const metaDescription = getTrimmedMetaDescription(
    category?.attributes?.metaDescription
  );

  if (!category) {
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
    title: name + " | ELEKTRO-MASSIVE",
    description: metaDescription + " | ELEKTRO-MASSIVE",
    alternates,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug, lng } = params;
  const category = await getCategory(categorySlug, lng);

  if (!category) {
    notFound();
  }

  const fullTranslatedPath = languages.reduce(
    (acc, l) => ({
      ...acc,
      [l]: `${category?.attributes?.langMatches?.[l]}`,
    }),
    {}
  );

  return (
    <CategoryPageClient
      params={params}
      initialData={category}
      fullTranslatedPath={fullTranslatedPath}
    />
  );
}
