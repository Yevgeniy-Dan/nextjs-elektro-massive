"use server";

import { Metadata } from "next";
import AboutPageClient from "./AboutClient";

interface AboutPageProps {
  params: { lng: string };
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const canonicalPath = `/about`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${canonicalPath}`;

  return {
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

export default async function Page({ params }: AboutPageProps) {
  return <AboutPageClient params={params} />;
}
