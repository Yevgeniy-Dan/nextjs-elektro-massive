import BlogPostCard from "../BlogPostCard";

import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import { BlogArticleBreadcrumbs } from "../BlogBreadcrumbs";
import { getBlogPostBySlug } from "../actions";

export const dynamic = "force-static";
export const revalidate = 3600;

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
