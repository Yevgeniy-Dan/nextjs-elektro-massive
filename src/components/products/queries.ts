import { gql } from "@apollo/client";

export const GET_PRODUCT_TYPES = gql`
  query GetProductTypes($subcategory: String!) {
    productTypes(
      filters: { subcategory: { slug: { eq: $subcategory } } }
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
  query GetProductTypeFilters($id: ID!) {
    productTypeFilters(id: $id)
  }
`;

export const GET_FILTERED_PRODUCTS = gql`
  query GetFilteredProducts(
    $productTypeId: ID!
    $filters: [FilterInput!]
    $cursor: String
    $page: Int
    $pageSize: Int
  ) {
    filteredProducts(
      productTypeId: $productTypeId
      filters: $filters
      cursor: $cursor
      page: $page
      pageSize: $pageSize
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
