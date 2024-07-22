import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      data {
        id
        attributes {
          name
          vendor_code
          price
        }
      }
    }
  }
`;
