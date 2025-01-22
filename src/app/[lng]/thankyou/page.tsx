import { Metadata } from "next";
import ThankYouPage from "./ThankYouPage";

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
  return <ThankYouPage />;
}
