import { gql } from "@apollo/client";

export const GET_SUBCATEGORY_BY_SLUG = gql`
  query GetSubcategoryBySlug($slug: String!, $locale: I18NLocaleCode!) {
    subcategories(filters: { slug: { eq: $slug } }, locale: $locale) {
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
          categories {
            data {
              id
              attributes {
                slug
                name
              }
            }
          }
        }
      }
    }
  }
`;
