import { languages } from "@/app/i18n/settings";
import PublicOffer from "@/components/PublicOffer";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = `/public-offer`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_API_URL}${canonicalPath}`;

  const title =
    "Публічний договір (Оферта) | ELEKTRO-MASSIVE - Умови та правила придбання товарів";

  const description =
    "Офіційний публічний договір ELEKTRO-MASSIVE про умови замовлення, купівлі-продажу і доставки товарів. Правила оплати, гарантії та повернення | ELEKTRO-MASSIVE";

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

export default function PublicOfferPage() {
  const fullTranslatedPath = languages.reduce(
    (acc, l) => ({
      ...acc,
      [l]: `public-offer`,
    }),
    {}
  );
  return <PublicOffer fullTranslatedPath={fullTranslatedPath} />;
}
