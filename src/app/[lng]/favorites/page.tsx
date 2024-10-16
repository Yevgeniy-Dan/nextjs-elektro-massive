"use server";

import { Suspense } from "react";
import CenteredSpinner from "@/components/shared/CenteredSpinner";

import FavoriteProductsList from "@/components/products/FavoriteProducts";

const FavoritesPage = () => {
  return (
    <Suspense fallback={<CenteredSpinner />}>
      <FavoriteProductsList />
    </Suspense>
  );
};

export default FavoritesPage;
