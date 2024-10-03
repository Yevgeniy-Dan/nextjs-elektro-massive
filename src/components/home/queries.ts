import { gql } from "@apollo/client";

export const GET_CATEGORY_MENU = gql`
  query CategoryMenu {
    categories {
      data {
        id
        attributes {
          name
          slug
          icon {
            data {
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

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      data {
        id
        attributes {
          name
          image {
            data {
              attributes {
                url
                previewUrl
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_HOME_PAGE_PRODUCTS = gql`
  query GetHomePageProducts($limit: Int!) {
    topProducts: products(
      filters: { salesCount: { gt: 0 } }
      sort: "salesCount:desc"
      pagination: { limit: $limit }
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
        }
      }
    }
    newProducts: products(
      sort: "createdAt:desc"
      pagination: { limit: $limit }
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
        }
      }
    }
    saleProducts: products(
      filters: { discount: { gt: 0 } }
      sort: "discount:desc"
      pagination: { limit: $limit }
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
        }
      }
    }
  }
`;

export const GET_BANNERS = gql`
  query GetBanners {
    banners(sort: "order:asc", filters: { isActive: { eq: true } }) {
      data {
        id
        attributes {
          title
          altText
          order
          image {
            data {
              attributes {
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;
