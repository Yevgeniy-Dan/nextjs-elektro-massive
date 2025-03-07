import dynamic from "next/dynamic";
import React from "react";

const ProductFilters = dynamic(() => import("./ProductFilters"), {
  loading: () => <div>Loading filters...</div>,
});

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
