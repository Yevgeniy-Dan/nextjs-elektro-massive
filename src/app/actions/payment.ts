"use server";

import { formSchema } from "./schemas";
import { createNovaPoshtaShipment } from "./nova-poshta";
import { z } from "zod";
import CryptoJS from "crypto-js";

const LIQPAY_PUBLIC_KEY = process.env.LIQPAY_PUBLIC_KEY;
const LIQPAY_PRIVATE_KEY = process.env.LIQPAY_PRIVATE_KEY;

export async function buyAction(formData: FormData) {
  // await new Promise<void>((resolve) => setTimeout(resolve, 4000));

  const rawFormData = Object.fromEntries(formData.entries());

  const parsedCartItems = JSON.parse(rawFormData.cartItems as string);

  // Prepare the data for validation
  const dataToValidate = {
    contactData: {
      phone: rawFormData["contactData.phone"],
      firstName: rawFormData["contactData.firstName"],
      secondName: rawFormData["contactData.secondName"],
      lastName: rawFormData["contactData.lastName"],
    },
    addressData: {
      warehouseRef: rawFormData["addressData.warehouseRef"],
      cityRef: rawFormData["addressData.cityRef"],
    },
    paymentMethod: rawFormData.paymentMethod,
    cartItems: parsedCartItems,
    totalAmount: rawFormData.totalAmount,
  };

  try {
    const { addressData, contactData, cartItems, totalAmount, paymentMethod } =
      formSchema.parse(dataToValidate);

    const shipmentNumber = await createNovaPoshtaShipment({
      ...contactData,
      ...addressData,
      cartItems: cartItems,
    });

    const orderId = shipmentNumber;

    // await saveOrderToDatabase({
    //   orderId,
    //   addressData,
    //   contactData,
    //   cartItems,
    //   totalAmount,
    //   status: paymentMethod === "card" ? "pending" : "awaiting_payment",
    //   paymentMethod,
    // });

    if (paymentMethod === "card") {
      const liqpayData = {
        public_key: LIQPAY_PUBLIC_KEY,
        version: "3",
        action: "pay",
        amount: totalAmount,
        currency: "UAH",
        description: `Order for ${contactData.firstName} ${contactData.lastName}`,
        order_id: orderId,
        result_url: `${process.env.NEXT_PUBLIC_API_URL}/checkout?liqpay_return=true&order_id=${orderId}`,
      };

      // Create base64 encoded data string
      const dataString = CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(JSON.stringify(liqpayData))
      );

      // Create signature
      const signString = LIQPAY_PRIVATE_KEY + dataString + LIQPAY_PRIVATE_KEY;
      const signature = CryptoJS.enc.Base64.stringify(
        CryptoJS.SHA1(signString)
      );

      const redirectUrl = `https://www.liqpay.ua/api/3/checkout?data=${encodeURIComponent(
        dataString
      )}&signature=${encodeURIComponent(signature)}`;

      return { success: true, redirectUrl };
    } else {
      return {
        success: true,
        redirectUrl: `${process.env.NEXT_PUBLIC_API_URL}/thankyou?order_id=${orderId}`,
      };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );

      return {
        success: false,
        message: "Помилка перевірки",
        errors: errorMessages,
      };
    }

    // Handle other types of errors
    console.error("Error processing order:", error);
    return { success: false, message: "Сталася неочікувана помилка" };
  }
}
