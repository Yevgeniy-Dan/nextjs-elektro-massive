"use server";

import { Metadata } from "next";
import ServicePageClient from "./Services";

interface ServicePageProps {
  params: {
    lng: string;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = `/services`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_API_URL}${canonicalPath}`;

  return {
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

export default async function Page({ params }: ServicePageProps) {
  return <ServicePageClient params={params} />;
}
