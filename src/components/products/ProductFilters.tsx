import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateAppliedFilter } from "@/store/productGridSlice";
import React, { useCallback } from "react";
import FilterGroup from "./FilterGroup";

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
  const dispatch = useAppDispatch();
  const appliedFilters = useAppSelector(
    (state) => state.productGrid.appliedFilters[subcategoryId] || {}
  );

  const handleFilterChange = useCallback(
    (filterName: string, value: string, checked: boolean) => {
      const currentValues = appliedFilters[filterName] || [];
      const newValues = checked
        ? [...currentValues, value]
        : currentValues.filter((v) => v !== value);

      dispatch(
        updateAppliedFilter({
          subcategoryId,
          filterName,
          values: newValues,
        })
      );
    },
    [appliedFilters, dispatch, subcategoryId]
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-4 my-4">
      {filters.map((filter) => (
        <FilterGroup
          key={filter.id}
          title={filter.title}
          values={filter.values}
          appliedValues={appliedFilters[filter.title] || []}
          onChange={(value, checked) =>
            handleFilterChange(filter.title, value, checked)
          }
        />
      ))}
    </div>
  );
};

export default ProductFilters;
