"use server";

import { getClient } from "@/lib/apollo-client";
import {
  GetBlogPostsBySlugQuery,
  GetBlogPostsBySlugQueryVariables,
  GetBlogPostsQuery,
  GetBlogPostsQueryVariables,
} from "@/gql/graphql";
import {
  GET_BLOG_POST_BY_SLUG,
  GET_BLOG_POSTS,
} from "@/graphql/queries/blogPost";

export async function getBlogPosts(page: number = 1, pageSize: number = 20) {
  try {
    const { data } = await getClient().query<
      GetBlogPostsQuery,
      GetBlogPostsQueryVariables
    >({
      query: GET_BLOG_POSTS,
      variables: {
        locale: "uk",
        page,
        pageSize,
      },
    });

    return {
      posts: data.blogPosts?.data || [],
      pagination: data.blogPosts?.meta.pagination,
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { posts: [], pagination: null };
  }
}

export async function getBlogPostBySlug(slug: string, lng: string) {
  try {
    const [postResponse, relatedPostsResponse] = await Promise.all([
      getClient().query<
        GetBlogPostsBySlugQuery,
        GetBlogPostsBySlugQueryVariables
      >({
        query: GET_BLOG_POST_BY_SLUG,
        variables: {
          slug,
          locale: lng,
        },
      }),
      getBlogPosts(1, 10),
    ]);

    return {
      post: postResponse.data.blogPosts?.data[0] || null,
      relatedPosts: relatedPostsResponse.posts || [],
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return { post: null, relatedPosts: [] };
  }
}
