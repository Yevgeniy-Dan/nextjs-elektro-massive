"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import ProductTypeSelector from "./ProductTypeSelector";

import { useDebugLog } from "@/hooks/useDebugLog";

import { GET_PRODUCT_TYPE_FILTERS, GET_PRODUCT_TYPES } from "./queries";
import ProductFilterSection from "./ProductFilterSection";
import ProductGrid from "./ProductGrid";
import {
  IProductTypeFiltersResponse,
  IProductTypesResponse,
} from "@/types/types";

function isFiltersEmpty(filters: Record<string, string[]>) {
  return Object.keys(filters).length === 0;
}

interface ProductListingClientProps {
  subcategoryId: string;
}

const ProductListingClient: React.FC<ProductListingClientProps> = ({
  subcategoryId,
}) => {
  const [selectedProductType, setSelectedProductType] = useState<string | null>(
    null
  );
  const [appliedFilters, setAppliedFilters] = useState<
    Record<string, string[]>
  >({});

  const pageSize = 10;

  const { data: productTypesData } = useQuery<IProductTypesResponse>(
    GET_PRODUCT_TYPES,
    {
      variables: { subcategoryId },
      skip: !subcategoryId,
    }
  );

  const { data: filtersData } = useQuery<IProductTypeFiltersResponse>(
    GET_PRODUCT_TYPE_FILTERS,
    {
      variables: { productTypeId: selectedProductType, subcategoryId },
      skip: !selectedProductType,
    }
  );

  useEffect(() => {
    if (
      productTypesData?.productTypes.data &&
      productTypesData?.productTypes.data.length > 0
    ) {
      setSelectedProductType(productTypesData.productTypes.data[0].id);
    }
  }, [productTypesData]);

  const handleProductTypeChange = (typeId: string) => {
    setSelectedProductType(typeId);
    setAppliedFilters({});
  };

  const handleFilterChange = (filterName: string, values: string[]) => {
    setAppliedFilters((prev) => {
      const newFilters = { ...prev, [filterName]: values };
      // Remove filters with empty values
      Object.keys(newFilters).forEach((key) => {
        if (newFilters[key].length === 0) {
          delete newFilters[key];
        }
      });
      return newFilters;
    });
  };

  const filters = filtersData?.productTypeFilters || {};

  // useDebugLog("filters", filters);
  // useDebugLog("filtersData", filtersData);
  // useDebugLog("selectedProductType", selectedProductType);
  // useDebugLog("filters", filters);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:p-8 relative">
      <ProductTypeSelector
        types={productTypesData?.productTypes?.data || []}
        selectedTypeId={selectedProductType}
        onTypeChange={handleProductTypeChange}
      />
      <div className="flex gap-8">
        <div className="w-1/4">
          {!isFiltersEmpty(filters) && (
            <ProductFilterSection
              filters={filters}
              appliedFilters={appliedFilters}
              onFilterChange={handleFilterChange}
            />
          )}
        </div>
        <ProductGrid
          subcategoryId={subcategoryId}
          productTypeId={selectedProductType}
          appliedFilters={appliedFilters}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default ProductListingClient;
