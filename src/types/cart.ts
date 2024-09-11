interface ICartProductInput {
  id: string;
  quantity: number;
}

export interface ISyncCartInput {
  input: {
    products: ICartProductInput[];
  };
}

interface IUser {
  username: string;
}

export interface ICartProduct {
  id: string;
  title: string;
  retail: number;
  currency: string;
  discount: number;
  image_link: string;
  // Add other product fields as needed
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

export interface IGetUserCartResponse {
  userCart: ICartResponse;
}
