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
          subcategories {
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
