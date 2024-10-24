import { gql } from "@apollo/client";

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFields on Category {
    name
    slug
    icon {
      data {
        id
        attributes {
          url
        }
      }
    }
    image {
      data {
        id
        attributes {
          url
        }
      }
    }
  }
`;

export const CATEGORY_WITH_SUBCATEGORIES_FRAGMENT = gql`
  fragment CategoryWithSubcategories on Category {
    ...CategoryFields
    subcategories(pagination: { limit: -1 }) {
      data {
        id
        attributes {
          title
          slug
          icon {
            data {
              id
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
  ${CATEGORY_FRAGMENT}
`;
