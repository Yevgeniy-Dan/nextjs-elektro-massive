import { CartResponse } from "@/gql/graphql";

export interface ISyncCartMutationResponse {
  data: { data: { syncCartBySingIn: CartResponse } };
}

export interface IAddToCartResponse {
  data: { addToCart: CartResponse };
}

export interface IUpdateCartItemResponse {
  data: { updateCartItem: CartResponse };
}

export interface IRemoveFromCartResponse {
  data: { removeFromCart: CartResponse };
}

export interface IGetUserCartResponse {
  data: {
    userCart: CartResponse;
  };
}
