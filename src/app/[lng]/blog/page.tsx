import { GetBlogPostsQuery, GetBlogPostsQueryVariables } from "@/gql/graphql";
import { GET_BLOG_POSTS } from "@/graphql/queries/blogPost";
import { getClient } from "@/lib/apollo-client";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import PaginationServerComponent from "./Pagination";
import { BlogMainImage } from "@/types/types";
import BlogBreadcrumbs from "./BlogBreadcrumbs";

export const revalidate = 3600;

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

const getResponsiveImage = (image: BlogMainImage) => {
  const formats = image?.data?.attributes?.formats;
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  if (formats?.small?.width < 500) {
    return `${baseUrl}${formats.small.url}`;
  } else if (formats?.medium?.width < 750) {
    return `${baseUrl}${formats.medium.url}`;
  } else if (formats?.large?.width < 1000) {
    return `${baseUrl}${formats.large.url}`;
  }
  return `${baseUrl}${image.data?.attributes?.url}`;
};

export default async function BlogList({
  params: { lng },
  searchParams,
}: {
  params: { lng: string };
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const { pagination, posts } = await getBlogPosts(currentPage);

  if (!posts.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* //TODO: Localisation */}
        <h1 className="text-2xl font-bold">Немає доступних статей</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogBreadcrumbs lng={lng} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.attributes?.slug}`}
            key={post.id}
            className="block"
          >
            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
              <div className="relative pt-[66.66%]">
                {post.attributes?.image?.data?.attributes && (
                  <Image
                    src={getResponsiveImage(post.attributes?.image)}
                    alt={
                      post.attributes?.image.data?.attributes
                        ?.alternativeText || ""
                    }
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="absolute top-0 left-0 w-full h-full object-contain"
                    priority={false}
                  />
                )}
              </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                  {post.attributes?.name}
                </h2>
                <ReactMarkdown className="text-gray-600 mb-4 line-clamp-3">
                  {post.attributes?.description}
                </ReactMarkdown>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <time>
                    {new Date(post.attributes?.updatedAt).toLocaleDateString()}
                  </time>
                  <span className="text-blue-600 hover:text-blue-800">
                    Читати далі →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {pagination && pagination.pageCount > 1 && (
        <PaginationServerComponent
          currentPage={currentPage}
          totalPages={pagination.pageCount}
          baseUrl="/blog"
        />
      )}
    </div>
  );
}
