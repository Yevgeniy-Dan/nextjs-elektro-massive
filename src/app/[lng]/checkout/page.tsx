import { Metadata } from "next";
import CheckoutPage from "./CheckoutClientPage";

interface CheckoutPageProps {
  params: {
    lng: string;
  };
}

export async function generateMetadata({
  params,
}: CheckoutPageProps): Promise<Metadata> {
  const title =
    params.lng === "uk"
      ? "Оформлення замовлення | ELEKTRO-MASSIVE - Швидке та безпечне оформлення"
      : "Оформление заказа | ELEKTRO-MASSIVE - Быстрое и безопасное оформление";

  const description =
    params.lng === "uk"
      ? "Оформіть замовлення онлайн: зручна доставка, безпечна оплата, детальна інформація про товари. Замовляйте електротовари та будматеріали з доставкою."
      : "Оформите заказ онлайн: удобная доставка, безопасная оплата, детальная информация о товарах. Заказывайте электротовары и стройматериалы с доставкой.";

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
  return <CheckoutPage params={params} />;
}
