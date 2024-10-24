"use client";

import {
  GetSearchProductsQuery,
  GetSearchProductsQueryVariables,
} from "@/gql/graphql";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { SEARCH_PRODUCTS } from "@/graphql/queries/common";
import request from "graphql-request";
import CenteredSpinner from "./CenteredSpinner";
import ErrorMessage from "./ErrorMessage";
import TopCard from "../home/TopCard";
import { Box } from "lucide-react";
import { useTranslation } from "@/app/i18n/client";

interface SearchResultsProps {
  query: string;
  lng: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, lng }) => {
  const { t } = useTranslation(lng, "header");
  const { data, isLoading, error } = useQuery<
    GetSearchProductsQuery,
    GetSearchProductsQueryVariables
  >({
    queryKey: ["searchProducts", query],
    queryFn: async () => {
      if (!query) return { products: { data: [] } };
      return request<GetSearchProductsQuery, GetSearchProductsQueryVariables>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
        SEARCH_PRODUCTS,
        {
          searchTerm: query,
          locale: lng,
        }
      );
    },
    enabled: !!query,
  });

  if (!query) return null;
  if (isLoading) return <CenteredSpinner />;
  if (error) return <ErrorMessage message={`${JSON.stringify(error)}`} />;
  if (!data || data.products?.data.length === 0)
    return (
      <div className="my-5 flex flex-col items-center justify-center h-full text-gray-400">
        <Box size={64} className="mb-4" />
        <h2 className="text-lg text-center font-semibold">
          {t("search.noResults")}
        </h2>
      </div>
    );

  return (
    <div className="container mx-auto mt-4 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">
        {t("search.searchResults")} {query}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.products?.data.map(({ attributes, id }) => (
          <TopCard
            key={id}
            id={id ?? ""}
            product={{
              id: id ?? "",
              currency: attributes?.currency ?? "",
              part_number: attributes?.part_number ?? "",
              discount: attributes?.discount,
              retail: attributes?.retail ?? 0,
              image_link: attributes?.image_link,
              title: attributes?.title ?? "",
              params: attributes?.params,
              slug: attributes?.slug ?? "",
            }}
            categorySlug={
              attributes?.subcategory?.data?.attributes?.categories?.data[0]
                .attributes?.slug ?? ""
            }
            subcategoryId={attributes?.subcategory?.data?.id ?? ""}
            subcategorySlug={
              attributes?.subcategory?.data?.attributes?.slug ?? ""
            }
            productTypeSlug={
              attributes?.product_types?.data[0].attributes?.slug ?? ""
            }
            productSlug={attributes?.slug ?? ""}
            productTypeId={attributes?.product_types?.data[0].id ?? ""}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
