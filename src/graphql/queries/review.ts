import { gql } from "@apollo/client";

export const GET_SHOP_REVIEWS = gql`
  query GetShopReviews {
    shopReviews(sort: "createdAt:desc") {
      data {
        id
        attributes {
          customerName
          comment
          overallRating
          selectionConvenience
          managerConsultation
          productDelivery
          paymentProcess
          createdAt
        }
      }
    }
  }
`;

export const CREATE_SHOP_REVIEW = gql`
  mutation CreateShopReview($input: ShopReviewInput!) {
    createShopReview(data: $input) {
      data {
        id
        attributes {
          customerName
          comment
          overallRating
          selectionConvenience
          managerConsultation
          productDelivery
          paymentProcess
          createdAt
        }
      }
    }
  }
`;
