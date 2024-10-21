import { gql } from "@apollo/client";

export const GET_AUTH_USER_CART_QUERY = gql`
  query GetUserCart($locale: I18NLocaleCode!) {
    userCart(locale: $locale) {
      cart {
        cart_items {
          id
          quantity
          product {
            id
            title
            retail
            currency
            discount
            image_link
            params
            part_number
            slug
          }
        }
      }
    }
  }
`;

export const UPDATE_CART_ITEM_MUTATION = gql`
  mutation UpdateCartItem(
    $input: UpdateCartItemInput!
    $locale: I18NLocaleCode!
  ) {
    updateCartItem(input: $input, locale: $locale) {
      cart {
        cart_items {
          id
          quantity
          product {
            id
            title
            retail
            currency
            discount
            image_link
            params
            part_number
            slug
          }
        }
      }
    }
  }
`;

export const REMOVE_FROM_CART_MUTATION = gql`
  mutation RemoveFromCart(
    $input: RemoveFromCartInput!
    $locale: I18NLocaleCode!
  ) {
    removeFromCart(input: $input, locale: $locale) {
      cart {
        cart_items {
          id
          quantity
          product {
            id
            title
            retail
            currency
            discount
            image_link
            params
            part_number
          }
        }
      }
    }
  }
`;

export const CLEAR_CART_MUTATION = gql`
  mutation ClearCart($locale: I18NLocaleCode!) {
    clearCart(locale: $locale) {
      cart {
        cart_items {
          id
          quantity
          product {
            id
          }
        }
      }
    }
  }
`;
