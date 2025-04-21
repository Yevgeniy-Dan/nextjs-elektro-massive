import { languages } from "@/app/i18n/settings";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const PartnershipPageClient = dynamic(() => import("./Partnership"), {
  ssr: false,
});

interface PartnershipPageProps {
  params: { lng: string };
}

export async function generateMetadata({
  params,
}: PartnershipPageProps): Promise<Metadata> {
  const canonicalPath = `/partnership`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_API_URL}${canonicalPath}`;

  const title =
    params.lng === "uk"
      ? "Співпраця | ELEKTRO-MASSIVE - Партнерська програма для бізнесу"
      : "Сотрудничество | ELEKTRO-MASSIVE - Партнерская программа для бизнеса";

  const description =
    params.lng === "uk"
      ? "Вигідні умови співпраці для торгових організацій, власників бізнесу, дизайнерів. Широкий асортимент, технічна підтримка та спеціальні пропозиції | ELEKTRO-MASSIVE"
      : "Выгодные условия сотрудничества для торговых организаций, владельцев бизнеса, дизайнеров. Широкий ассортимент, техническая поддержка и специальные предложения | ELEKTRO-MASSIVE";

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

export default function Page({ params }: PartnershipPageProps) {
  const fullTranslatedPath = languages.reduce(
    (acc, l) => ({
      ...acc,
      [l]: `partnership`,
    }),
    {}
  );

  return (
    <PartnershipPageClient
      params={params}
      fullTranslatedPath={fullTranslatedPath}
    />
  );
}
