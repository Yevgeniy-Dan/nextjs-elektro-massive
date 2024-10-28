import { gql } from "@apollo/client";

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
                      categories {
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
                categories {
                  data {
                    attributes {
                      slug
                      localizations(
                        filters: { locale: { eq: $targetLocale } }
                      ) {
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
          categories {
            data {
              attributes {
                slug
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
