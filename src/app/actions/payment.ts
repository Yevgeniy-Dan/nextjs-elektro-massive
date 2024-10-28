"use server";

import { formSchema } from "./schemas";
import { createNovaPoshtaShipment, getSenderAddress } from "./nova-poshta";
import { z } from "zod";
import CryptoJS from "crypto-js";
import { CREATE_ORDER_MUTATION } from "@/components/order/mutations";
import {
  CreateOrderMutation,
  CreateOrderMutationVariables,
  Enum_Order_Deliverymethod,
  OrderInput,
} from "@/gql/graphql";
import { getClient } from "../../lib/apollo-client";
import { OrderFormData } from "@/hooks/useOrderForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import { cookies } from "next/headers";
import { fallbackLng, lngCookieName } from "../i18n/settings";

const LIQPAY_PUBLIC_KEY = process.env.LIQPAY_PUBLIC_KEY;
const LIQPAY_PRIVATE_KEY = process.env.LIQPAY_PRIVATE_KEY;

export async function buyAction(formData: FormData) {
  const cookieStore = cookies();

  const currentLanguage = cookieStore.get(lngCookieName)?.value || fallbackLng;

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
      warehouseDescription: rawFormData["addressData.warehouseDescription"],
      cityRef: rawFormData["addressData.cityRef"],
      cityDescription: rawFormData["addressData.cityDescription"],
    },
    deliveryMethod: rawFormData.deliveryMethod,
    paymentMethod: rawFormData.paymentMethod,
    cartItems: parsedCartItems,
    totalAmount: rawFormData.totalAmount,
  };

  try {
    const {
      addressData,
      contactData,
      cartItems,
      totalAmount,
      paymentMethod,
      deliveryMethod,
    } = formSchema.parse(dataToValidate);

    const shipmentNumber = await createNovaPoshtaShipment({
      ...contactData,
      ...addressData,
      deliveryMethod: deliveryMethod,
      cartItems: cartItems,
    });

    const orderNumber = shipmentNumber;

    await saveOrderToDatabase({
      orderNumber,
      addressData,
      contactData,
      cartItems: cartItems.map((item) => ({
        product: item.product.id,
        quantity: item.quantity,
        retail: item.product.retail,
      })),
      totalAmount,
      paymentMethod,
      deliveryMethod,
    });

    if (paymentMethod === "card") {
      const liqpayData = {
        public_key: LIQPAY_PUBLIC_KEY,
        version: "3",
        action: "pay",
        amount: totalAmount,
        currency: "UAH",
        description: `Order for ${contactData.firstName} ${contactData.lastName}`,
        order_id: orderNumber,
        result_url: `${process.env.NEXT_PUBLIC_API_URL}/checkout?liqpay_return=true&order_id=${orderNumber}`,
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
        redirectUrl: `${process.env.NEXT_PUBLIC_API_URL}/${currentLanguage}/thankyou?orderNumber=${orderNumber}`,
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
type SaveOrderInput = OrderFormData & {
  orderNumber: string;
  totalAmount: number;
  cartItems: {
    product: string;
    quantity: number;
    retail: number;
  }[];
};

const saveOrderToDatabase = async (order: SaveOrderInput) => {
  const session = await getServerSession(authOptions);
  const senderAddress = await getSenderAddress();

  const input: OrderInput = {
    orderNumber: order.orderNumber,
    orderDate: new Date().toISOString(),
    firstName: order.contactData.firstName,
    lastName: order.contactData.lastName,
    secondName: order.contactData.secondName,
    phoneNumber: order.contactData.phone,
    totalAmount: order.totalAmount,
    paymentMethod: order.paymentMethod,
    deliveryMethod: order.deliveryMethod,
    shippingAddress:
      order.deliveryMethod === Enum_Order_Deliverymethod.NovaPoshta
        ? `${order.addressData.cityDescription}, ${order.addressData.warehouseDescription}`
        : `${senderAddress.CityDescription}, ${senderAddress.Description}`,
    users_permissions_user: session?.user.strapiUserId,
    orderItems: order.cartItems,
    publishedAt: new Date().toISOString(),
  };

  const { data } = await getClient().mutate<
    CreateOrderMutation,
    CreateOrderMutationVariables
  >({
    mutation: CREATE_ORDER_MUTATION,
    variables: {
      input,
    },
  });

  return data?.createOrder?.data?.attributes?.orderNumber;
};
