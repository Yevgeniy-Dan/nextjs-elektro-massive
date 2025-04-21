import { languages } from "@/app/i18n/settings";
import { AvailableLanguages } from "@/components/shared/LanguageToggler";
import { Metadata } from "next";
import dynamic from "next/dynamic";

interface CheckoutPageProps {
  params: {
    lng: string;
  };
}

const CheckoutPage = dynamic(() => import("./CheckoutClientPage"), {
  ssr: false,
});

export async function generateMetadata({
  params,
}: CheckoutPageProps): Promise<Metadata> {
  const title =
    params.lng === "uk"
      ? "Оформлення замовлення | ELEKTRO-MASSIVE - Швидке та безпечне оформлення"
      : "Оформление заказа | ELEKTRO-MASSIVE - Быстрое и безопасное оформление";

  const description =
    params.lng === "uk"
      ? "Оформіть замовлення онлайн: зручна доставка, безпечна оплата, детальна інформація про товари. Замовляйте електротовари та будматеріали з доставкою | ELEKTRO-MASSIVE"
      : "Оформите заказ онлайн: удобная доставка, безопасная оплата, детальная информация о товарах. Заказывайте электротовары и стройматериалы с доставкой | ELEKTRO-MASSIVE";

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function Page({ params }: CheckoutPageProps) {
  const fullTranslatedPath = languages.reduce(
    (acc, l) => ({
      ...acc,
      [l]: `checkout`,
    }),
    {}
  );

  return (
    <CheckoutPage params={params} fullTranslatedPath={fullTranslatedPath} />
  );
}
