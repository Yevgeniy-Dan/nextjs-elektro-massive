import { gql } from "@apollo/client";

export const GET_FAVORITE_PRODUCTS = gql`
  query GetUserFavoriteProducts($locale: I18NLocaleCode!) {
    userFavorites(locale: $locale) {
      favoriteProducts {
        product {
          data {
            id
            attributes {
              title
              part_number
              retail
              currency
              image_link
              slug
              discount
              params
              subcategory {
                data {
                  id
                  attributes {
                    slug
                    categories {
                      data {
                        id
                        attributes {
                          slug
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        product_type {
          data {
            id
            attributes {
              title
              slug
            }
          }
        }
      }
    }
  }
`;

export const ADD_TO_FAVORITES = gql`
  mutation AddToFavorites(
    $input: AddToFavoritesInput!
    $locale: I18NLocaleCode!
  ) {
    addToFavorites(input: $input, locale: $locale) {
      favoriteProducts {
        product {
          data {
            id
            attributes {
              title
            }
          }
        }
        product_type {
          data {
            id
            attributes {
              title
            }
          }
        }
      }
    }
  }
`;

export const REMOVE_FROM_FAVORITES = gql`
  mutation RemoveFromFavorites(
    $input: RemoveFromFavoritesInput!
    $locale: I18NLocaleCode!
  ) {
    removeFromFavorites(input: $input, locale: $locale) {
      favoriteProducts {
        product {
          data {
            id
          }
        }
        product_type {
          data {
            id
          }
        }
      }
    }
  }
`;
