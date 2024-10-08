"use client";

import { CartItem } from "@/gql/graphql";

export const CART_LOCAL_STORAGE_NAME = "user_cart";

export const getCartItemsFromLocaleStorage: () => CartItem[] = () => {
  const cartItems = localStorage.getItem(CART_LOCAL_STORAGE_NAME);
  return cartItems ? JSON.parse(cartItems) : [];
};

export const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  localStorage.setItem(CART_LOCAL_STORAGE_NAME, JSON.stringify(cartItems));
};

export const updateCartItemInLocalStorage = (
  cartItem: CartItem,
  qtyChange: number
): CartItem[] => {
  //Never change like cartItem.quantity = 0; DO NOT DO THE OPERATIONS WITH cartItem.quantity
  const currentCart = getCartItemsFromLocaleStorage();

  const existingItemIndex = currentCart.findIndex(
    (item) => item.product.id === cartItem.product.id
  );

  if (existingItemIndex !== -1) {
    const updatedQuantity = Math.max(
      1,
      currentCart[existingItemIndex].quantity + qtyChange
    );

    currentCart[existingItemIndex].quantity = updatedQuantity;
  } else if (qtyChange > 0) {
    currentCart.push({ ...cartItem, quantity: qtyChange });
  }

  saveCartToLocalStorage(currentCart);

  return getCartItemsFromLocaleStorage();
};

export const removeCartItemFromLocalStorage = (productId: string): void => {
  const currentCart = getCartItemsFromLocaleStorage();
  const updatedCart = currentCart.filter(
    (item) => item.product.id !== productId
  );
  saveCartToLocalStorage(updatedCart);
};

export const clearCartFromLocalStorage = () => {
  localStorage.removeItem(CART_LOCAL_STORAGE_NAME);
};
