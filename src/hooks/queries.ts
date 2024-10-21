import { gql } from "@apollo/client";

export const SYNC_CART_MUTATION = gql`
  mutation SyncCartBySignIn($input: SyncCartInput!, $locale: I18NLocaleCode!) {
    syncCartBySingIn(input: $input, locale: $locale) {
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
            part_number
            params
          }
        }
      }
    }
  }
`;
