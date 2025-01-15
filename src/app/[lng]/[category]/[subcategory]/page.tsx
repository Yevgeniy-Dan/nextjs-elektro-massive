import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getSubcategory } from "./actions";
import SubcategoryPageClient from "./SubcategoryPageClient";

interface SubcategoryPageProps {
  params: {
    category: string;
    subcategory: string;
    lng: string;
  };
}

export async function generateMetadata({
  params,
}: SubcategoryPageProps): Promise<Metadata> {
  const { category: categorySlug, subcategory: subcategorySlug, lng } = params;

  const canonicalPath = `/${categorySlug}/${subcategorySlug}`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_API_URL}${canonicalPath}`;

  const alternates = {
    canonical: canonicalUrl,
    languages: {
      uk: `${process.env.NEXT_PUBLIC_API_URL}/uk${canonicalPath}`,
      ru: `${process.env.NEXT_PUBLIC_API_URL}/ru${canonicalPath}`,
      "x-default": canonicalUrl,
    },
  };

  const subcategory = await getSubcategory(subcategorySlug, lng);

  if (!subcategory) {
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
    title: subcategory.attributes?.metaTitle + " | ELEKTRO-MASSIVE",
    description: subcategory.attributes?.metaDescription?.slice(0, 155) + "...",
    alternates,
  };
}

export default async function SubcategoryPage({
  params,
}: SubcategoryPageProps) {
  const { subcategory: subcategorySlug, category: categorySlug, lng } = params;

  const subcategory = await getSubcategory(subcategorySlug, lng);

  if (!subcategory || !subcategory.id) {
    notFound();
  }

  return <SubcategoryPageClient params={params} initialData={subcategory} />;
}
