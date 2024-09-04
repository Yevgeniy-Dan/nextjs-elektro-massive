"use client";

import { useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  clearCart,
  closeModal,
  removeFromCart,
  updateQuantity,
} from "../store/storeSlice";
import ShoppingCartModal from "./shared/ShoppingCartModal";
import { useCartCalculations } from "@/hooks/useCartCalcutaions";

export default function CartModal() {
  const { cartItems, isModalOpen } = useAppSelector((state) => state.store);
  const dispatch = useAppDispatch();
  const { total, discountTotal } = useCartCalculations();

  return (
    <ShoppingCartModal
      cartItems={cartItems}
      onClose={() => dispatch(closeModal())}
      isOpen={isModalOpen}
      total={total}
      discount={discountTotal}
      onUpdateQuantity={(id, quantity) =>
        dispatch(updateQuantity({ id, quantity }))
      }
      onRemoveItem={(id) => dispatch(removeFromCart(id))}
      onClearCart={() => dispatch(clearCart())}
      onContinueShopping={() => dispatch(closeModal())}
    />
  );
}
