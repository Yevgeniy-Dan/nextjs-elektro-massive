import React from "react";

interface QuantityAdjusterProps {
  quantity: number;
  onQuantityChange: (qtyChange: number) => void;
}

const QuantityAdjuster: React.FC<QuantityAdjusterProps> = ({
  quantity,
  onQuantityChange,
}) => {
  return (
    <div className="flex items-center justify-center flex-1">
      <button
        onClick={() => onQuantityChange(-1)}
        className="px-3 py-1 border rounded"
      >
        -
      </button>
      <span className="mx-2">{quantity}</span>
      <button
        onClick={() => onQuantityChange(1)}
        className="px-3 py-1 border rounded"
      >
        +
      </button>
    </div>
  );
};

export default QuantityAdjuster;
