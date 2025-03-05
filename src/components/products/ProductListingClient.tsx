"use client";

import React, { useState, useCallback, useMemo, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@apollo/client";
import ProductTypeSelector from "./ProductTypeSelector";

import { GET_BRANDS } from "@/graphql/queries/common";
import {
  GET_PRODUCT_TYPE_FILTERS,
  GET_PRODUCT_TYPES,
} from "@/graphql/queries/productType";
import ProductFilterSection from "./ProductFilterSection";
import {
  GetBrandsQuery,
  GetMaxPriceQuery,
  GetMaxPriceQueryVariables,
  GetProductTypeFiltersQuery,
  GetProductTypeFiltersQueryVariables,
  GetProductTypesQuery,
  GetProductTypesQueryVariables,
} from "@/gql/graphql";

import { Filter, X } from "lucide-react";
import useOutsideClick from "@/hooks/useOutsideClick";
import Breadcrumbs from "../shared/Breadcrumbs";
import BrandFilter from "../shared/BrandFilter";

import { useScrollToElement } from "@/hooks/useScrollToElement";
import { useRouter } from "next/navigation";
import ProductSorting from "./ProductSorting";
import { GET_MAX_PRICE } from "@/graphql/queries/products";
import dynamic from "next/dynamic";
import { useProductGridStore } from "@/store/useProductGridStore";

const ProductGrid = dynamic(() => import("./ProductGrid"), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const ReactMarkdown = dynamic(() => import("react-markdown"), {
  loading: () => <div>Loading markdown...</div>,
});

const MemoizedMarkdown: React.FC<{ children: string }> = memo(
  ({ children }) => (
    <ReactMarkdown className="text-md">{children}</ReactMarkdown>
  )
);

MemoizedMarkdown.displayName = "MemoizedMarkdown";

function isFiltersEmpty(filters: Record<string, string[]>) {
  return Object.keys(filters).length === 0;
}

interface ProductListingClientProps {
  categoryTitle: string;
  categorySlug: string;
  subcategoryId: string;
  subcategoryTitle: string;
  productTypeId?: string;
  subcategorySlug: string;
  productTypeSlug?: string;
  productTypeTitle?: string;
  subcategoryDescription?: string;
  lng: string;
}

const ProductListingClient: React.FC<ProductListingClientProps> = ({
  categoryTitle,
  categorySlug,
  subcategoryId,
  subcategoryTitle,
  productTypeId,
  subcategorySlug,
  subcategoryDescription,
  productTypeSlug,
  productTypeTitle,
  lng,
}) => {
  const productListingRef = useRef<HTMLDivElement>(null);
  const { scrollToElement } = useScrollToElement();

  const pageSize = 40;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [priceFilters, setPriceFilters] = useState<number[] | null>(null);

  const { appliedFilters, setAppliedFilters } = useProductGridStore();

  const handlePriceChange = (minPrice: number, maxPrice: number) => {
    setPriceFilters([minPrice, maxPrice]);
  };

  const router = useRouter();

  const customLabels: Record<string, string> = {
    [categorySlug]: categoryTitle,
    [subcategorySlug]: subcategoryTitle,
    [productTypeSlug || ""]: productTypeTitle || "",
  };

  const { data: brandsData } = useQuery<GetBrandsQuery>(GET_BRANDS);

  const { data: maxPriceData } = useQuery<
    GetMaxPriceQuery,
    GetMaxPriceQueryVariables
  >(GET_MAX_PRICE, {
    variables: {
      productTypeId: productTypeId || undefined,
      subcategoryId,
      locale: lng,
    },
  });

  const { data: productTypesData } = useQuery<
    GetProductTypesQuery,
    GetProductTypesQueryVariables
  >(GET_PRODUCT_TYPES, {
    variables: { subcategoryId, locale: lng },
  });

  const { data: filtersData } = useQuery<
    GetProductTypeFiltersQuery,
    GetProductTypeFiltersQueryVariables
  >(GET_PRODUCT_TYPE_FILTERS, {
    variables: { productTypeId, subcategoryId, locale: lng },
  });

  React.useEffect(() => {
    setAppliedFilters(subcategoryId, {});
  }, [setAppliedFilters, subcategoryId, productTypeId]);

  const handleProductTypeChange = useCallback(
    (newProductTypeSlug: string) => {
      const currentProductTypeSlug = productTypeSlug;
      if (currentProductTypeSlug === newProductTypeSlug) {
        router.push(`/${lng}/${categorySlug}/${subcategorySlug}`);
      } else {
        if (
          typeof window !== "undefined" &&
          typeof window.gtag === "function"
        ) {
          window.gtag("event", "navigation", {
            event_category: "Navigation",
            event_action: "Product Type Click",
            event_label: newProductTypeSlug,
            page_path: `/${lng}/${categorySlug}/${subcategorySlug}/${newProductTypeSlug}`,
          });
        }
        router.push(
          `/${lng}/${categorySlug}/${subcategorySlug}/${newProductTypeSlug}`
        );
      }
    },
    [router, lng, categorySlug, subcategorySlug, productTypeSlug]
  );

  const handleOutsideClick = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  const handleBrandsSelect = useCallback(
    (brandName: string) => {
      const currentFilters = appliedFilters[subcategoryId] || {};
      const newFilters = { ...currentFilters };
      const currentBrands = newFilters["Бренд"] || [];

      if (currentBrands.includes(brandName)) {
        newFilters["Бренд"] = currentBrands.filter(
          (brand) => brand !== brandName
        );
      } else {
        newFilters["Бренд"] = [...currentBrands, brandName];
      }

      if (newFilters["Бренд"]?.length === 0) {
        delete newFilters["Бренд"];
      }

      setAppliedFilters(subcategoryId, newFilters);
    },
    [appliedFilters, setAppliedFilters, subcategoryId]
  );

  const filterPanelRef = useOutsideClick(handleOutsideClick);

  const selectedProductType = productTypesData?.productTypes?.data.find(
    (type) => type.id === productTypeId
  );

  const filters = useMemo(
    () => filtersData?.productTypeFilters || {},
    [filtersData]
  );

  const brandsFilters = useMemo(() => {
    if (!brandsData || !filters) return [];

    const allFitlerValues = new Set(Object.values(filters).flat());

    return brandsData.brands?.data.filter((brand) =>
      allFitlerValues.has(brand.attributes?.title.trim())
    );
  }, [brandsData, filters]);

  const renderDescription = (desc: string) => (
    <MemoizedMarkdown>{desc}</MemoizedMarkdown>
  );

  const handleSortChange = (direction: "asc" | "desc") => {
    setSortDirection(direction);
  };

  return (
    <div
      className="max-w-7xl mx-auto p-4 sm:px-6 lg:p-8 relative"
      ref={productListingRef}
    >
      <Breadcrumbs customLabels={customLabels} />
      <h1 className="text-gray-700 font-medium mb-2 py-5 md:text-2xl lg:text-3xl">
        {productTypeSlug
          ? `${productTypeTitle} ${subcategoryTitle.toLowerCase()}`
          : subcategoryTitle}
      </h1>
      <ProductTypeSelector
        types={productTypesData?.productTypes?.data || []}
        selectedTypeId={productTypeId || ""}
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
      {brandsData?.brands?.data && (
        <BrandFilter
          brands={brandsFilters || []}
          selectedBrand={appliedFilters[subcategoryId]?.["Бренд"]?.[0] || null}
          onBrandSelect={handleBrandsSelect}
        />
      )}
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
                <ProductSorting
                  currentSort={{ direction: sortDirection }}
                  onSortChange={handleSortChange}
                  onPriceRangeChange={handlePriceChange}
                  maxPrice={maxPriceData?.maxProductPrice || 0}
                />
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
          <>
            <ProductSorting
              currentSort={{ direction: sortDirection }}
              onSortChange={handleSortChange}
              onPriceRangeChange={handlePriceChange}
              maxPrice={maxPriceData?.maxProductPrice || 0}
            />
            {!isFiltersEmpty(filters) && (
              <ProductFilterSection
                filters={filters}
                subcategoryId={subcategoryId}
              />
            )}
          </>
        </div>
        <ProductGrid
          subcategoryId={subcategoryId}
          productTypeId={productTypeId}
          productTypeSlug={productTypeSlug}
          subcategorySlug={subcategorySlug}
          pageSize={pageSize}
          sortDirection={sortDirection}
          onScrollToUp={() => {
            scrollToElement(productListingRef);
          }}
          lng={lng}
          priceRange={priceFilters}
        />
      </div>
      {subcategoryDescription
        ? renderDescription(subcategoryDescription)
        : productTypeId &&
          renderDescription(selectedProductType?.attributes?.description || "")}
    </div>
  );
};
export default ProductListingClient;
