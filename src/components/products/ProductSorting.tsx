import React from "react";

import { ChevronUp, ChevronDown } from "lucide-react";

export type SortOption = {
  direction: "asc" | "desc";
};

interface SortingProps {
  onSortChange: (direction: "asc" | "desc") => void;
  currentSort?: SortOption;
}

const ProductSorting: React.FC<SortingProps> = ({
  currentSort,
  onSortChange,
}) => {
  const handleSortClick = () => {
    const newDirection = currentSort?.direction === "asc" ? "desc" : "asc";
    onSortChange(newDirection);
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-sm font-medium">Сортувати за:</span>
      <button
        onClick={handleSortClick}
        className="flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-100"
      >
        <span>Ціною</span>
        {currentSort?.direction === "asc" ? (
          <ChevronUp size={16} />
        ) : (
          <ChevronDown size={16} />
        )}
      </button>
    </div>
  );
};

export default ProductSorting;
