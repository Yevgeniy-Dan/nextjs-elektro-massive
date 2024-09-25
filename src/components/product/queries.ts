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
