import { NetworkStatus, useQuery } from "@apollo/client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import TopCard from "../home/TopCard";
import Pagination from "../shared/Pagination";
import { GET_FILTERED_PRODUCTS } from "@/graphql/queries/products";
import CenteredSpinner from "../shared/CenteredSpinner";
import {
  GetFilteredProductsQuery,
  GetFilteredProductsQueryVariables,
} from "@/gql/graphql";

import { useProductGridStore } from "@/store/useProductGridStore";
import { FilteredProduct } from "@/types/types";

interface ProductGridProps {
  productTypeId?: string;
  productTypeSlug?: string;
  pageSize: number;
  subcategoryId: string;
  subcategorySlug: string;
  lng: string;
  priceRange: number[] | null;
  onScrollToUp: () => void;
  sortDirection: "asc" | "desc";
}

const ProductGrid = ({
  productTypeId,
  pageSize,
  subcategoryId,
  subcategorySlug,
  productTypeSlug,
  lng,
  priceRange,
  sortDirection,
  onScrollToUp,
}: ProductGridProps) => {
  const {
    currentPages,
    appliedFilters,
    lastFilters,
    lastProductTypes,
    lastSubcategoryId,
    setCurrentPage,
    setLastProductType,
    setLastFilters,
    setAppliedFilters,
    setLastSubcategoryId,
  } = useProductGridStore();

  const currentPage = currentPages[subcategoryId] || 1;

  const transformedFilters = useMemo(() => {
    const filters = appliedFilters[subcategoryId] || {};
    return Object.entries(filters).flatMap(([key, values]) =>
      values.map((value) => ({ key, value }))
    );
  }, [appliedFilters, subcategoryId]);

  const { data, loading, error, fetchMore, networkStatus, refetch } = useQuery<
    GetFilteredProductsQuery,
    GetFilteredProductsQueryVariables
  >(GET_FILTERED_PRODUCTS, {
    variables: {
      productTypeId: productTypeId || undefined,
      subcategoryId,
      filters: transformedFilters,
      // cursor: null,
      page: currentPage,
      pageSize,
      sort: [sortDirection === "asc" ? "retail:asc" : "retail:desc"],
      locale: lng,
      minPrice: priceRange?.[0] || null,
      maxPrice: priceRange?.[1] || null,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data && !loading && !error) {
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "view_item_list", {
          item_list_name: "Product",
          item_list_subcategory: subcategorySlug,
          item_list_product_type: productTypeSlug,
          item_page: currentPage,
        });
      }
    }
  }, [data, subcategorySlug, productTypeSlug, currentPage, loading, error]);

  useEffect(() => {
    setAppliedFilters(subcategoryId, appliedFilters[subcategoryId] || {});
  }, [subcategoryId, appliedFilters, setAppliedFilters]);

  useEffect(() => {
    const currentProductType = productTypeId || "";
    const previousProductType = lastProductTypes[subcategoryId] || "";

    if (
      currentProductType !== previousProductType ||
      subcategoryId !== lastSubcategoryId
    ) {
      setCurrentPage(subcategoryId, 1);
      setLastProductType(subcategoryId, currentProductType);
      setLastSubcategoryId(subcategoryId);
      refetch();
    }
  }, [
    productTypeId,
    subcategoryId,
    lastProductTypes,
    lastSubcategoryId,
    setCurrentPage,
    setLastProductType,
    setLastSubcategoryId,
    refetch,
  ]);

  useEffect(() => {
    const currentFilters = JSON.stringify(appliedFilters[subcategoryId]);
    const prevFilters = JSON.stringify(lastFilters[subcategoryId]);

    if (currentFilters !== prevFilters) {
      setCurrentPage(subcategoryId, 1);
      setLastFilters(subcategoryId, appliedFilters[subcategoryId] || {});
      refetch();
    }
  }, [
    appliedFilters,
    subcategoryId,
    lastFilters,
    setCurrentPage,
    setLastFilters,
    refetch,
  ]);

  const renderProductCards = useCallback(
    (products: FilteredProduct[]) => {
      return products.map((product) => (
        <TopCard
          lng={lng}
          id={product?.id}
          key={product?.id}
          product={product}
          productSlug={product.slug ?? ""}
          categorySlug={
            product.subcategory?.data?.attributes?.categories?.data[0]
              .attributes?.slug ?? ""
          }
          subcategoryId={subcategoryId}
          subcategorySlug={subcategorySlug}
          productTypeSlug={
            productTypeSlug ||
            product.product_types?.data[0].attributes?.slug ||
            ""
          }
          productTypeId={
            productTypeId || product.product_types?.data[0].id || ""
          }
        />
      ));
    },
    [lng, subcategoryId, subcategorySlug, productTypeSlug, productTypeId]
  );

  const handlePageChange = (newPage: number) => {
    onScrollToUp();
    setCurrentPage(subcategoryId, newPage);

    fetchMore({
      variables: {
        page: newPage,
        pageSize,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.filteredProducts) return prev;
        return {
          filteredProducts: {
            ...fetchMoreResult.filteredProducts,
            products: [...fetchMoreResult.filteredProducts.products],
          },
        };
      },
    });
  };

  const isInitialLoading = networkStatus === NetworkStatus.loading;
  const isRefetching = networkStatus === NetworkStatus.refetch;
  const isFetchingMore = networkStatus === NetworkStatus.fetchMore;

  if (isInitialLoading || isRefetching || isFetchingMore) {
    return <CenteredSpinner />;
  }

  if (error) {
    return (
      <div className="text-center text-base">
        Помилка завантаження: {error.message}
      </div>
    );
  }

  if (!data || !data.filteredProducts) {
    if (loading) {
      return <CenteredSpinner />;
    }
    return (
      <div className="absolute">
        <div className="text-3xl text-gray-600">Немає товарів</div>
      </div>
    );
  }

  if (data && data.filteredProducts.products.length === 0) {
    <div className="text-center text-base">Немає доступних товарів</div>;
  }

  return (
    <div className="w-full md:w-3/4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4  gap-4">
        {data && renderProductCards(data.filteredProducts.products)}
      </div>

      {data && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.filteredProducts.pageCount}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductGrid;
