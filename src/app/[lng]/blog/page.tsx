import Image from "next/image";
import ReactMarkdown from "react-markdown";
import PaginationServerComponent from "./Pagination";
import { BlogMainImage } from "@/types/types";
import BlogBreadcrumbs from "./BlogBreadcrumbs";
import { getBlogPosts } from "./actions";
import { Metadata } from "next";
import LocalizedLink from "@/components/shared/LocalizedLink";
import { useTranslation } from "@/app/i18n/client";
import BlogClientPage from "./BlogClientPage";
import { languages } from "@/app/i18n/settings";

interface BlogListProps {
  params: {
    lng: string;
  };
  searchParams: {
    page?: string;
  };
}

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata({
  params,
  searchParams,
}: BlogListProps): Promise<Metadata> {
  const currentPage = Number(searchParams.page) || 1;
  const canonicalPath = `/blog${currentPage > 1 ? `?page=${currentPage}` : ""}`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${canonicalPath}`;

  const title =
    params.lng === "uk"
      ? "Блог | ELEKTRO-MASSIVE - Корисні статті про електротехніку та будматеріали"
      : "Блог | ELEKTRO-MASSIVE - Полезные статьи об электротехнике и стройматериалах";

  const description =
    params.lng === "uk"
      ? "Читайте корисні статті про електротехніку, будматеріали та сантехніку. Поради експертів, огляди товарів та новинки від ELEKTRO-MASSIVE | ELEKTRO-MASSIVE"
      : "Читайте полезные статьи об электротехнике, стройматериалах и сантехнике. Советы экспертов, обзоры товаров и новинки от ELEKTRO-MASSIVE | ELEKTRO-MASSIVE";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        uk: `${process.env.NEXT_PUBLIC_SITE_URL}/uk${canonicalPath}`,
        ru: `${process.env.NEXT_PUBLIC_SITE_URL}/ru${canonicalPath}`,
        "x-default": canonicalUrl,
      },
    },
  };
}

export default async function BlogList({
  params: { lng },
  searchParams,
}: BlogListProps) {
  const currentPage = Number(searchParams.page) || 1;
  const { pagination, posts } = await getBlogPosts(currentPage, 20, lng);

  const paginationComponent =
    pagination && pagination.pageCount > 1 ? (
      <PaginationServerComponent
        currentPage={currentPage}
        totalPages={pagination.pageCount}
        baseUrl="/blog"
      />
    ) : null;

  const fullTranslatedPath = languages.reduce(
    (acc, l) => ({
      ...acc,
      [l]: `blog`,
    }),
    {}
  );

  return (
    <BlogClientPage
      lng={lng}
      pagination={paginationComponent}
      posts={posts}
      fullTranslatedPath={fullTranslatedPath}
    />
  );
}
