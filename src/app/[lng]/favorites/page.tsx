"use server";

import { Suspense } from "react";
import CenteredSpinner from "@/components/shared/CenteredSpinner";

import FavoriteProductsList from "@/components/products/FavoriteProducts";
import { Metadata } from "next";

interface FavoritesPageProps {
  params: {
    lng: string;
  };
}

export async function generateMetadata({
  params,
}: FavoritesPageProps): Promise<Metadata> {
  const canonicalPath = `/favorites`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_API_URL}${canonicalPath}`;

  const title =
    params.lng === "uk"
      ? "Обрані товари | ELEKTRO-MASSIVE - Ваш список улюблених товарів"
      : "Избранные товары | ELEKTRO-MASSIVE - Ваш список избранных товаров";

  const description =
    params.lng === "uk"
      ? "Переглядайте та керуйте списком обраних товарів. Збережені електротовари, будматеріали та сантехніка від ELEKTRO-MASSIVE | ELEKTRO-MASSIVE"
      : "Просматривайте и управляйте списком избранных товаров. Сохраненные электротовары, стройматериалы и сантехника от ELEKTRO-MASSIVE | ELEKTRO-MASSIVE";

  return {
    title,
    description,
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

const FavoritesPage = async ({ params }: FavoritesPageProps) => {
  return (
    <Suspense fallback={<CenteredSpinner />}>
      <FavoriteProductsList lng={params.lng} />
    </Suspense>
  );
};

export default FavoritesPage;
