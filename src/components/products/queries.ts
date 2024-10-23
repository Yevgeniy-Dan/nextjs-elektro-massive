import { gql } from "@apollo/client";

export const GET_PRODUCT_TYPES = gql`
  query GetProductTypes($subcategoryId: ID!, $locale: I18NLocaleCode!) {
    productTypes(
      filters: { subcategories: { id: { eq: $subcategoryId } } }
      pagination: { limit: -1 }
      locale: $locale
    ) {
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
          description
        }
      }
      meta {
        pagination {
          total
        }
      }
    }
  }
`;

export const GET_PRODUCT_TYPE_BY_SLUG = gql`
  query GetProductTypeBySlug($slug: String!, $locale: I18NLocaleCode!) {
    productTypes(
      filters: { slug: { eq: $slug } }
      pagination: { limit: -1 }
      locale: $locale
    ) {
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
          description
        }
      }
      meta {
        pagination {
          total
        }
      }
    }
  }
`;

export const GET_PRODUCT_TYPE_FILTERS = gql`
  query GetProductTypeFilters(
    $productTypeId: ID
    $subcategoryId: ID!
    $locale: I18NLocaleCode!
  ) {
    productTypeFilters(
      productTypeId: $productTypeId
      subcategoryId: $subcategoryId
      locale: $locale
    )
  }
`;

export const GET_FILTERED_PRODUCTS = gql`
  query GetFilteredProducts(
    $productTypeId: ID
    $filters: [FilterInput!]
    $cursor: String
    $page: Int
    $pageSize: Int
    $subcategoryId: ID!
    $locale: I18NLocaleCode!
  ) {
    filteredProducts(
      productTypeId: $productTypeId
      filters: $filters
      cursor: $cursor
      page: $page
      pageSize: $pageSize
      subcategoryId: $subcategoryId
      locale: $locale
    ) {
      products {
        id
        title
        part_number
        retail
        image_link
        params
        currency
        additional_images {
          link
        }
        discount
        slug
        product_types {
          data {
            id
            attributes {
              slug
            }
          }
        }
        subcategory {
          data {
            id
            attributes {
              slug
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
      nextCursor
      pageCount
      totalCount
      currentPage
    }
  }
`;

// DO NOT COMMENT OR DELETE
export const GET_PRODUCTS = gql`
  query GetProducts($pageSize: Int!, $locale: I18NLocaleCode!) {
    products(pagination: { pageSize: $pageSize }, locale: $locale) {
      data {
        id
        attributes {
          part_number
          title
          retail
          currency
          image_link
          slug
          params
          additional_images {
            link
          }
          subcategory {
            data {
              id
              attributes {
                slug
              }
            }
          }
          product_types {
            data {
              attributes {
                slug
              }
            }
          }
          discount
        }
      }
    }
  }
`;

export const GET_BRANDS = gql`
  query GetBrands {
    brands {
      data {
        id
        attributes {
          title
          logo {
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
`;

export const GET_FAVORITE_PRODUCTS = gql`
  query GetUserFavoriteProducts($locale: I18NLocaleCode!) {
    userFavorites(locale: $locale) {
      favoriteProducts {
        product {
          data {
            id
            attributes {
              title
              part_number
              retail
              currency
              image_link
              slug
              discount
              params
              subcategory {
                data {
                  id
                  attributes {
                    slug
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
          }
        }
        product_type {
          data {
            id
            attributes {
              title
              slug
            }
          }
        }
      }
    }
  }
`;

export const ADD_TO_FAVORITES = gql`
  mutation AddToFavorites(
    $input: AddToFavoritesInput!
    $locale: I18NLocaleCode!
  ) {
    addToFavorites(input: $input, locale: $locale) {
      favoriteProducts {
        product {
          data {
            id
            attributes {
              title
            }
          }
        }
        product_type {
          data {
            id
            attributes {
              title
            }
          }
        }
      }
    }
  }
`;

export const REMOVE_FROM_FAVORITES = gql`
  mutation RemoveFromFavorites(
    $input: RemoveFromFavoritesInput!
    $locale: I18NLocaleCode!
  ) {
    removeFromFavorites(input: $input, locale: $locale) {
      favoriteProducts {
        product {
          data {
            id
          }
        }
        product_type {
          data {
            id
          }
        }
      }
    }
  }
`;
