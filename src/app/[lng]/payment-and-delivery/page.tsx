"use server";

import { Metadata } from "next";
import React from "react";
import PaymentDeliveryClient from "./PaymentDelivery";

interface PaymentDeliveryProps {
  params: {
    lng: string;
  };
}

export async function generateMetadata({
  params,
}: PaymentDeliveryProps): Promise<Metadata> {
  const canonicalPath = `/payment-and-delivery`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_API_URL}${canonicalPath}`;

  const title =
    params.lng === "uk"
      ? "Оплата та доставка | ELEKTRO-MASSIVE - Умови доставки та способи оплати"
      : "Оплата и доставка | ELEKTRO-MASSIVE - Условия доставки и способы оплаты";

  const description =
    params.lng === "uk"
      ? "Інформація про способи оплати, доставку Новою Поштою, терміни обробки замовлень. Безкоштовна доставка від 3000 грн, онлайн оплата, накладений платіж | ELEKTRO-MASSIVE"
      : "Информация о способах оплаты, доставке Новой Почтой, сроках обработки заказов. Бесплатная доставка от 3000 грн, онлайн оплата, наложенный платеж | ELEKTRO-MASSIVE";

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

export default async function Page({ params }: PaymentDeliveryProps) {
  return <PaymentDeliveryClient params={params} />;
}
