import { IProductParams } from "./types";

export interface ICartProductInput {
  productId: string;
  quantity: number;
}

export interface ICartProduct {
  id: string;
  title: string;
  retail: number;
  currency: string;
  discount: number | null;
  image_link: string;
  params?: IProductParams;
}

export interface ICartItem {
  id: string;
  product: ICartProduct;
  quantity: number;
}

interface ICart {
  cart_items: ICartItem[];
}

interface ICartResponse {
  cart: ICart;
}

export interface ISyncCartMutationResponse {
  data: { data: { syncCartBySingIn: ICartResponse } };
}

export interface IAddToCartResponse {
  data: { addToCart: ICartResponse };
}

export interface IUpdateCartItemResponse {
  data: { updateCartItem: ICartResponse };
}

export interface IRemoveFromCartResponse {
  data: { removeFromCart: ICartResponse };
}

export interface IGetUserCartResponse {
  data: {
    userCart: ICartResponse;
  };
}
