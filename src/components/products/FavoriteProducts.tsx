"use client";

import TopCard from "@/components/home/TopCard";
import { useFavorites } from "@/hooks/useFavorites";
import CenteredSpinner from "../shared/CenteredSpinner";
import { Heart } from "lucide-react";

const FavoriteProductsList = () => {
  const { favorites, isLoading } = useFavorites();

  return (
    <div className="max-w-5xl mx-auto p-4 sm:px-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-4">Ваші улюблені продукти</h1>
      {isLoading ? (
        <>
          <CenteredSpinner />
        </>
      ) : favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <Heart size={64} className="mb-4" />
          <h2 className="text-lg font-semibold">
            Ще немає улюблених продуктів!
          </h2>
          <p className="text-sm mt-2">
            Додайте деякі продукти до своїх улюблених і поверніться пізніше.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((f) => (
            <TopCard
              key={f.product?.data?.id}
              id={f?.product?.data?.id ?? ""}
              product={{
                id: f.product?.data?.id ?? "",
                currency: f.product?.data?.attributes?.currency ?? "",
                part_number: f.product?.data?.attributes?.part_number ?? "",
                discount: f.product?.data?.attributes?.discount,
                retail: f.product?.data?.attributes?.retail ?? 0,
                image_link: f.product?.data?.attributes?.image_link,
                title: f.product?.data?.attributes?.title ?? "",
                params: f.product?.data?.attributes?.params,
                slug: f.product?.data?.attributes?.slug ?? "",
              }}
              subcategoryId={
                f.product?.data?.attributes?.subcategory?.data?.id ?? ""
              }
              subcategorySlug={
                f.product?.data?.attributes?.subcategory?.data?.attributes
                  ?.slug ?? ""
              }
              productTypeSlug={f.product_type?.data?.attributes?.slug ?? ""}
              productSlug={f.product?.data?.attributes?.slug ?? ""}
              productTypeId={f.product_type?.data?.id ?? ""}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteProductsList;
