"use client";

import React, { useState, useEffect, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import ProductTypeSelector from "./ProductTypeSelector";
import ProductFilters from "./ProductFilters";
import { ProductItem, ProductsResponse } from "@/types/product";
import { FiltersQueryResult } from "@/types/productFilters";
import TopCard from "../home/TopCard";
import { useDebugLog } from "@/hooks/useDebugLog";
import { useFetchAllData } from "../utils/fetchAllData";
import { ProductTypesResponse } from "@/types/productTypes";

interface ProductListingClientProps {
  subcategory: string;
}

const GET_PRODUCT_TYPES = gql`
  query GetProductTypes($subcategory: String!) {
    productTypes(
      filters: { subcategory: { slug: { eq: $subcategory } } }
      pagination: { limit: -1 }
    ) {
      data {
        id
        attributes {
          title
          slug
        }
      }
      meta {
        pagination {
          total
        }
      }
    }
  }
`;

const GET_PRODUCTS = gql`
  query GetProducts($subcategory: String!, $productType: String!) {
    products(
      filters: {
        subcategory: { slug: { eq: $subcategory } }
        product_types: { slug: { eq: $productType } }
      }
    ) {
      data {
        id
        attributes {
          title
          retail
          params(pagination: { limit: -1 }) {
            key
            value
          }
        }
      }
    }
  }
`;

const GET_PRODUCT_FILTERS = gql`
  query GetProductFilters($productType: String!) {
    productFilters(
      filters: {
        FilterValues: { product_type: { slug: { eq: $productType } } }
      }
      pagination: { limit: -1 }
    ) {
      data {
        attributes {
          title
          alternative_titles {
            title
          }
          FilterValues {
            values
          }
        }
      }
      meta {
        pagination {
          total
        }
      }
    }
  }
`;

const ProductListingClient: React.FC<ProductListingClientProps> = ({
  subcategory,
}) => {
  const [selectedProductType, setSelectedProductType] = useState<string | null>(
    null
  );
  const [appliedFilters, setAppliedFilters] = useState<
    Record<string, string[]>
  >({});

  const { data: productTypesData } = useQuery<ProductTypesResponse>(
    GET_PRODUCT_TYPES,
    {
      variables: { subcategory },
      skip: !subcategory,
    }
  );

  const { data: productsData, loading: productsLoading } =
    useQuery<ProductsResponse>(GET_PRODUCTS, {
      variables: { subcategory, productType: selectedProductType },
      skip: !subcategory || !selectedProductType,
    });

  const { data: filtersData } = useQuery<FiltersQueryResult>(
    GET_PRODUCT_FILTERS,
    {
      variables: { productType: selectedProductType },
      skip: !selectedProductType,
    }
  );

  useEffect(() => {
    if (
      productTypesData?.productTypes.data &&
      productTypesData?.productTypes.data.length > 0
    ) {
      setSelectedProductType(
        productTypesData.productTypes.data[0].attributes.slug
      );
    }
  }, [productTypesData]);

  const handleProductTypeChange = (type: string) => {
    setSelectedProductType(type);
    setAppliedFilters({});
  };

  const handleFilterChange = (filterName: string, values: string[]) => {
    setAppliedFilters((prev) => ({ ...prev, [filterName]: values }));
  };

  const filters = useMemo(() => {
    return (
      filtersData?.productFilters.data.map((filter) => ({
        id: filter.id, // Using title as id for simplicity
        title: filter.attributes.title,
        alternativeTitles: filter.attributes.alternative_titles.map(
          (alt) => alt.title
        ),
        values: filter.attributes.FilterValues[0]?.values || [],
      })) || []
    );
  }, [filtersData]);

  const filteredProducts = useMemo(() => {
    if (!productsData?.products?.data) return [];

    return productsData.products.data.filter((product: ProductItem) => {
      return Object.entries(appliedFilters).every(
        ([filterName, filterValues]) => {
          if (filterValues.length === 0) return true;

          const paramMatch = product.attributes.params.find((param) => {
            const mathcingFilter = filters.find(
              (f) =>
                f.title === filterName ||
                f.alternativeTitles.includes(filterName)
            );
            return (
              param.key === mathcingFilter?.title ||
              mathcingFilter?.alternativeTitles.includes(param.key)
            );
          });
          if (!paramMatch) return false;

          return filterValues.includes(paramMatch.value);
        }
      );
    });
  }, [productsData, appliedFilters, filters]);

  // useDebugLog("productTypesData", productTypesData);
  // useDebugLog("productsData", productsData);
  // useDebugLog("filtersData", filtersData);
  // useDebugLog("selectedProductType", selectedProductType);
  // useDebugLog("filters", filters);

  return (
    <div className="product-listing-page">
      <ProductTypeSelector
        types={productTypesData?.productTypes?.data || []}
        selectedType={selectedProductType}
        onTypeChange={handleProductTypeChange}
      />
      <div className="product-content">
        <ProductFilters
          filters={filters}
          appliedFilters={appliedFilters}
          onFilterChange={handleFilterChange}
        />
        {productsLoading ? (
          <div>Завантаження товарів...</div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <TopCard
                key={product.id}
                title={product.attributes.title}
                retail={product.attributes.retail}
                currency={product.attributes.currency}
                // imageSrc={
                //   product.attributes.
                // }
              />
            ))}
          </div>
        ) : (
          <div>Товари не знайдено.</div>
        )}
      </div>
    </div>
  );
};

export default ProductListingClient;
