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
          metaTitle
          metaDescription
          langMatches
          icon {
            data {
              id
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
          metaTitle
          metaDescription
          langMatches
          icon {
            data {
              id
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
