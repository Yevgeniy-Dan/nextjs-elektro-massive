"use client";

import { CartItem } from "@/gql/graphql";
import { Language, languages } from "../i18n/settings";

export const CART_LOCAL_STORAGE_NAME = "user_cart";

const getLocalizedStorageKey = (locale: Language): string => {
  return `${CART_LOCAL_STORAGE_NAME}_${locale}`;
};

export const getCartItemsFromLocaleStorage = (locale: Language): CartItem[] => {
  const cartItems = localStorage.getItem(getLocalizedStorageKey(locale));
  return cartItems ? JSON.parse(cartItems) : [];
};

export const saveCartToLocalStorage = (
  cartItems: CartItem[],
  locale: Language
): void => {
  localStorage.setItem(
    getLocalizedStorageKey(locale),
    JSON.stringify(cartItems)
  );
};

export const updateCartItemInLocalStorage = (
  cartItem: CartItem,
  qtyChange: number,
  currentLocale: Language
): CartItem[] => {
  //Never change like cartItem.quantity = 0; DO NOT DO THE OPERATIONS WITH cartItem.quantity

  languages.forEach((locale) => {
    const currentCart = getCartItemsFromLocaleStorage(currentLocale);

    const localizedProductId =
      locale === currentLocale
        ? cartItem.product.id
        : cartItem.product.localizations?.data.find(
            (loc) => loc.attributes?.locale === locale
          )?.id;

    if (!localizedProductId) {
      console.warn(`No localized product found for locale: ${locale}`);
      return;
    }

    const existingItemIndex = currentCart.findIndex(
      (item) => item.product.id === localizedProductId
    );

    if (existingItemIndex !== -1) {
      const updatedQuantity = Math.max(
        1,
        currentCart[existingItemIndex].quantity + qtyChange
      );

      currentCart[existingItemIndex].quantity = updatedQuantity;
    } else if (qtyChange > 0) {
      const localizedProduct = {
        ...cartItem.product,
        id: localizedProductId,
      };
      currentCart.push({
        ...cartItem,
        product: localizedProduct,
        quantity: qtyChange,
      });
    }
    saveCartToLocalStorage(currentCart, locale);
  });

  return getCartItemsFromLocaleStorage(currentLocale);
};

export const removeCartItemFromLocalStorage = (
  productId: string,
  product: CartItem["product"],
  currentLocale: Language
): void => {
  languages.forEach((locale) => {
    const currentCart = getCartItemsFromLocaleStorage(locale);

    const localizedProductId =
      currentLocale === locale
        ? productId
        : product.localizations?.data.find(
            (loc) => loc.attributes?.locale === locale
          )?.id;
    if (!localizedProductId) {
      console.warn(`No localized product found for locale: ${locale}`);
      return;
    }

    const updatedCart = currentCart.filter(
      (item) => item.product.id !== localizedProductId
    );
    saveCartToLocalStorage(updatedCart, locale);
  });
};

export const clearCartFromLocalStorage = () => {
  languages.forEach((locale) => {
    localStorage.removeItem(getLocalizedStorageKey(locale));
  });
};
