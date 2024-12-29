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

const FavoritesPage = async ({ params }: FavoritesPageProps) => {
  return (
    <Suspense fallback={<CenteredSpinner />}>
      <FavoriteProductsList lng={params.lng} />
    </Suspense>
  );
};

export default FavoritesPage;
