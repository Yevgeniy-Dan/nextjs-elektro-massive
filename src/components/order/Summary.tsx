import { useCart } from "@/hooks/useCart";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import CartItemsCarousel from "./CartItemsCarousel";

const Summary = () => {
  const { cartItems, calculateTotal, calculateDiscountTotal } = useCart();

  return (
    <div className="sticky top-4 w-full  bg-white p-4 rounded-md shadow-sm border border-gray-200">
      <div className="mb-4 w-full ">
        <CartItemsCarousel cartItems={cartItems} />
      </div>

      <h2 className="text-lg font-semibold mb-2">Разом:</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span>{cartItems.length} товар(а) на суму</span>
          <span className="font-semibold">
            {calculateTotal} {cartItems[0]?.product.currency}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Вартість доставки</span>
          <span className="font-semibold">за тарифами перевізника</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Знижка</span>
          <span className="font-semibold text-green-600">
            {calculateDiscountTotal} {cartItems[0]?.product.currency}
          </span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <span className="font-semibold">До сплати</span>
          <span className="font-semibold text-xl">
            {calculateTotal - calculateDiscountTotal}{" "}
            {cartItems[0]?.product.currency}
          </span>
        </div>
      </div>

      <button className="w-full mt-4 bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 transition-colors">
        Купити
      </button>
      <p className="text-xs text-gray-500 mt-2">
        Підтверджуючи замовлення, я приймаю умови:
        <br />• положення про обробку і захист персональних даних
        <br />• угоди користувача
      </p>
    </div>
  );
};

export default Summary;
