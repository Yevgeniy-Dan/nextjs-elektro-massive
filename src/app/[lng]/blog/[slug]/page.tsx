import BlogPostCard from "../BlogPostCard";

import { notFound } from "next/navigation";
import { Metadata } from "next";

import ReactMarkdown from "react-markdown";

import { BlogArticleBreadcrumbs } from "../BlogBreadcrumbs";
import { getBlogPostBySlug } from "../actions";

export const dynamic = "force-static";
export const revalidate = 1500;

interface BlogPostProps {
  params: {
    slug: string;
    lng: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { slug: blogSlug, lng } = params;
  const { post } = await getBlogPostBySlug(blogSlug, lng);

  if (!post) {
    return {
      title:
        lng === "uk"
          ? `Статтю не знайдено | ELEKTRO-MASSIVE`
          : `Статья не найдена | ELEKTRO-MASSIVE`,
      description:
        lng === "uk"
          ? `Запитану статтю не існує або була видалена | ELEKTRO-MASSIVE`
          : `Запрашиваемая статья не существует или была удалена | ELEKTRO-MASSIVE`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/blog/${blogSlug}`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_API_URL}${canonicalPath}`;

  return {
    title: post.attributes?.metaTitle + " | ELEKTRO-MASSIVE",
    description:
      post.attributes?.metaDescription?.slice(0, 155) + " | ELEKTRO-MASSIVE",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        uk: `${process.env.NEXT_PUBLIC_API_URL}/uk${canonicalPath}`,
        ru: `${process.env.NEXT_PUBLIC_API_URL}/ru${canonicalPath}`,
        "x-default": canonicalUrl,
      },
    },
  };
}

export default async function BlogPost({
  params: { slug, lng },
}: BlogPostProps) {
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
