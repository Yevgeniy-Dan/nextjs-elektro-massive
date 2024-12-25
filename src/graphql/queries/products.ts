import { gql } from "@apollo/client";

// DO NOT COMMENT OR DELETE
// IT IS NEEDED FOR graphql-codegen
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
              id
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

export const GET_FILTERED_PRODUCTS = gql`
  query GetFilteredProducts(
    $productTypeId: ID
    $filters: [FilterInput!]
    $cursor: String
    $page: Int
    $pageSize: Int
    $subcategoryId: ID!
    $locale: I18NLocaleCode!
    $sort: [String!]
    $minPrice: Float
    $maxPrice: Float
  ) {
    filteredProducts(
      productTypeId: $productTypeId
      filters: $filters
      cursor: $cursor
      page: $page
      pageSize: $pageSize
      subcategoryId: $subcategoryId
      locale: $locale
      sort: $sort
      minPrice: $minPrice
      maxPrice: $maxPrice
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

export const GET_MAX_PRICE = gql`
  query GetMaxPrice(
    $subcategoryId: ID!
    $productTypeId: ID
    $locale: I18NLocaleCode!
  ) {
    maxProductPrice(
      subcategoryId: $subcategoryId
      productTypeId: $productTypeId
      locale: $locale
    )
  }
`;

export const GET_HOME_PAGE_PRODUCTS = gql`
  query GetHomePageProducts($limit: Int!, $locale: I18NLocaleCode!) {
    topProducts: products(
      filters: { salesCount: { gt: 0 } }
      sort: "salesCount:desc"
      pagination: { limit: $limit }
      locale: $locale
    ) {
      data {
        id
        attributes {
          title
          part_number
          retail
          currency
          image_link
          slug
          params
          discount
          salesCount
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
          product_types {
            data {
              id
              attributes {
                slug
              }
            }
          }
        }
      }
    }
    newProducts: products(
      sort: "createdAt:desc"
      pagination: { limit: $limit }
      locale: $locale
    ) {
      data {
        id
        attributes {
          title
          part_number
          retail
          currency
          image_link
          slug
          params
          discount
          salesCount
          createdAt
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
          product_types {
            data {
              id
              attributes {
                slug
              }
            }
          }
        }
      }
    }
    saleProducts: products(
      filters: { discount: { gt: 0 } }
      sort: "discount:desc"
      pagination: { limit: $limit }
      locale: $locale
    ) {
      data {
        id
        attributes {
          title
          part_number
          retail
          currency
          image_link
          slug
          params
          discount
          salesCount
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
          product_types {
            data {
              id
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
