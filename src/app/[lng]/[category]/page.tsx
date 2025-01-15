import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import { getCategory } from "./actions";
import CategoryPageClient from "./CategoryPageClient";

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
  const description = category?.attributes?.metaDescription;

  if (!category) {
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
    title: name + " | ELEKTRO-MASSIVE",
    description: description.slice(0, 155) + "...",
    alternates,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug, lng } = params;
  const category = await getCategory(categorySlug, lng);

  if (!category) {
    notFound();
  }

  return <CategoryPageClient params={params} initialData={category} />;
}
