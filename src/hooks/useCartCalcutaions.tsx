"use client";

import { useAppSelector } from "@/store/hooks";
import { useMemo } from "react";

export const useCartCalculations = () => {
  const { cartItems } = useAppSelector((state) => state.store);

  const calculateTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.retail * item.quantity,
      0
    );
  }, [cartItems]);

  const calculateDiscountTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + ((item.retail * item.discount ?? 0) / 100) * item.quantity,
      0
    );
  }, [cartItems]);

  return {
    total: calculateTotal,
    discountTotal: calculateDiscountTotal,
  };
};
