import { Metadata } from "next";
import PartnershipPageClient from "./Partnership";

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
      ? "Вигідні умови співпраці для торгових організацій, власників бізнесу, дизайнерів. Широкий асортимент, технічна підтримка та спеціальні пропозиції."
      : "Выгодные условия сотрудничества для торговых организаций, владельцев бизнеса, дизайнеров. Широкий ассортимент, техническая поддержка и специальные предложения.";

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
  return <PartnershipPageClient params={params} />;
}
