import { gql } from "@apollo/client";

//TODO: All queries should be generated from the graphql schema
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
  query GetProductBySlug($productSlug: String!, $productTypeSlug: String!) {
    products(filters: { slug: { eq: $productSlug } }) {
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

export const GET_SUBCATEGORY_BY_SLUG = gql`
  query GetSubcategoryBySlug($slug: String!) {
    subcategories(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          title
          slug
        }
      }
    }
  }
`;
