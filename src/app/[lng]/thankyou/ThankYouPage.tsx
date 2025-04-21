"use client";

import React from "react";

import { getAllOrdersByNumber } from "@/graphql/queries/order";
import request from "graphql-request";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import OrderConfirmation from "@/components/order/OrderConfirmation";
import CenteredSpinner from "@/components/shared/CenteredSpinner";
import { AvailableLanguages } from "@/components/shared/LanguageToggler";
import { useLangMatches } from "@/hooks/useLangMatches";

interface ThankYouPageProps {
  fullTranslatedPath: Record<AvailableLanguages, string>;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ fullTranslatedPath }) => {
  useLangMatches(fullTranslatedPath);

  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["order", orderNumber],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
        getAllOrdersByNumber,
        { orderNumber: orderNumber ?? "" }
      ),
  });

  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }

  const order = data?.orders?.data[0].attributes || null;

  return <OrderConfirmation order={order} />;
};

export default ThankYouPage;
