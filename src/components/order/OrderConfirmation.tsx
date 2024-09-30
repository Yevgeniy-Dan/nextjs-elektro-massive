"use client";

import React from "react";
import { OrderAttributes } from "@/types/types";
import { Enum_Order_Paymentmethod } from "@/gql/graphql";

const OrderConfirmation: React.FC<{ order: OrderAttributes | null }> = ({
  order,
}) => {
  if (!order) {
    return <div>Деталі замовлення недоступні.</div>;
  }

  return (
    <div className=" min-h-screen p-4 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full overflow-hidden">
        <div className="bg-green-500 p-6 text-white relative">
          <h1 className="text-2xl font-bold mb-2">
            Ви успішно оплатили ваше замовлення!
          </h1>
          <p className="text-lg">Дякуємо, що вибрали наш магазин!</p>
          <div className="absolute top-4 right-4">
            <svg
              className="w-16 h-16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="url(#heart-gradient)"
              />
              <defs>
                <linearGradient
                  id="heart-gradient"
                  x1="2"
                  y1="3"
                  x2="22"
                  y2="21"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#FBBF24" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="p-6">
          <button className="mb-6 flex items-center text-gray-600 hover:text-gray-800">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            На головну
          </button>
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
              <span>Нова пошта</span>
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
              <span className="font-semibold">Сплачено:</span>
              <span>{order.totalAmount} грн</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
