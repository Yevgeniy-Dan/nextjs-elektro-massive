import dynamic from "next/dynamic";
import React from "react";

const ProductFilters = dynamic(() => import("./ProductFilters"), {
  loading: () => <div>Loading filters...</div>,
});

interface ProductFilterSectionProps {
  filters: Record<
    string,
    { slug: string; values: { value: string; code: string }[] }
  >;
  subcategoryId: string;
  lng: string;
}

const ProductFilterSection = ({
  subcategoryId,
  filters,
  lng,
}: ProductFilterSectionProps) => {
  const formattedFilters = Object.entries(filters).map(([key, data]) => ({
    id: key,
    title: key,
    slug: data.slug,
    values: data.values.map((item) => ({
      value: item.value,
      code: item.code,
    })),
  }));

  return (
    <ProductFilters
      filters={formattedFilters}
      subcategoryId={subcategoryId}
      lng={lng}
    />
  );
};

export default ProductFilterSection;
