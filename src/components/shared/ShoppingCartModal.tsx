"use client";

import { motion, AnimatePresence } from "framer-motion";
import useOutsideClick from "@/hooks/useOutsideClick";

import React, { Suspense } from "react";

import CartHeader from "../cart/CartHeader";
import CartItemList from "../cart/CartItemList";
import CartFooter from "../cart/CartFooter";
import { useCart } from "@/hooks/useCart";

interface ShoppingCartModalProps {
  lng: string;
}

const ShoppingCartModal: React.FC<ShoppingCartModalProps> = ({ lng }) => {
  const {
    isModalOpen,
    isLoading,
    cartItems,
    handleClearCart,
    handleCloseModal,
  } = useCart();

  const modalRef = useOutsideClick(handleCloseModal);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-md max-w-xl w-full mx-auto flex flex-col max-h-[90vh]"
          >
            <Suspense fallback={<div>Loading cart header...</div>}>
              <CartHeader
                lng={lng}
                onClose={handleCloseModal}
                onClearCart={handleClearCart}
              />
            </Suspense>
            <Suspense fallback={<div>Loading cart items...</div>}>
              <CartItemList lng={lng} isLoading={isLoading} items={cartItems} />
            </Suspense>
            <Suspense fallback={<div>Loading cart footer...</div>}>
              <CartFooter lng={lng} />
            </Suspense>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCartModal;
