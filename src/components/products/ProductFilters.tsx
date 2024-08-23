import React from "react";

interface Filter {
  id: string;
  title: string;
  alternativeTitles: string[];
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
    <div className="product-filters">
      {filters.map((filter) => (
        <div key={filter.id} className="filter-group">
          <h3>{filter.title}</h3>
          {/* {filter.alternativeTitles.length > 0 && (
            <p className="alternative-titles">
              {filter.alternativeTitles.join(", ")}
            </p>
          )} */}
          {filter.values.map((value) => (
            <label key={value} className="filter-option">
              <input
                type="checkbox"
                checked={appliedFilters[filter.title]?.includes(value) || false}
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
      ))}
    </div>
  );
};

export default ProductFilters;
