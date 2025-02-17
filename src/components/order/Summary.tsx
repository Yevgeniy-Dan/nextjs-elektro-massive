"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "@/hooks/useCart";
import CartItemsCarousel from "./CartItemsCarousel";
import { buyAction } from "@/app/actions";
import { OrderFormData } from "@/hooks/useOrderForm";
import { useExtendedFormContext } from "@/hooks/extendedFormContext";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "../shared/Spinner";
import { useCheckPaymentStatus } from "@/hooks/useCheckPaymentStatus";
import { deleteNovaPoshtaShipment } from "@/app/actions/nova-poshta";
import { deleteOrder } from "@/app/actions/payment";

const DEBOUNCE_DELAY = 3000; // 3 seconds

interface SummaryProps {
  onErrors: () => void;
  lng: string;
}

const Summary: React.FC<SummaryProps> = ({ onErrors, lng }) => {
  const { cartItems, calculateTotal, calculateDiscountTotal } = useCart();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { isSubmitting },
    trigger,
    clearErrors,
  } = useExtendedFormContext<OrderFormData>();

  const { formState } = useExtendedFormContext<OrderFormData>();

  const searchParams = useSearchParams();

  const errorToastIdRef = useRef<string | number | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log("Form errors:", formState.errors);
  }, [formState.errors]);

  const returnedFromLiqPay = searchParams.get("liqpay_return") === "true";
  const returnedOrderId = searchParams.get("order_id");

  const {
    data: paymentStatusData,
    isLoading: isCheckingPaymentStatus,
    error: paymentStatusError,
  } = useCheckPaymentStatus(returnedFromLiqPay ? returnedOrderId : null);

  const showErrorToast = useCallback((message: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (errorToastIdRef.current) {
        toast.update(errorToastIdRef.current, {
          render: message,
          // type: toast.TYPE.ERROR,
        });
      } else {
        errorToastIdRef.current = toast.error(message, {
          autoClose: 5000,
          closeOnClick: true,
        });
      }
    }, DEBOUNCE_DELAY);
  }, []);

  const cleanUpUrl = useCallback(() => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete("liqpay_return");
    newUrl.searchParams.delete("order_id");
    router.replace(newUrl.pathname + newUrl.search, { scroll: false });
  }, [router]);

  useEffect(() => {
    const handlePaymentStatus = async () => {
      const orderNumber = document.cookie
        .split("; ")
        .find((row) => row.startsWith("pendingOrderNumber="))
        ?.split("=")[1];

      if (!orderNumber) {
        console.log("No pending order found");
        return;
      }

      if (paymentStatusData?.status === "success" && returnedFromLiqPay) {
        document.cookie = "pendingOrderNumber=; path=/; max-age=0";

        router.push(`/thankyou?orderNumber=${returnedOrderId}`);
        return;
      }

      if (paymentStatusData?.status === "error" || paymentStatusError) {
        showErrorToast(
          paymentStatusError
            ? "Помилка перевірки статусу оплати"
            : `Оплата не вдалася: ${paymentStatusData?.err_description || "Будь ласка, спробуйте ще раз."}`
        );
      }

      try {
        await Promise.all([
          deleteNovaPoshtaShipment(orderNumber),
          deleteOrder(orderNumber),
        ]);
      } catch (error) {
        console.error("Failed to cleanup after payment failure:", error);
      } finally {
        document.cookie = "pendingOrderNumber=; path=/; max-age=0";
        cleanUpUrl();
      }
    };

    handlePaymentStatus();
  }, [
    cleanUpUrl,
    lng,
    paymentStatusData,
    paymentStatusError,
    returnedOrderId,
    router,
    returnedFromLiqPay,
    showErrorToast,
  ]);

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

      if (result.success && result.redirectUrl) {
        window.location.href = result.redirectUrl;

        window.gtag("event", "purchase", {
          transaction_id: result.orderNumber,
          items: cartItems.map((item) => ({
            item_id: item.id,
            item_name: item.product.title,
            price: item.product.retail,
            quantity: item.quantity,
          })),
          value: calculateTotal - calculateDiscountTotal,
          currency: "UAH",
        });
      } else {
        showErrorToast(result.message || "Помилка при оформленні замовлення");
        console.log("Server validation failed:", result.message);
      }
    } catch (error) {
      console.log("Submission error:", error);
      showErrorToast("An error occurred while processing your request.");
    }
  };

  const handleBuyClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clearErrors();
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    } else {
      onErrors();
    }
  };

  return (
    <>
      {isCheckingPaymentStatus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <Spinner size={64} />
        </div>
      )}
      <form className="sticky top-4 w-full  bg-white p-4 rounded-md shadow-sm border border-gray-200">
        <div className="mb-4 w-full ">
          <CartItemsCarousel cartItems={cartItems} />
        </div>

        <h2 className="text-lg font-semibold mb-2">Разом:</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span>{cartItems.length} товар(а) на суму</span>
            <span className="font-semibold">
              {calculateTotal.toFixed(2)} грн
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Вартість доставки</span>
            <span className="font-semibold">за тарифами перевізника</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Знижка</span>
            <span className="font-semibold text-green-600">
              {calculateDiscountTotal.toFixed(2)} грн
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="font-semibold">До сплати</span>
            <span className="font-semibold text-xl">
              {(calculateTotal - calculateDiscountTotal).toFixed(2)}
              грн
            </span>
          </div>
        </div>

        <button
          onClick={handleBuyClick}
          disabled={
            isSubmitting || calculateTotal - calculateDiscountTotal === 0
          }
          className="w-full mt-4 bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 transition-colors"
        >
          {isSubmitting ? "Обробка" : "Купити"}
        </button>

        <p className="text-xs text-gray-500 mt-2">
          Підтверджуючи замовлення, я приймаю умови:
          <br />• положення про обробку і захист персональних даних
          <br />• угоди користувача
        </p>
      </form>
    </>
  );
};

export default Summary;
