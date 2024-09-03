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
  query GetProductTypeFilters($productTypeId: ID!, $subcategoryId: ID!) {
    productTypeFilters(
      productTypeId: $productTypeId
      subcategoryId: $subcategoryId
    )
  }
`;

export const GET_FILTERED_PRODUCTS = gql`
  query GetFilteredProducts(
    $productTypeId: ID!
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
        currency
        additional_images {
          link
        }
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
          subcategory {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
