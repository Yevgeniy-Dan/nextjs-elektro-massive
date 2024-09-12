"use client";

import ContactDetails from "@/components/order/ContactDetails";
import Delivery from "@/components/order/Delivery";
import Payment from "@/components/order/Payment";
import Summary from "@/components/order/Summary";
import { useCart } from "@/hooks/useCart";
import { CreditCard, MapPin, Truck } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const CheckoutPage = () => {
  const { cartItems } = useCart();

  const [contactData, setContactData] = useState({
    phone: "",
    firstName: "",
    secondName: "",
    lastName: "",
  });

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold mb-6">Оформлення замовлення</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <ContactDetails
            contactData={contactData}
            handleContactChange={handleContactChange}
          />
          <Delivery />
          <Payment />
        </div>
        <div className="lg:col-span-2">
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
