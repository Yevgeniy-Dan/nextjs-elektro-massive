import React, { useCallback, useEffect, useRef } from "react";
import FilterGroup from "./FilterGroup";
import { useProductGridStore } from "@/store/useProductGridStore";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface Filter {
  id: string;
  title: string;
  slug: string;
  values: { value: string; code: string }[];
}

interface ProductFiltersProps {
  filters: Filter[];
  subcategoryId: string;
  lng: string;
}

const MemoizedFilterGroup = React.memo(FilterGroup);

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  subcategoryId,
  lng,
}) => {
  const { appliedFilters, updateAppliedFilter } = useProductGridStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleFilterChange = useCallback(
    (
      filterName: string,
      slug: string,
      code: string,
      value: string,
      checked: boolean
    ) => {
      const currentCodes: string[] =
        appliedFilters[subcategoryId]?.[filterName] || [];
      let newCodes: string[] = [];

      if (checked) {
        if (slug === "brend") {
          newCodes = [code];
        } else {
          newCodes = [...currentCodes, code];
        }
      } else {
        newCodes = currentCodes.filter((v) => v !== code);
      }

      updateAppliedFilter(subcategoryId, filterName, newCodes);

      const params = new URLSearchParams(searchParams.toString());
      params.delete(slug);
      newCodes.forEach((code) => params.append(slug, code));
      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(newUrl, { scroll: false });
    },
    [
      appliedFilters,
      subcategoryId,
      updateAppliedFilter,
      searchParams,
      pathname,
      router,
    ]
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-4 my-4">
      {filters.map((filter) => (
        <MemoizedFilterGroup
          key={filter.id}
          title={filter.title}
          values={filter.values}
          appliedValues={appliedFilters[subcategoryId]?.[filter.title] || []}
          onChange={(value, code, checked) =>
            handleFilterChange(filter.title, filter.slug, code, value, checked)
          }
        />
      ))}
    </div>
  );
};

export default ProductFilters;
