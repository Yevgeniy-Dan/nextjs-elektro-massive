import React from "react";
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
