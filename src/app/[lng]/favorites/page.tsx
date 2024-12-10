"use server";

import { Suspense } from "react";
import CenteredSpinner from "@/components/shared/CenteredSpinner";

import FavoriteProductsList from "@/components/products/FavoriteProducts";

interface FavoritesPageProps {
  params: {
    lng: string;
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
