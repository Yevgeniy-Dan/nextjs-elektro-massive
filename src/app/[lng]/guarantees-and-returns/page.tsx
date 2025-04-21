import { Metadata } from "next";
import GuaranteeReturnsPageClient from "./GuaranteesClient";
import { languages } from "@/app/i18n/settings";

interface GuaranteeReturnsProps {
  params: {
    lng: string;
  };
}

export async function generateMetadata({
  params,
}: GuaranteeReturnsProps): Promise<Metadata> {
  const canonicalPath = `/guarantees-and-returns`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_API_URL}${canonicalPath}`;

  const title =
    params.lng === "uk"
      ? "Гарантія та повернення товару | ELEKTRO-MASSIVE - Умови та правила"
      : "Гарантия и возврат товара | ELEKTRO-MASSIVE - Условия и правила";

  const description =
    params.lng === "uk"
      ? "Інформація про гарантійне обслуговування, умови повернення та обміну товарів. 14 днів на повернення, перевірка при отриманні, документи для повернення | ELEKTRO-MASSIVE"
      : "Информация о гарантийном обслуживании, условия возврата и обмена товаров. 14 дней на возврат, проверка при получении, документы для возврата | ELEKTRO-MASSIVE";

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

export default function Page({ params }: GuaranteeReturnsProps) {
  const fullTranslatedPath = languages.reduce(
    (acc, l) => ({
      ...acc,
      [l]: `guarantees-and-returns`,
    }),
    {}
  );

  return (
    <GuaranteeReturnsPageClient
      params={params}
      fullTranslatedPath={fullTranslatedPath}
    />
  );
}
