"use client";

import { CartItem } from "@/gql/graphql";
import { CART_COOKIE_NAME } from "@/store/storeSlice";
import Cookie from "js-cookie";
import { v4 as uuidv4 } from "uuid";

export const getCartItemsFromCookie: () => CartItem[] = () => {
  const cartItemsCookie = Cookie.get(CART_COOKIE_NAME);
  return cartItemsCookie ? JSON.parse(cartItemsCookie) : [];
};

export const saveCartToCookie = (cartItems: CartItem[]) => {
  Cookie.set(CART_COOKIE_NAME, JSON.stringify(cartItems), { expires: 7 });
};

export const addItemToCookie = (cartItem: CartItem): void => {
  const currentCart = getCartItemsFromCookie();

  const existingItemIndex = currentCart.findIndex(
    (item) => item.product.id === cartItem.product.id
  );

  if (existingItemIndex > -1) {
    currentCart[existingItemIndex].quantity += cartItem.quantity;
  } else {
    currentCart.push(cartItem);
  }

  saveCartToCookie(currentCart);
};

export const updateCartItemInCookie = (updatedItem: CartItem): void => {
  const currentCart = getCartItemsFromCookie();
  const updatedCart = currentCart.map((item) =>
    item.product.id === updatedItem.product.id ? updatedItem : item
  );
  saveCartToCookie(updatedCart);
};

export const removeCartItemFromCookie = (productId: string): void => {
  const currentCart = getCartItemsFromCookie();
  const updatedCart = currentCart.filter(
    (item) => item.product.id !== productId
  );
  saveCartToCookie(updatedCart);
};

export const clearCartFromCookie = () => {
  Cookie.remove(CART_COOKIE_NAME);
};
