import { NetworkStatus, useQuery } from "@apollo/client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import TopCard from "../home/TopCard";
import Pagination from "../shared/Pagination";
import { GET_FILTERED_PRODUCTS } from "./queries";
import CenteredSpinner from "../shared/CenteredSpinner";
import {
  GetFilteredProductsQuery,
  GetFilteredProductsQueryVariables,
} from "@/gql/graphql";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setCurrentPage,
  setLastFilters,
  setLastProductType,
  setLastSubcategoryId,
} from "@/store/productGridSlice";

interface ProductGridProps {
  productTypeId: string;
  appliedFilters: Record<string, string[]>;
  pageSize: number;
  subcategoryId: string;
}

const ProductGrid = ({
  productTypeId,
  appliedFilters,
  pageSize,
  subcategoryId,
}: ProductGridProps) => {
  // const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(
    (state) => state.productGrid.currentPages[subcategoryId] || 1
  );
  const lastProductType = useAppSelector(
    (state) => state.productGrid.lastProductTypes[subcategoryId]
  );
  const lastFilters = useAppSelector(
    (state) => state.productGrid.lastFilters[subcategoryId]
  );
  const lastSubcategoryId = useAppSelector(
    (state) => state.productGrid.lastSubcategoryId
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
      productTypeId: productTypeId,
      subcategoryId,
      filters: transformedFilters,
      // cursor: null,
      page: currentPage,
      pageSize,
    },
    skip: !productTypeId,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const shouldResetPage =
      productTypeId !== lastProductType ||
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
    return <CenteredSpinner minHeight="24rem" />;
  }

  if (error) {
    return (
      <div className="text-center text-base">
        Помилка завантаження: {error.message}
      </div>
    );
  }

  if (!data || !data.filteredProducts) {
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
    <div className="w-3/4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data &&
          data.filteredProducts.products.map((product) => (
            <TopCard
              id={product?.id}
              key={product?.id}
              imageSrc={product?.image_link ?? ""}
              currency={product?.currency ?? "грн"}
              title={product?.title ?? ""}
              retail={product?.retail.toString() || "0"}
              subcategoryId={subcategoryId}
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
