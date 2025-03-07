import { CartItemType } from "@/types/types";

self.onmessage = (e: MessageEvent<{ cartItems: CartItemType[] }>) => {
  const { cartItems } = e.data;

  const total = cartItems.reduce(
    (total, item) => total + item.product.retail * item.quantity,
    0
  );

  const discountTotal = cartItems.reduce((total, item) => {
    const discount = item.product.discount || 0;
    const discountedPrice =
      item.product.retail - (item.product.retail * discount) / 100;
    return total + discountedPrice * item.quantity;
  }, 0);

  const itemCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  self.postMessage({ total, discountTotal, itemCount });
};
