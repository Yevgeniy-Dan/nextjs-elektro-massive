import React, { useCallback } from "react";
import FilterGroup from "./FilterGroup";
import { useProductGridStore } from "@/store/useProductGridStore";

interface Filter {
  id: string;
  title: string;
  values: string[];
}

interface ProductFiltersProps {
  filters: Filter[];
  subcategoryId: string;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  subcategoryId,
}) => {
  const { appliedFilters, updateAppliedFilter } = useProductGridStore();

  const handleFilterChange = useCallback(
    (filterName: string, value: string, checked: boolean) => {
      const currentValues: string[] =
        appliedFilters[subcategoryId]?.[filterName] || [];
      const newValues = checked
        ? [...currentValues, value]
        : currentValues.filter((v) => v !== value);

      updateAppliedFilter(subcategoryId, filterName, newValues);
    },
    [appliedFilters, subcategoryId, updateAppliedFilter]
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-4 my-4">
      {filters.map((filter) => (
        <FilterGroup
          key={filter.id}
          title={filter.title}
          values={filter.values}
          appliedValues={appliedFilters[subcategoryId]?.[filter.title] || []}
          onChange={(value, checked) =>
            handleFilterChange(filter.title, value, checked)
          }
        />
      ))}
    </div>
  );
};

export default ProductFilters;
