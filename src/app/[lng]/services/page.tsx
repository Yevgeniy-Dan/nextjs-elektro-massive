"use server";

import { Metadata } from "next";
import ServicePageClient from "./Services";

interface ServicePageProps {
  params: {
    lng: string;
  };
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const canonicalPath = `/services`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_API_URL}${canonicalPath}`;

  const title =
    params.lng === "uk"
      ? "Послуги | ELEKTRO-MASSIVE - Електромонтажні, будівельні та сантехнічні роботи"
      : "Услуги | ELEKTRO-MASSIVE - Электромонтажные, строительные и сантехнические работы";

  const description =
    params.lng === "uk"
      ? "Професійні послуги: монтаж електропроводки, проектування електромереж, будівництво, реконструкція, сантехнічні роботи. Працюємо по всій Одеській області."
      : "Профессиональные услуги: монтаж электропроводки, проектирование электросетей, строительство, реконструкция, сантехнические работы. Работаем по всей Одесской области.";

  return {
    title,
    description,
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
