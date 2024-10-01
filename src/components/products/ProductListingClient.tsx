"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Filter, X } from "lucide-react";
import useOutsideClick from "@/hooks/useOutsideClick";
import Breadcrumbs from "../shared/Breadcrumbs";

function isFiltersEmpty(filters: Record<string, string[]>) {
  return Object.keys(filters).length === 0;
}

interface ProductListingClientProps {
  subcategoryId: string;
  subcategoryTitle: string;
  productTypeId: string;
  subcategorySlug: string;
  productTypeSlug: string;
  productTypeTitle: string;
}

const ProductListingClient: React.FC<ProductListingClientProps> = ({
  subcategoryId,
  subcategoryTitle,
  productTypeId,
  subcategorySlug,
  productTypeSlug,
  productTypeTitle,
}) => {
  const dispatch = useAppDispatch();
  const pageSize = 10;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const customLabels = {
    [subcategorySlug]: subcategoryTitle,
    [productTypeSlug]: productTypeTitle,
  };

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

  const handleOutsideClick = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  const filterPanelRef = useOutsideClick(handleOutsideClick);

  const selectedProductType = productTypesData?.productTypes?.data.find(
    (type) => type.id === productTypeId
  );

  const filters = filtersData?.productTypeFilters || {};

  return (
    <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:p-8 relative">
      <Breadcrumbs customLabels={customLabels} />
      <ProductTypeSelector
        types={productTypesData?.productTypes?.data || []}
        selectedTypeId={productTypeId}
        onTypeChange={handleProductTypeChange}
      />
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center justify-center  p-2 bg-gray-200 rounded-md"
        >
          <Filter />
        </button>
      </div>
      <div className="flex gap-8">
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              ref={filterPanelRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-[50%] md:hidden md:w-1/4 bg-white shadow-lg overflow-y-auto"
            >
              <div className="p-4 relative">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  aria-label="Close filters"
                >
                  <X size={24} />
                </button>
                {!isFiltersEmpty(filters) && (
                  <ProductFilterSection
                    filters={filters}
                    subcategoryId={subcategoryId}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="hidden md:block w-1/4">
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
