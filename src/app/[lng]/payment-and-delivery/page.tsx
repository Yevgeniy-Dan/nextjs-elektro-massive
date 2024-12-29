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

  return {
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
