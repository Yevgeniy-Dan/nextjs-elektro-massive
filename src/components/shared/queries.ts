import { gql } from "@apollo/client";

export const SEARCH_PRODUCTS = gql`
  query GetSearchProducts($searchTerm: String!, $locale: I18NLocaleCode!) {
    products(filters: { title: { containsi: $searchTerm } }, locale: $locale) {
      data {
        id
        attributes {
          part_number
          title
          retail
          currency
          image_link
          slug
          params
          additional_images {
            link
          }
          subcategory {
            data {
              id
              attributes {
                slug
              }
            }
          }
          product_types {
            data {
              id
              attributes {
                slug
              }
            }
          }
          discount
        }
      }
    }
  }
`;
