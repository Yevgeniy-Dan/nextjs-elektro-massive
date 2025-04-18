import { gql } from "@apollo/client";

export const CART_PRODUCT_FIELDS = gql`
  fragment CartProductFields on Product {
    id
    title
    retail
    currency
    discount
    image_link
    parameter_values {
      data {
        id
        attributes {
          value
          code
          parameter_type {
            data {
              id
              attributes {
                name
                slug
              }
            }
          }
        }
      }
    }
    part_number
    slug
    locale
    localizations {
      data {
        id
        attributes {
          locale
          slug
        }
      }
    }
  }
`;

// FOR CART ZUZTAND STORE IF USER IS NOT AUTH
export const GET_PRODUCTS_BY_IDS_QUERY = gql`
  query GetProductsByIds($ids: [ID!]!, $locale: I18NLocaleCode!) {
    products(filters: { id: { in: $ids } }, locale: $locale) {
      data {
        id
        attributes {
          ...CartProductFields
        }
      }
    }
  }
  ${CART_PRODUCT_FIELDS}
`;

export const CART_ITEM_FIELDS = gql`
  fragment CartItemFields on CartItem {
    id
    quantity
    product {
      ...CartProductFields
    }
  }
`;

export const GET_AUTH_USER_CART_QUERY = gql`
  ${CART_PRODUCT_FIELDS}
  ${CART_ITEM_FIELDS}
  query GetUserCart($locale: I18NLocaleCode!) {
    userCart(locale: $locale) {
      cart {
        cart_items {
          ...CartItemFields
        }
      }
    }
  }
`;

export const UPDATE_CART_ITEM_MUTATION = gql`
  ${CART_PRODUCT_FIELDS}
  ${CART_ITEM_FIELDS}
  mutation UpdateCartItem(
    $input: UpdateCartItemInput!
    $locale: I18NLocaleCode!
  ) {
    updateCartItem(input: $input, locale: $locale) {
      cart {
        cart_items {
          ...CartItemFields
        }
      }
    }
  }
`;

export const REMOVE_FROM_CART_MUTATION = gql`
  ${CART_PRODUCT_FIELDS}
  ${CART_ITEM_FIELDS}
  mutation RemoveFromCart(
    $input: RemoveFromCartInput!
    $locale: I18NLocaleCode!
  ) {
    removeFromCart(input: $input, locale: $locale) {
      cart {
        cart_items {
          ...CartItemFields
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

export const SYNC_CART_MUTATION = gql`
  ${CART_PRODUCT_FIELDS}
  ${CART_ITEM_FIELDS}
  mutation SyncCartBySignIn($input: SyncCartInput!, $locale: I18NLocaleCode!) {
    syncCartBySingIn(input: $input, locale: $locale) {
      cart {
        cart_items {
          ...CartItemFields
        }
      }
    }
  }
`;
