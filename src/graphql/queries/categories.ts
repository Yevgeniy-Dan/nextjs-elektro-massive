import { gql } from "@apollo/client";

export const GET_CATEGORY_MENU = gql`
  query CategoryMenu($locale: I18NLocaleCode!) {
    categories(locale: $locale) {
      data {
        id
        attributes {
          name
          slug
          description
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
                description
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
          name
          slug
          description
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
          subcategories(pagination: { limit: -1 }) {
            data {
              id
              attributes {
                title
                slug
                description
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

export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: String!, $locale: I18NLocaleCode!) {
    categories(filters: { slug: { eq: $slug } }, locale: $locale) {
      data {
        id
        attributes {
          name
          slug
          description
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
          subcategories(pagination: { limit: -1 }) {
            data {
              id
              attributes {
                title
                slug
                description
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
