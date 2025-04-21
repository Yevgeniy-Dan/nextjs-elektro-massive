import { Metadata } from "next";
import ThankYouPage from "./ThankYouPage";
import { languages } from "@/app/i18n/settings";

interface ThankyouPageProps {
  params: { lng: string };
}

export async function generateMetadata({
  params,
}: ThankyouPageProps): Promise<Metadata> {
  const title =
    params.lng === "uk"
      ? "Дякуємо за замовлення | ELEKTRO-MASSIVE"
      : "Спасибо за заказ | ELEKTRO-MASSIVE";

  const description =
    params.lng === "uk"
      ? "Підтвердження та деталі вашого замовлення в ELEKTRO-MASSIVE | ELEKTRO-MASSIVE"
      : "Подтверждение и детали вашего заказа в ELEKTRO-MASSIVE | ELEKTRO-MASSIVE";

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function Page() {
  const fullTranslatedPath = languages.reduce(
    (acc, l) => ({
      ...acc,
      [l]: `thankyou`,
    }),
    {}
  );

  return <ThankYouPage fullTranslatedPath={fullTranslatedPath} />;
}
