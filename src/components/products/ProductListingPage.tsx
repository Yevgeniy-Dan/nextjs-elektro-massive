"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import ProductTypeSelector from "./ProductTypeSelector";

import { useDebugLog } from "@/hooks/useDebugLog";

import { GET_PRODUCT_TYPE_FILTERS, GET_PRODUCT_TYPES } from "./queries";
import ProductFilterSection from "./ProductFilterSection";
import ProductGrid from "./ProductGrid";
import {
  ProductTypeFiltersResponse,
  ProductTypesResponse,
} from "@/types/types";

interface ProductListingClientProps {
  subcategory: string;
}

const ProductListingClient: React.FC<ProductListingClientProps> = ({
  subcategory,
}) => {
  const [selectedProductType, setSelectedProductType] = useState<string | null>(
    null
  );
  const [appliedFilters, setAppliedFilters] = useState<
    Record<string, string[]>
  >({});

  const pageSize = 10;

  const { data: productTypesData } = useQuery<ProductTypesResponse>(
    GET_PRODUCT_TYPES,
    {
      variables: { subcategory },
      skip: !subcategory,
    }
  );

  const { data: filtersData } = useQuery<ProductTypeFiltersResponse>(
    GET_PRODUCT_TYPE_FILTERS,
    {
      variables: { id: selectedProductType },
      skip: !selectedProductType,
    }
  );

  useEffect(() => {
    if (
      productTypesData?.productTypes.data &&
      productTypesData?.productTypes.data.length > 0
    ) {
      console.log("productTypesData", productTypesData);
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

  useDebugLog("productTypesData", productTypesData);
  // useDebugLog("filtersData", filtersData);
  // useDebugLog("selectedProductType", selectedProductType);
  // useDebugLog("filters", filters);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ProductTypeSelector
        types={productTypesData?.productTypes?.data || []}
        selectedTypeId={selectedProductType}
        onTypeChange={handleProductTypeChange}
      />
      <div className="flex gap-8">
        <ProductFilterSection
          filters={filters}
          appliedFilters={appliedFilters}
          onFilterChange={handleFilterChange}
        />
        <ProductGrid
          productTypeId={selectedProductType}
          appliedFilters={appliedFilters}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default ProductListingClient;
