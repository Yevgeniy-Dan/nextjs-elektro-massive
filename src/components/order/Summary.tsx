"use client";

import React, { useEffect, useRef } from "react";
import { useCart } from "@/hooks/useCart";
import CartItemsCarousel from "./CartItemsCarousel";
import { buyAction } from "@/app/actions";
import { OrderFormData } from "@/hooks/useOrderForm";
import { useExtendedFormContext } from "@/hooks/extendedFormContext";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

const Summary: React.FC = () => {
  const { cartItems, calculateTotal, calculateDiscountTotal, handleClearCart } =
    useCart();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useExtendedFormContext<OrderFormData>();

  const { formState } = useExtendedFormContext<OrderFormData>();
  const { pending } = useFormStatus();

  const searchParams = useSearchParams();
  const toastShownRef = useRef(false);

  useEffect(() => {
    console.log("Form errors:", formState.errors);
  }, [formState.errors]);

  useEffect(() => {
    // if (toastShownRef.current) return;

    const status = searchParams.get("status");
    const message = searchParams.get("message");

    if (status === "success") {
      handleClearCart();
      toast.success("Оплата успішна!");
      // toastShownRef.current = true;
    } else if (status === "error" && message) {
      toast.error(decodeURIComponent(message));
      // toastShownRef.current = true;
    }

    // Clean up URL parameters
    if (status || message) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("status");
      newUrl.searchParams.delete("message");
      router.replace(newUrl.toString(), { scroll: false });
    }
  }, [searchParams, handleClearCart, router]);

  const onSubmit = async (data: OrderFormData, e: any) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === "object") {
          Object.entries(value).forEach(([subKey, subValue]) => {
            formData.append(`${key}.${subKey}`, String(subValue));
          });
        } else {
          formData.append(key, String(value));
        }
      });

      // Add cart data and totals
      formData.append("cartItems", JSON.stringify(cartItems));
      formData.append(
        "totalAmount",
        String(calculateTotal - calculateDiscountTotal)
      );

      const result = await buyAction(formData);

      if (result.success && result.checkout_url) {
        window.location.href = result.checkout_url;
      } else {
        toast.error(result.message);
        console.log("Server validation failed:", result.message);
      }
    } catch (error) {
      console.log("Submission error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sticky top-4 w-full  bg-white p-4 rounded-md shadow-sm border border-gray-200"
    >
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

      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="w-full mt-4 bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 transition-colors"
      >
        {isSubmitting || pending ? "Обробка" : "Купити"}
      </button>

      <p className="text-xs text-gray-500 mt-2">
        Підтверджуючи замовлення, я приймаю умови:
        <br />• положення про обробку і захист персональних даних
        <br />• угоди користувача
      </p>
    </form>
  );
};

export default Summary;
