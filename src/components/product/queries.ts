import { gql } from "@apollo/client";

// export const GET_PRODUCT = gql`
//   query GetProduct($productId: ID!) {
//     product(id: $productId) {
//       data {
//         id
//         attributes {
//           part_number
//           title
//           retail
//           currency
//           image_link
//           description
//           discount
//           slug
//           additional_images {
//             id
//             link
//           }
//           params
//           subcategory {
//             data {
//               id
//             }
//           }
//         }
//       }
//     }
//   }
// `;

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug(
    $productSlug: String!
    $productTypeSlug: String!
    $locale: I18NLocaleCode!
  ) {
    products(filters: { slug: { eq: $productSlug } }, locale: $locale) {
      data {
        id
        attributes {
          part_number
          title
          retail
          currency
          image_link
          description
          discount
          slug
          additional_images {
            id
            link
          }
          params
          subcategory {
            data {
              id
              attributes {
                slug
                title
              }
            }
          }
          product_types(filters: { slug: { eq: $productTypeSlug } }) {
            data {
              id
              attributes {
                slug
                title
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_SUBCATEGORY_BY_SLUG = gql`
  query GetSubcategoryBySlug($slug: String!, $locale: I18NLocaleCode!) {
    subcategories(filters: { slug: { eq: $slug } }, locale: $locale) {
      data {
        id
        attributes {
          title
          slug
        }
      }
    }
  }
`;

export const GET_PRODUCT_TRANSLATED_SLUGS = gql`
  query GetTranslatedSlugs(
    $productSlug: String!
    $currentLocale: I18NLocaleCode!
    $targetLocale: String!
  ) {
    products(filters: { slug: { eq: $productSlug } }, locale: $currentLocale) {
      data {
        attributes {
          product_types {
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
          localizations(filters: { locale: { eq: $targetLocale } }) {
            data {
              attributes {
                slug
                subcategory {
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
      }
    }
  }
`;

export const GET_PRODUCT_TYPE_TRANSLATED_SLUGS = gql`
  query GetTranslatedSlugsProductType(
    $productTypeSlug: String!
    $currentLocale: I18NLocaleCode!
    $targetLocale: String!
  ) {
    productTypes(
      filters: { slug: { eq: $productTypeSlug } }
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
          subcategories {
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
      }
    }
  }
`;

export const GET_SUBCATEGORY_TRANSLATED_SLUGS = gql`
  query GetSubcategoryTranslatedSlugs(
    $subcategorySlug: String!
    $currentLocale: I18NLocaleCode!
    $targetLocale: String!
  ) {
    subcategories(
      filters: { slug: { eq: $subcategorySlug } }
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
