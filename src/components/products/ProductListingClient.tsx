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
  productTypeId: string;
  subcategorySlug: string;
  productTypeSlug: string;
}

const ProductListingClient: React.FC<ProductListingClientProps> = ({
  subcategoryId,
  productTypeId,
  subcategorySlug,
  productTypeSlug,
}) => {
  const dispatch = useAppDispatch();
  const pageSize = 10;

  const { data: productTypesData } = useQuery<
    GetProductTypesQuery,
    GetProductTypesQueryVariables
  >(GET_PRODUCT_TYPES, {
    variables: { subcategoryId },
  });

  const { data: filtersData } = useQuery<
    GetProductTypeFiltersQuery,
    GetProductTypeFiltersQueryVariables
  >(GET_PRODUCT_TYPE_FILTERS, {
    variables: { productTypeId, subcategoryId },
  });

  React.useEffect(() => {
    dispatch(setAppliedFilters({ subcategoryId, filters: {} }));
  }, [dispatch, subcategoryId, productTypeId]);

  const handleProductTypeChange = (newProductTypeSlug: string) => {
    window.location.href = `/${subcategorySlug}/${newProductTypeSlug}`;
  };

  const selectedProductType = productTypesData?.productTypes?.data.find(
    (type) => type.id === productTypeId
  );

  const filters = filtersData?.productTypeFilters || {};

  return (
    <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:p-8 relative">
      <ProductTypeSelector
        types={productTypesData?.productTypes?.data || []}
        selectedTypeId={productTypeId}
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
        <ProductGrid
          subcategoryId={subcategoryId}
          productTypeId={productTypeId}
          productTypeSlug={productTypeSlug}
          subcategorySlug={subcategorySlug}
          pageSize={pageSize}
        />
      </div>
      <ReactMarkdown className="text-md">
        {selectedProductType?.attributes?.description}
      </ReactMarkdown>
    </div>
  );
};

export default ProductListingClient;
