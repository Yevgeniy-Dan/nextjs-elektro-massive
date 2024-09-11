"use client";

import { motion, AnimatePresence } from "framer-motion";
import useOutsideClick from "@/hooks/useOutsideClick";
import { ArrowLeft, Trash2, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openSignInModal } from "@/store/signInModalSlice";
import { useSession } from "next-auth/react";
import { clearAddedProduct, closeModal } from "@/store/storeSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  IAddToCartResponse,
  ICartItem,
  IGetUserCartResponse,
  IRemoveFromCartResponse,
  IUpdateCartItemResponse,
} from "@/types/cart";
import { useRouter } from "next/navigation";
import { CartItem } from "@/gql/graphql";
import {
  addItemToCookie,
  clearCartFromCookie,
  getCartItemsFromCookie,
  removeCartItemFromCookie,
  updateCartItemInCookie,
} from "@/app/utils/cartHeplers";
import CartHeader from "../cart/CartHeader";
import QuantityAdjuster from "../cart/QuantityAdjuster";
import CartItemList from "../cart/CartItemList";
import CartFooter from "../cart/CartFooter";
import { useCart } from "@/hooks/useCart";

const ShoppingCartModal = () => {
  const {
    isModalOpen,
    isLoading,
    cartItems,
    handleAddToCart,
    handleQuantityChange,
    handleClearCart,
    handleCloseModal,
  } = useCart();

  const { addedProduct } = useAppSelector((state) => state.store);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (addedProduct && cartItems) {
      const existingItem = cartItems.find(
        (item) => item.product.id === addedProduct.product.id
      );

      if (!existingItem) {
        handleAddToCart(addedProduct);
      } else {
        handleQuantityChange(existingItem.id, existingItem.quantity + 1);
      }

      dispatch(clearAddedProduct());
    }
  }, [
    addedProduct,
    cartItems,
    dispatch,
    handleAddToCart,
    handleQuantityChange,
  ]);

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
            <CartHeader
              onClose={handleCloseModal}
              onClearCart={handleClearCart}
            />
            <CartItemList isLoading={isLoading} items={cartItems} />
            <CartFooter />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCartModal;
