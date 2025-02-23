"use client";

import React, { useEffect, useRef } from "react";
import { OrderAttributes } from "@/types/types";
import {
  Enum_Order_Deliverymethod,
  Enum_Order_Paymentmethod,
} from "@/gql/graphql";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import LocalizedLink from "../shared/LocalizedLink";
import { useCookies } from "react-cookie";
import { fallbackLng, Language } from "@/app/i18n/settings";
import OptimizedImage from "../shared/OptimizedImage";

const OrderConfirmation: React.FC<{ order: OrderAttributes | null }> = ({
  order,
}) => {
  const [cookies] = useCookies(["i18next"]);
  const lng = (cookies.i18next || fallbackLng) as Language;

  const { handleClearCart } = useCart();

  const clearCartRef = useRef(false);

  useEffect(() => {
    if (!clearCartRef.current) {
      handleClearCart();
      clearCartRef.current = true;
    }
  }, [handleClearCart]);

  if (!order) {
    return <div>Деталі замовлення недоступні.</div>;
  }

  // TODO: add lnag support
  return (
    <div className=" min-h-screen p-4 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full overflow-hidden">
        <div className="bg-secondary-gradient-elektro-massive-horizontal p-6 px-10 text-white relative">
          <h1 className="text-2xl font-bold mb-10">
            Ви успішно{" "}
            {order.paymentMethod === Enum_Order_Paymentmethod.Card
              ? "оплатили"
              : "замовили"}{" "}
            ваше замовлення!
          </h1>
          <p className="text-lg">Дякуємо, що вибрали наш магазин!</p>
          <div className="absolute top-4 right-4">
            <OptimizedImage
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}/uploads/heart_f559c57931.png`}
              alt="Heart"
              width={120}
              height={120}
            />
          </div>
        </div>
        <div className="p-6">
          <LocalizedLink
            lng={lng}
            href="/"
            className="mb-6 flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={24} />
            На головну
          </LocalizedLink>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Номер вашого замовлення:
            </h2>
            <p className="text-xl font-bold">№ {order.orderNumber}</p>
          </div>
          <h2 className="text-xl font-bold mb-4">Деталі замовлення</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold">Дата замовлення:</span>
              <span>{new Date(order.orderDate).toLocaleString("uk-UA")}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Контактні дані:</span>
              <div className="text-right">
                <p>{`${order.lastName} ${order.firstName} ${order.secondName}`}</p>
                <p>{order.phoneNumber}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Доставка:</span>
              <span>
                {order.deliveryMethod === Enum_Order_Deliverymethod.NovaPoshta
                  ? "Нова Пошта"
                  : "Самовивіз"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Адреса:</span>
              <span className="text-right">{order.shippingAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Оплата:</span>
              <span>
                {order.paymentMethod === Enum_Order_Paymentmethod.Card
                  ? "Карткою"
                  : "Готівкою"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">
                {order.paymentMethod === Enum_Order_Paymentmethod.Card
                  ? "Сплачено:"
                  : "До оплати:"}
              </span>
              <span>{order.totalAmount} грн</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
