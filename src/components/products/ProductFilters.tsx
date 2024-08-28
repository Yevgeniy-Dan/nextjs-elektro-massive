import React from "react";

interface Filter {
  id: string;
  title: string;
  values: string[];
}

interface ProductFiltersProps {
  filters: Filter[];
  appliedFilters: Record<string, string[]>;
  onFilterChange: (filterName: string, values: string[]) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  appliedFilters,
  onFilterChange,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {filters.map((filter) => (
        <div key={filter.id} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{filter.title}</h3>
          <div className="flex flex-col gap-2">
            {filter.values.map((value) => (
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
                    const newValues = e.target.checked
                      ? [...(appliedFilters[filter.title] || []), value]
                      : appliedFilters[filter.title]?.filter(
                          (v) => v !== value
                        ) || [];
                    onFilterChange(filter.title, newValues);
                  }}
                />
                {value}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductFilters;
