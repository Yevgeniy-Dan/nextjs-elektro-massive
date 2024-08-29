import { NetworkStatus, useQuery } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import TopCard from "../home/TopCard";
import Pagination from "../shared/Pagination";
import { GET_FILTERED_PRODUCTS } from "./queries";
import { FilteredProductsResponse } from "@/types/types";
import { useDebugLog } from "@/hooks/useDebugLog";

interface ProductGridProps {
  productTypeId: string | null;
  appliedFilters: Record<string, string[]>;
  pageSize: number;
}

const ProductGrid = ({
  productTypeId,
  appliedFilters,
  pageSize,
}: ProductGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const transformedFilters = useMemo(() => {
    return Object.entries(appliedFilters).flatMap(([key, values]) =>
      values.map((value) => ({ key, value }))
    );
  }, [appliedFilters]);

  const { data, loading, fetchMore, networkStatus, refetch } =
    useQuery<FilteredProductsResponse>(GET_FILTERED_PRODUCTS, {
      variables: {
        productTypeId,
        filters: transformedFilters,
        cursor: null,
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

  const handlePageChange = (newPage: number) => {
    // const fetchMoreVariables =
    //   newPage === currentPage + 1 && data?.filteredProducts.nextCursor
    //     ? { cursor: data.filteredProducts.nextCursor }
    //     : { cursor: null, page: newPage };

    const variables: {
      cursor?: string | null;
      page?: number;
      pageSize: number;
    } = {
      pageSize,
    };

    if (newPage === currentPage + 1 && data?.filteredProducts.nextCursor) {
      variables.cursor = data.filteredProducts.nextCursor;
    } else {
      variables.page = newPage;
      variables.cursor = null;
    }

    fetchMore({
      variables,
      updateQuery(prev, { fetchMoreResult }) {
        if (!fetchMoreResult.filteredProducts) return prev;

        const newProducts = fetchMoreResult.filteredProducts.products;

        console.log({ products: [...newProducts] });
        return {
          filteredProducts: {
            ...fetchMoreResult.filteredProducts,
            products: [...newProducts],
          },
        };
      },
    }).then((p) => {
      setCurrentPage(newPage);
    });
  };

  useDebugLog("filteredProducts: ", data?.filteredProducts);

  if (networkStatus === NetworkStatus.loading)
    return <div>Початкове завантаження...</div>;
  if (networkStatus === NetworkStatus.refetch)
    return <div>Оновлення данних...</div>;
  if (networkStatus === NetworkStatus.fetchMore)
    return <div>Завантаження...</div>;

  if (loading) return <div>Завантаження...</div>;

  if (!data?.filteredProducts || data.filteredProducts.products.length === 0) {
    return <div>Немає товарів</div>;
  }

  return (
    <div className="w-3/4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.filteredProducts.products.map((product) => (
          <TopCard
            key={product.id}
            title={product.title}
            retail={product.retail}
            currency={product.currency}
            imageSrc={product.image_link}
          />
        ))}
      </div>

      <Pagination
        currentPage={data.filteredProducts.currentPage}
        totalPages={data.filteredProducts.pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductGrid;
