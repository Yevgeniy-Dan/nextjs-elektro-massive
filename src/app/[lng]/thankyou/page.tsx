"use client";

import React from "react";

import { getAllOrdersByNumber } from "@/components/order/queries";
import request from "graphql-request";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import OrderConfirmation from "@/components/order/OrderConfirmation";
import Spinner from "@/components/shared/Spinner";
import CenteredSpinner from "@/components/shared/CenteredSpinner";

const ThankYouPage: React.FC = () => {
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
