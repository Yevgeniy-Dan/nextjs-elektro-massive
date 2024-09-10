import { gql } from "@apollo/client";

export const GET_CATEGORY_MENU = gql`
  query CategoryMenu {
    categories {
      data {
        id
        attributes {
          name
          slug
          icon {
            data {
              attributes {
                url
              }
            }
          }
          subcategories(pagination: { limit: -1 }) {
            data {
              id
              attributes {
                title
                slug
                icon {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      data {
        id
        attributes {
          name
          image {
            data {
              attributes {
                url
                previewUrl
              }
            }
          }
        }
      }
    }
  }
`;
