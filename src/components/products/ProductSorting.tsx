import React, { useEffect, useMemo, useState } from "react";

import { ChevronUp, ChevronDown } from "lucide-react";
import { Slider } from "../ui/slider";

export type SortOption = {
  direction: "asc" | "desc";
};

interface ProductSortingProps {
  onSortChange: (direction: "asc" | "desc") => void;
  onPriceRangeChange: (maxPrice: number) => void;
  currentSort?: SortOption;
  maxPrice: number;
}

const ProductSorting: React.FC<ProductSortingProps> = ({
  currentSort,
  onSortChange,
  onPriceRangeChange,
  maxPrice,
}) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    setSliderValue(maxPrice);
  }, [maxPrice]);

  const handleSortClick = () => {
    const newDirection = currentSort?.direction === "asc" ? "desc" : "asc";
    onSortChange(newDirection);
  };

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
    setIsDragging(true);
  };

  const handleSliderDragEnd = (value: number[]) => {
    setIsDragging(false);
    onPriceRangeChange(value[0]);
  };

  return (
    <div className="flex flex-col w-full gap-4 p-4 border rounded-lg bg-white">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Сортувати за ціною:</span>
        <button
          onClick={handleSortClick}
          className="flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-100"
        >
          {currentSort?.direction === "asc" ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      <div className="px-2">
        <Slider
          defaultValue={[maxPrice]}
          max={maxPrice}
          min={0}
          step={1}
          value={[sliderValue]}
          onValueChange={handleSliderChange}
          onValueCommit={handleSliderDragEnd}
          className="w-full"
        />
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>0 ₴</span>
        <span className={isDragging ? "text-blue-500 font-medium" : ""}>
          {sliderValue.toLocaleString()} ₴
        </span>
      </div>
    </div>
  );
};

export default ProductSorting;
