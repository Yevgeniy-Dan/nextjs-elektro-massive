import { gql } from "@apollo/client";

export const GET_ORDER_BY_NUMBER = gql`
  query GetOrderByNumber($orderNumber: String!) {
    orders(filters: { orderNumber: { eq: $orderNumber } }) {
      data {
        id
        attributes {
          orderDate
          orderNumber
        }
      }
    }
  }
`;

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

export const DELETE_ORDER_MUTATION = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      data {
        id
        attributes {
          orderNumber
        }
      }
    }
  }
`;
