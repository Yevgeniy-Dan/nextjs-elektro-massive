import { useCart } from "@/hooks/useCart";
import React from "react";

const CartTotals = () => {
  const { calculateTotal, calculateDiscountTotal } = useCart();

  return (
    <>
      {calculateDiscountTotal !== 0 && (
        <p className="flex justify-between">
          <span>Знижка:</span>{" "}
          <span className="font-bold text-md">
            {calculateDiscountTotal.toFixed(2)} грн
          </span>
        </p>
      )}
      <div className="flex justify-between items-start text-lg mt-1 mb-4">
        <p className="my-0">Разом:</p>
        <div className="flex flex-col text-right">
          <span className="text-gray-400 text-sm line-through">
            {calculateDiscountTotal !== 0 && calculateTotal.toFixed(2) + "грн"}
          </span>
          <span className="font-bold">
            {(calculateTotal - calculateDiscountTotal).toFixed(2)} грн
          </span>
        </div>
      </div>
    </>
  );
};

export default CartTotals;
