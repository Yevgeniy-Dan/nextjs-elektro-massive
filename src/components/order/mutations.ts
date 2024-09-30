import { gql } from "@apollo/client";

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($input: OrderInput!) {
    createOrder(data: $input) {
      data {
        id
        attributes {
          orderNumber
          orderItems
        }
      }
    }
  }
`;
