"use client";

import React from "react";

import ContactDetails from "@/components/order/ContactDetails";
import Delivery from "@/components/order/Delivery";
import Payment from "@/components/order/Payment";
import Summary from "@/components/order/Summary";
import { ExtendedFormProvider } from "@/hooks/extendedFormContext";
import { OrderFormData, useOrderForm } from "@/hooks/useOrderForm";

const CheckoutPage = () => {
  const methods = useOrderForm();

  return (
    <ExtendedFormProvider<OrderFormData> methods={methods}>
      <div className="max-w-6xl mx-auto p-4 font-sans">
        <h1 className="text-2xl font-bold mb-6">Оформлення замовлення</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <ContactDetails />
            <Delivery />
            <Payment />
          </div>
          <div className="lg:col-span-2">
            <Summary />
          </div>
        </div>
      </div>
    </ExtendedFormProvider>
  );
};

export default CheckoutPage;
