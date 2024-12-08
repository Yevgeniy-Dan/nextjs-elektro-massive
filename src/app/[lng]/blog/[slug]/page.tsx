import { getClient } from "@/lib/apollo-client";
import BlogPostCard from "../BlogPostCard";
import {
  GetBlogPostsBySlugQuery,
  GetBlogPostsBySlugQueryVariables,
} from "@/gql/graphql";
import { getBlogPosts } from "../page";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import { GET_BLOG_POST_BY_SLUG } from "@/graphql/queries/blogPost";
import { BlogArticleBreadcrumbs } from "../BlogBreadcrumbs";

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

export default async function BlogPost({
  params: { slug, lng },
}: {
  params: { slug: string; lng: string };
}) {
  const { post, relatedPosts } = await getBlogPostBySlug(slug, lng);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {post.attributes && (
        <BlogArticleBreadcrumbs
          lng={lng}
          articleName={post.attributes?.name}
          slug={post.attributes?.slug}
        />
      )}
      <h1 className="text-2xl font-medium">{post.attributes?.name}</h1>
      <ReactMarkdown className="mb-4 ">
        {post.attributes?.description}
      </ReactMarkdown>

      {relatedPosts.length > 0 && (
        <BlogPostCard posts={relatedPosts} currentPostId={post.id!} />
      )}
    </div>
  );
}
