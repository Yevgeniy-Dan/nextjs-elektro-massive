import React from "react";
import ProductFilters from "./ProductFilters";

interface ProductFilterSectionProps {
  filters: Record<string, string[]>;
  subcategoryId: string;
}

const ProductFilterSection = ({
  subcategoryId,
  filters,
}: ProductFilterSectionProps) => {
  const formattedFilters = Object.entries(filters).map(([key, values]) => ({
    id: key,
    title: key,
    values,
  }));

  return (
    <ProductFilters filters={formattedFilters} subcategoryId={subcategoryId} />
  );
};

export default ProductFilterSection;
