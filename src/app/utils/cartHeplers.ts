"use client";

import { CART_COOKIE_NAME } from "@/store/storeSlice";
import { ICartItem } from "@/types/cart";
import Cookie from "js-cookie";

export const getCartItemsFromCookie: () => ICartItem[] = () => {
  const cartItemsCookie = Cookie.get(CART_COOKIE_NAME);
  return cartItemsCookie ? JSON.parse(cartItemsCookie) : [];
};

export const addItemToCookie = (cartItem: ICartItem): void => {
  const currentCart = getCartItemsFromCookie();
  const existingItemIndex = currentCart.findIndex(
    (item) => item.id === cartItem.id
  );

  if (existingItemIndex > -1) {
    currentCart[existingItemIndex].quantity += cartItem.quantity;
  } else {
    currentCart.push(cartItem);
  }

  setCartItemsToCookie(currentCart);
};

export const setCartItemsToCookie = (cartItems: ICartItem[]) => {
  Cookie.set(CART_COOKIE_NAME, JSON.stringify(cartItems), { expires: 7 });
};

export const clearCartFromCookie = () => {
  Cookie.remove(CART_COOKIE_NAME);
};
