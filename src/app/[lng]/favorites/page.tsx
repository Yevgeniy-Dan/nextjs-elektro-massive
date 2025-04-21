"use server";

import { Suspense } from "react";

import { Metadata } from "next";
import dynamic from "next/dynamic";
import { languages } from "@/app/i18n/settings";

const CenteredSpinner = dynamic(
  () => import("@/components/shared/CenteredSpinner"),
  {
    ssr: false,
  }
);

const FavoriteProductsList = dynamic(
  () => import("@/components/products/FavoriteProducts"),
  {
    loading: () => <CenteredSpinner />,
    ssr: false,
  }
);

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
  const fullTranslatedPath = languages.reduce(
    (acc, l) => ({
      ...acc,
      [l]: `favorites`,
    }),
    {}
  );

  return (
    <Suspense fallback={<CenteredSpinner />}>
      <FavoriteProductsList
        lng={params.lng}
        fullTranslatedPath={fullTranslatedPath}
      />
    </Suspense>
  );
};

export default FavoritesPage;
