import { gql } from "@apollo/client";

export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: String!, $locale: I18NLocaleCode!) {
    categories(filters: { slug: { eq: $slug } }, locale: $locale) {
      data {
        id
        attributes {
          name
          slug
          image {
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

export const GET_CATEGORY_TRANSLATED_SLUGS = gql`
  query GetCategoryTranslatedSlugs(
    $categorySlug: String!
    $currentLocale: I18NLocaleCode!
    $targetLocale: String!
  ) {
    categories(
      filters: { slug: { eq: $categorySlug } }
      locale: $currentLocale
    ) {
      data {
        attributes {
          localizations(filters: { locale: { eq: $targetLocale } }) {
            data {
              attributes {
                slug
              }
            }
          }
        }
      }
    }
  }
`;
