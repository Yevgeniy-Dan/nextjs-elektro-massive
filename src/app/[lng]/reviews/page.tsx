"use server";

import { languages } from "@/app/i18n/settings";
import Reviews from "@/components/reviews/Reviews";
import { Metadata } from "next";

interface ReviewsPageProps {
  params: {
    lng: string;
  };
}

export async function generateMetadata({
  params,
}: ReviewsPageProps): Promise<Metadata> {
  const canonicalPath = `/reviews`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_API_URL}${canonicalPath}`;

  const title =
    params.lng === "uk"
      ? "Відгуки клієнтів | ELEKTRO-MASSIVE - Думки та враження наших покупців"
      : "Отзывы клиентов | ELEKTRO-MASSIVE - Мнения и впечатления наших покупателей";

  const description =
    params.lng === "uk"
      ? "Відгуки покупців про досвід придбання електротехніки, будматеріалів та сантехніки в ELEKTRO-MASSIVE. Реальні оцінки якості товарів та обслуговування | ELEKTRO-MASSIVE"
      : "Отзывы покупателей об опыте приобретения электротехники, стройматериалов и сантехники в ELEKTRO-MASSIVE. Реальные оценки качества товаров и обслуживания | ELEKTRO-MASSIVE";

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

const ReviewsPage: React.FC<ReviewsPageProps> = ({ params }) => {
  const fullTranslatedPath = languages.reduce(
    (acc, l) => ({
      ...acc,
      [l]: `reviews`,
    }),
    {}
  );

  return <Reviews lng={params.lng} fullTranslatedPath={fullTranslatedPath} />;
};

export default ReviewsPage;
