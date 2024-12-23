import { NetworkStatus, useQuery } from "@apollo/client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import TopCard from "../home/TopCard";
import Pagination from "../shared/Pagination";
import { GET_FILTERED_PRODUCTS } from "@/graphql/queries/products";
import CenteredSpinner from "../shared/CenteredSpinner";
import {
  GetFilteredProductsQuery,
  GetFilteredProductsQueryVariables,
} from "@/gql/graphql";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setAppliedFilters,
  setCurrentPage,
  setLastFilters,
  setLastProductType,
  setLastSubcategoryId,
} from "@/store/productGridSlice";
import {
  selectAppliedFilters,
  selectCurrentPage,
  selectLastFilters,
  selectLastProductType,
  selectLastSubcategoryId,
} from "@/store/productGridSelectors";

interface ProductGridProps {
  productTypeId?: string;
  productTypeSlug?: string;
  pageSize: number;
  subcategoryId: string;
  subcategorySlug: string;
  lng: string;
  maxPriceFilter: number | null;
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
  maxPriceFilter,
  sortDirection,
  onScrollToUp,
}: ProductGridProps) => {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector((state) =>
    selectCurrentPage(state, subcategoryId)
  );

  const lastProductType = useAppSelector((state) =>
    selectLastProductType(state, subcategoryId)
  );

  const lastFilters = useAppSelector((state) =>
    selectLastFilters(state, subcategoryId)
  );

  const lastSubcategoryId = useAppSelector(selectLastSubcategoryId);

  const appliedFilters = useAppSelector((state) =>
    selectAppliedFilters(state, subcategoryId)
  );

  const transformedFilters = useMemo(() => {
    return Object.entries(appliedFilters).flatMap(([key, values]) =>
      values.map((value) => ({ key, value }))
    );
  }, [appliedFilters]);

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
      maxPrice: maxPriceFilter && maxPriceFilter > 0 ? maxPriceFilter : null,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    dispatch(setAppliedFilters({ subcategoryId, filters: appliedFilters }));
  }, [dispatch, subcategoryId, appliedFilters]);

  useEffect(() => {
    const currentProductType = productTypeId || "";
    const previousProductType = lastProductType || "";

    const shouldResetPage =
      (currentProductType || previousProductType
        ? currentProductType !== previousProductType
        : false) ||
      JSON.stringify(appliedFilters) !== JSON.stringify(lastFilters) ||
      subcategoryId !== lastSubcategoryId;

    if (shouldResetPage) {
      dispatch(setCurrentPage({ subcategoryId, page: 1 }));
    }

    dispatch(
      setLastProductType({ subcategoryId, productTypeId: productTypeId || "" })
    );
    dispatch(setLastFilters({ subcategoryId, filters: appliedFilters }));
    dispatch(setLastSubcategoryId(subcategoryId));

    refetch();
  }, [
    dispatch,
    productTypeId,
    appliedFilters,
    subcategoryId,
    lastProductType,
    lastFilters,
    lastSubcategoryId,
    refetch,
  ]);

  const handlePageChange = (newPage: number) => {
    onScrollToUp();
    dispatch(setCurrentPage({ subcategoryId, page: newPage }));

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
        {data &&
          data.filteredProducts.products.map((product) => (
            <TopCard
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
          ))}
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
