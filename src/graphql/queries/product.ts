import { gql } from "@apollo/client";

// DO NOT COMMENT OR DELETE
// IT IS NEEDED FOR graphql-codegen
export const GET_PRODUCT = gql`
  query GetProduct($productId: ID!) {
    product(id: $productId) {
      data {
        id
        attributes {
          part_number
          title
          retail
          currency
          image_link
          description
          discount
          slug
          additional_images {
            id
            link
          }
          params
          subcategory {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug(
    $productSlug: String!
    $productTypeSlug: String!
    $locale: I18NLocaleCode!
  ) {
    products(filters: { slug: { eq: $productSlug } }, locale: $locale) {
      data {
        id
        attributes {
          part_number
          title
          retail
          currency
          image_link
          description
          discount
          slug
          additional_images {
            id
            link
          }
          params
          subcategory {
            data {
              id
              attributes {
                slug
                title
              }
            }
          }
          product_types(filters: { slug: { eq: $productTypeSlug } }) {
            data {
              id
              attributes {
                slug
                title
              }
            }
          }
        }
      }
    }
  }
`;
