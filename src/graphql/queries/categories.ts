import { gql } from "@apollo/client";
import {
  CATEGORY_FRAGMENT,
  CATEGORY_WITH_SUBCATEGORIES_FRAGMENT,
} from "../fragments";

export const GET_CATEGORY_MENU = gql`
  query CategoryMenu($locale: I18NLocaleCode!) {
    categories(locale: $locale) {
      data {
        id
        attributes {
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
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories($locale: I18NLocaleCode!) {
    categories(locale: $locale) {
      data {
        id
        attributes {
          ...CategoryFields
        }
      }
    }
  }
  ${CATEGORY_FRAGMENT}
`;

export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: String!, $locale: I18NLocaleCode!) {
    categories(filters: { slug: { eq: $slug } }, locale: $locale) {
      data {
        id
        attributes {
          ...CategoryWithSubcategories
        }
      }
    }
  }
  ${CATEGORY_WITH_SUBCATEGORIES_FRAGMENT}
`;
