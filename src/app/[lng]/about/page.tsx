"use server";

import { Metadata } from "next";
import AboutPageClient from "./AboutClient";
import { languages } from "@/app/i18n/settings";

interface AboutPageProps {
  params: { lng: string };
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const title =
    params.lng === "uk"
      ? "Про нас | ELEKTRO-MASSIVE - Ваш надійний партнер з 2017 року"
      : "О нас | ELEKTRO-MASSIVE - Ваш надежный партнер с 2017 года";

  const description =
    params.lng === "uk"
      ? "Дізнайтесь більше про ELEKTRO-MASSIVE - провідного постачальника електротехніки, будматеріалів та сантехніки в Україні. Якісні товари, професійні послуги та надійне партнерство | ELEKTRO-MASSIVE"
      : "Узнайте больше о ELEKTRO-MASSIVE - ведущем поставщике электротехники, стройматериалов и сантехники в Украине. Качественные товары, профессиональные услуги и надежное партнерство | ELEKTRO-MASSIVE";

  const canonicalPath = `/about`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${canonicalPath}`;

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

export default async function Page({ params }: AboutPageProps) {
  const fullTranslatedPath = languages.reduce(
    (acc, l) => ({
      ...acc,
      [l]: `about`,
    }),
    {}
  );
  return (
    <AboutPageClient params={params} fullTranslatedPath={fullTranslatedPath} />
  );
}
