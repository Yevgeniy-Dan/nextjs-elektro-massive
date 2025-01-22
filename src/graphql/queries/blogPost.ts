import { gql } from "@apollo/client";

export const GET_BLOG_POSTS = gql`
  query GetBlogPosts($locale: I18NLocaleCode!, $page: Int!, $pageSize: Int!) {
    blogPosts(
      locale: $locale
      pagination: { page: $page, pageSize: $pageSize }
      sort: ["publishedAt:desc"]
    ) {
      data {
        id
        attributes {
          name
          description
          slug
          image {
            data {
              attributes {
                url
                width
                height
                alternativeText
                formats
              }
            }
          }
          locale
          createdAt
          updatedAt
          publishedAt
        }
      }
      meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
    }
  }
`;

export const GET_BLOG_POST_BY_SLUG = gql`
  query GetBlogPostsBySlug($slug: String!, $locale: I18NLocaleCode!) {
    blogPosts(filters: { slug: { eq: $slug } }, locale: $locale) {
      data {
        id
        attributes {
          name
          description
          slug
          metaTitle
          metaDescription
          image {
            data {
              attributes {
                url
                width
                height
                alternativeText
              }
            }
          }
          locale
          createdAt
          updatedAt
          publishedAt
          localizations {
            data {
              id
              attributes {
                locale
                slug
              }
            }
          }
        }
      }
    }
  }
`;
