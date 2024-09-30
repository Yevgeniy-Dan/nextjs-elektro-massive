import { graphql } from "@/gql/gql";

export const getAllOrdersByNumber = graphql(`
  query GetOrderByOrderNumber($orderNumber: String!) {
    orders(filters: { orderNumber: { eq: $orderNumber } }) {
      data {
        id
        attributes {
          orderNumber
          orderDate
          firstName
          secondName
          lastName
          phoneNumber
          shippingAddress
          totalAmount
          paymentMethod
        }
      }
    }
  }
`);
