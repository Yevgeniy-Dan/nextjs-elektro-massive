"use client";

import { useFavorites } from "@/hooks/useFavorites";
import { useTranslation } from "@/app/i18n/client";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { AvailableLanguages } from "../shared/LanguageToggler";
import { useLangMatches } from "@/hooks/useLangMatches";

const TopCard = dynamic(() => import("@/components/home/TopCard"), {
  loading: () => <div className="animate-pulse h-48 bg-gray-200 rounded-lg" />,
  ssr: false,
});

const EmptyState = dynamic(() => import("./EmptyState"), {
  ssr: false,
});

const CenteredSpinner = dynamic(
  () => import("@/components/shared/CenteredSpinner"),
  {
    ssr: false,
  }
);

interface FavoriteProductsListProps {
  lng: string;
  fullTranslatedPath: Record<AvailableLanguages, string>;
}

const FavoriteProductsList: React.FC<FavoriteProductsListProps> = ({
  lng,
  fullTranslatedPath,
}) => {
  const { status } = useSession();

  useLangMatches(fullTranslatedPath);

  const { favorites, isLoading } = useFavorites();
  const { t } = useTranslation(lng, "common");

  if (status === "unauthenticated") {
    return <EmptyState lng={lng} />;
  }

  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (favorites.length === 0) {
    return <EmptyState lng={lng} />;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:px-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-4">{t("favorites.title")}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((f) => (
          <TopCard
            lng={lng}
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
              parameter_values: f.product?.data?.attributes?.parameter_values,
              slug: f.product?.data?.attributes?.slug ?? "",
            }}
            categorySlug={
              f.product?.data?.attributes?.subcategory?.data?.attributes
                ?.categories?.data[0].attributes?.slug ?? ""
            }
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
    </div>
  );
};

export default FavoriteProductsList;
