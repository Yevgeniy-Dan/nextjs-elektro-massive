import { gql } from "@apollo/client";

export const GET_PRODUCT_TYPES = gql`
  query GetProductTypes($subcategoryId: ID!) {
    productTypes(
      filters: { subcategories: { id: { eq: $subcategoryId } } }
      pagination: { limit: -1 }
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
  query GetProductTypeBySlug($slug: String!) {
    productTypes(filters: { slug: { eq: $slug } }, pagination: { limit: -1 }) {
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
  query GetProductTypeFilters($productTypeId: ID, $subcategoryId: ID!) {
    productTypeFilters(
      productTypeId: $productTypeId
      subcategoryId: $subcategoryId
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
  ) {
    filteredProducts(
      productTypeId: $productTypeId
      filters: $filters
      cursor: $cursor
      page: $page
      pageSize: $pageSize
      subcategoryId: $subcategoryId
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
      }
      nextCursor
      pageCount
      totalCount
      currentPage
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($pageSize: Int!) {
    products(pagination: { pageSize: $pageSize }) {
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
