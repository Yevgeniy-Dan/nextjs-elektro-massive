import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setAppliedFilters,
  updateAppliedFilter,
} from "@/store/productGridSlice";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

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
  const [expandedFilters, setExpandedFilters] = useState<
    Record<string, boolean>
  >({});

  const toggleFilter = (filterId: string) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterId]: !prev[filterId],
    }));
  };

  const handleFilterChange = (
    filterName: string,
    value: string,
    checked: boolean
  ) => {
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
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 my-4">
      {filters.map((filter) => {
        const isExpanded = expandedFilters[filter.id];
        const displayValues = isExpanded
          ? filter.values
          : filter.values.slice(0, 6);
        const hasMoreValues = filter.values.length > 6;

        return (
          <div key={filter.id} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{filter.title}</h3>
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-2 ${
                !hasMoreValues || isExpanded ? "h-auto" : "max-h-[144px]"
              } overflow-hidden`}
            >
              {displayValues.map((value) => (
                <label
                  key={value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-red-600 rounded border-gray-300 focus:ring-red-500"
                    checked={
                      appliedFilters[filter.title]?.includes(value) || false
                    }
                    onChange={(e) => {
                      handleFilterChange(filter.title, value, e.target.checked);
                    }}
                  />
                  {value}
                </label>
              ))}
            </div>
            {hasMoreValues && (
              <button
                onClick={() => toggleFilter(filter.id)}
                className="mt-2 p-1 flex justify-center items-center rounded-md text-blue-500 hover:text-blue-800 transition-colors duration-200"
              >
                <span className="flex flex-row items-center">
                  {isExpanded ? "Сховати" : "Показати ще"}
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 ml-1" />
                  ) : (
                    <ChevronDown className="h-5 w-5 ml-1" />
                  )}
                </span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductFilters;
