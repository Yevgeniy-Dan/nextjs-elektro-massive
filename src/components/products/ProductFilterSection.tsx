import React from "react";
import ProductFilters from "./ProductFilters";

interface ProductFilterSectionProps {
  filters: Record<string, string[]>;
  appliedFilters: Record<string, string[]>;
  onFilterChange: (filterName: string, values: string[]) => void;
}

const ProductFilterSection = ({
  appliedFilters,
  filters,
  onFilterChange,
}: ProductFilterSectionProps) => {
  const formattedFilters = Object.entries(filters).map(([key, values]) => ({
    id: key,
    title: key,
    values,
  }));

  return (
    <div className="w-1/4">
      <ProductFilters
        filters={formattedFilters}
        appliedFilters={appliedFilters}
        onFilterChange={onFilterChange}
      />
    </div>
  );
};

export default ProductFilterSection;
