import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { request } from "graphql-request";

import { lngCookieName, prevLngCookieName } from "@/app/i18n/settings";

import CategoryListingClient from "@/components/category/CategoryListingClient";
import { GET_CATEGORY_TRANSLATED_SLUGS } from "@/graphql/queries/slugs";
import { GET_CATEGORY_BY_SLUG } from "@/graphql/queries/categories";
import {
  GetCategoryBySlugQuery,
  GetCategoryBySlugQueryVariables,
  GetCategoryTranslatedSlugsQuery,
  GetCategoryTranslatedSlugsQueryVariables,
} from "@/gql/graphql";
import Head from "next/head";
import { getCategory } from "./actions";
import CategoryPageClient from "./CategoryPageClient";

interface CategoryPageProps {
  params: {
    category: string;
    lng: string;
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
