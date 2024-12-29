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
  const { category: categorySlug } = params;
  const canonicalPath = `/${categorySlug}`;
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug, lng } = params;
  const category = await getCategory(categorySlug, lng);

  if (!category) {
    notFound();
  }

  return <CategoryPageClient params={params} initialData={category} />;
}
