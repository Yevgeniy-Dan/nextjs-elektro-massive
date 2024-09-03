import { NetworkStatus, useQuery } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import TopCard from "../home/TopCard";
import Pagination from "../shared/Pagination";
import { GET_FILTERED_PRODUCTS } from "./queries";
import { IFilteredProductsResponse } from "@/types/types";
import { useDebugLog } from "@/hooks/useDebugLog";
import Spinner from "../shared/Spinner";
import CenteredSpinner from "../shared/CenteredSpinner";

interface ProductGridProps {
  productTypeId: string | null;
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
  const [currentPage, setCurrentPage] = useState(1);

  const transformedFilters = useMemo(() => {
    return Object.entries(appliedFilters).flatMap(([key, values]) =>
      values.map((value) => ({ key, value }))
    );
  }, [appliedFilters]);

  const { data, loading, error, fetchMore, networkStatus, refetch } =
    useQuery<IFilteredProductsResponse>(GET_FILTERED_PRODUCTS, {
      variables: {
        productTypeId,
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
    setCurrentPage(1);
    refetch();
  }, [productTypeId, appliedFilters, refetch]);

  // const handlePageChange = (newPage: number) => {
  //   const variables: {
  //     cursor?: string | null;
  //     page?: number;
  //     pageSize: number;
  //   } = {
  //     pageSize,
  //   };

  //   console.log("cusrot: ", data?.filteredProducts.nextCursor);
  //   if (newPage === currentPage + 1 && data?.filteredProducts.nextCursor) {
  //     variables.cursor = data.filteredProducts.nextCursor;
  //   } else {
  //     variables.page = newPage;
  //     variables.cursor = null;
  //   }
  //   console.log("variables: ", variables);

  //   fetchMore({
  //     variables,
  //     updateQuery(prev, { fetchMoreResult }) {
  //       if (!fetchMoreResult.filteredProducts) return prev;

  //       const newProducts = fetchMoreResult.filteredProducts.products;

  //       return {
  //         filteredProducts: {
  //           ...fetchMoreResult.filteredProducts,
  //           products: [...newProducts],
  //         },
  //       };
  //     },
  //   }).then((p) => {
  //     setCurrentPage(newPage);
  //   });
  // };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
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
              key={product.id}
              id={product.id}
              subcategoryId={subcategoryId}
              title={product.title}
              retail={product.retail}
              currency={product.currency}
              imageSrc={product.image_link}
            />
          ))}
      </div>

      {data && (
        <Pagination
          currentPage={data.filteredProducts.currentPage}
          totalPages={data.filteredProducts.pageCount}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductGrid;
