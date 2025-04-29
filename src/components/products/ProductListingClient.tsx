"use client";

import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  memo,
  Suspense,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@apollo/client";

import { GET_BRANDS } from "@/graphql/queries/common";
import {
  GET_PRODUCT_TYPE_FILTERS,
  GET_PRODUCT_TYPES,
} from "@/graphql/queries/productType";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GET_MAX_PRICE } from "@/graphql/queries/products";
import dynamic from "next/dynamic";
import { useProductGridStore } from "@/store/useProductGridStore";
import CenteredSpinner from "../shared/CenteredSpinner";

const ProductFilterSection = dynamic(() => import("./ProductFilterSection"));
const ProductSorting = dynamic(() => import("./ProductSorting"));
const ProductTypeSelector = dynamic(() => import("./ProductTypeSelector"));

const ProductGrid = dynamic(() => import("./ProductGrid"), {
  loading: () => <CenteredSpinner />,
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
  const pathname = usePathname();
  const productListingRef = useRef<HTMLDivElement>(null);
  const { scrollToElement } = useScrollToElement();

  const pageSize = 40;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [priceFilters, setPriceFilters] = useState<number[] | null>(null);

  const [filterWorker, setFilterWorker] = useState<Worker | null>(null);
  const [brandsFilters, setBrandsFilters] = useState<string[]>([]);

  const { appliedFilters, setAppliedFilters } = useProductGridStore();

  const handlePriceChange = (minPrice: number, maxPrice: number) => {
    setPriceFilters([minPrice, maxPrice]);

    const params = new URLSearchParams(searchParams.toString());

    params.delete("minPrice");
    params.delete("maxPrice");

    params.append("minPrice", minPrice.toString());
    params.append("maxPrice", maxPrice.toString());

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(newUrl, { scroll: false });
  };

  const router = useRouter();
  const searchParams = useSearchParams();

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

  const filters = useMemo(
    () => filtersData?.productTypeFilters || {},
    [filtersData]
  );

  useEffect(() => {
    const urlFilters: Record<string, string[]> = {};
    let hasFilters = false;

    const slugToFitlerName: Record<string, string> = {};

    if (filtersData?.productTypeFilters) {
      Object.entries(filtersData.productTypeFilters).forEach(
        ([filterName, filterData]: [string, any]) => {
          slugToFitlerName[filterData.slug] = filterName;
        }
      );
    }

    searchParams.forEach((value, key) => {
      const filterName = slugToFitlerName[key];
      if (filterName) {
        if (!urlFilters[filterName]) {
          urlFilters[filterName] = [];
        }

        urlFilters[filterName].push(value);
        hasFilters = true;
      }

      if (key === "sort" && (value === "asc" || value === "desc")) {
        setSortDirection(value);
      }
    });

    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    if (minPriceParam && maxPriceParam) {
      const minPrice = parseInt(minPriceParam, 10);
      const maxPrice = parseInt(maxPriceParam, 10);

      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        setPriceFilters([minPrice, maxPrice]);
      }
    }

    if (hasFilters) {
      setAppliedFilters(subcategoryId, urlFilters);
    } else {
      setAppliedFilters(subcategoryId, {});
    }
  }, [
    setAppliedFilters,
    subcategoryId,
    productTypeId,
    searchParams,
    filtersData,
    lng,
  ]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const newWorker = new Worker(
        new URL("@/workers/filterWorker.ts", import.meta.url)
      );
      setFilterWorker(newWorker);
      return () => newWorker.terminate();
    }
  }, []);

  useEffect(() => {
    if (filterWorker && brandsData?.brands?.data && filters) {
      filterWorker.postMessage({ filters, brands: brandsData.brands.data });
      filterWorker.onmessage = (e) => {
        setBrandsFilters(e.data);
      };
    }
  }, [filterWorker, brandsData, filters]);

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

      newFilters["brend"] = [brandName];

      if (newFilters["brend"]?.length === 0) {
        delete newFilters["brend"];
      }

      setAppliedFilters(subcategoryId, newFilters);
    },
    [appliedFilters, setAppliedFilters, subcategoryId]
  );

  const filterPanelRef = useOutsideClick(handleOutsideClick);

  const selectedProductType = productTypesData?.productTypes?.data.find(
    (type) => type.id === productTypeId
  );

  const renderDescription = (desc: string) => (
    <MemoizedMarkdown>{desc}</MemoizedMarkdown>
  );

  const handleSortChange = (direction: "asc" | "desc") => {
    setSortDirection(direction);

    const params = new URLSearchParams(searchParams.toString());

    params.delete("sort");

    params.append("sort", direction);

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      className="max-w-7xl mx-auto p-4 sm:px-6 lg:p-8 relative"
      ref={productListingRef}
    >
      <Breadcrumbs customLabels={customLabels} />
      <h1 className="text-gray-700 font-medium mb-2 py-5 md:text-2xl lg:text-3xl">
        {productTypeSlug ? `${productTypeTitle}` : subcategoryTitle}
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
          selectedBrand={appliedFilters[subcategoryId]?.["brend"]?.[0] || null}
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
                  values={priceFilters || []}
                />
                {!isFiltersEmpty(filters) && (
                  <ProductFilterSection
                    filters={filters}
                    subcategoryId={subcategoryId}
                    lng={lng}
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
              values={priceFilters || []}
            />
            {!isFiltersEmpty(filters) && (
              <ProductFilterSection
                filters={filters}
                subcategoryId={subcategoryId}
                lng={lng}
              />
            )}
          </>
        </div>
        <Suspense fallback={<div>Loading product grid...</div>}>
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
        </Suspense>
      </div>
      {subcategoryDescription
        ? renderDescription(subcategoryDescription)
        : productTypeId &&
          renderDescription(selectedProductType?.attributes?.description || "")}
    </div>
  );
};
export default ProductListingClient;
