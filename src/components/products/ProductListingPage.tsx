"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import ProductTypeSelector from "./ProductTypeSelector";

import { GET_PRODUCT_TYPE_FILTERS, GET_PRODUCT_TYPES } from "./queries";
import ProductFilterSection from "./ProductFilterSection";
import ProductGrid from "./ProductGrid";
import {
  GetProductTypeFiltersQuery,
  GetProductTypeFiltersQueryVariables,
  GetProductTypesQuery,
  GetProductTypesQueryVariables,
} from "@/gql/graphql";

import ReactMarkdown from "react-markdown";
import { useAppDispatch } from "@/store/hooks";
import { setAppliedFilters } from "@/store/productGridSlice";

function isFiltersEmpty(filters: Record<string, string[]>) {
  return Object.keys(filters).length === 0;
}

interface ProductListingClientProps {
  subcategoryId: string;
}

const ProductListingClient: React.FC<ProductListingClientProps> = ({
  subcategoryId,
}) => {
  const dispatch = useAppDispatch();
  const [selectedProductType, setSelectedProductType] = useState<string | null>(
    null
  );
  const [selectedTypeDescription, setSelectedTypeDescription] =
    useState<string>("");

  const pageSize = 10;

  const { data: productTypesData } = useQuery<
    GetProductTypesQuery,
    GetProductTypesQueryVariables
  >(GET_PRODUCT_TYPES, {
    variables: { subcategoryId },
    skip: !subcategoryId,
  });

  const { data: filtersData } = useQuery<
    GetProductTypeFiltersQuery,
    GetProductTypeFiltersQueryVariables
  >(GET_PRODUCT_TYPE_FILTERS, {
    variables: { productTypeId: selectedProductType || "", subcategoryId },
    skip: !selectedProductType,
  });

  useEffect(() => {
    if (
      productTypesData?.productTypes?.data &&
      productTypesData?.productTypes.data.length > 0
    ) {
      const firstProductType = productTypesData?.productTypes.data[0];
      setSelectedProductType(firstProductType.id ?? "");
      setSelectedTypeDescription(
        firstProductType.attributes?.description ?? ""
      );
    }
  }, [productTypesData]);

  const handleProductTypeChange = (typeId: string) => {
    setSelectedProductType(typeId);
    const selectedType = productTypesData?.productTypes?.data.find(
      (type) => type.id === typeId
    );
    setSelectedTypeDescription(selectedType?.attributes?.description ?? "");
    dispatch(setAppliedFilters({ subcategoryId, filters: {} }));
  };

  const filters = filtersData?.productTypeFilters || {};

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
              subcategoryId={subcategoryId}
            />
          )}
        </div>
        {selectedProductType && (
          <ProductGrid
            subcategoryId={subcategoryId}
            productTypeId={selectedProductType}
            pageSize={pageSize}
          />
        )}
      </div>
      <ReactMarkdown className="text-md">
        {selectedTypeDescription}
      </ReactMarkdown>
    </div>
  );
};

export default ProductListingClient;
