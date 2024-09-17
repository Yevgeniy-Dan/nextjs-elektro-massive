"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import Fondy, { CallbackData, CallbackResponse } from "cloudipsp-node-js-sdk";

const fondy = new Fondy({
  merchantId: Number(process.env.FONDY_MERCHANT_ID),
  secretKey: process.env.FONDY_SECRET_KEY as string,
});

// Define the schema for contact data
const contactSchema = z.object({
  phone: z.string().regex(/^\+380\d{9}$/, "Невірний формат номера телефону"),
  firstName: z.string().min(1, "Ім'я є обов'язковим"),
  secondName: z.string().min(1, "По-батькові є обов'язковим"),
  lastName: z.string().min(1, "Прізвище є обов'язковим"),
});

// Define the schema for address data in Ukrainian
const addressSchema = z.object({
  street: z.string().min(1, "Вулиця є обов'язковою"),
  city: z.string().min(1, "Місто є обов'язковим"),
  postalCode: z.string().min(1, "Поштовий індекс є обов'язковим"),
  country: z.string().min(1, "Країна є обов'язковою"),
});

// Define the schema for a single cart item
const cartItemSchema = z.object({
  id: z.string(),
  quantity: z.number().int().positive(),
  product: z.object({
    id: z.string(),
    title: z.string(),
    retail: z.number().positive(),
    currency: z.string(),
    discount: z.number().nullable(),
    image_link: z.string().url(),
  }),
});

// Define the schema for the entire form data
const formSchema = z.object({
  contactData: contactSchema,
  // addressData: addressSchema, //TODO:
  cartItems: z.array(cartItemSchema),
  totalAmount: z.string().transform((val) => Number(val)),
});

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
    // addressData: {
    //   street: rawFormData["addressData.street"],
    //   city: rawFormData["addressData.city"],
    //   postalCode: rawFormData["addressData.postalCode"],
    //   country: rawFormData["addressData.country"],
    // },
    cartItems: parsedCartItems,
    totalAmount: rawFormData.totalAmount,
  };

  try {
    const validatedData = formSchema.parse(dataToValidate);

    const paymentData = {
      order_id: `ORDER-${Date.now()}`,
      order_desc: `Замовлення для ${validatedData.contactData.firstName} ${validatedData.contactData.secondName} ${validatedData.contactData.lastName}`,
      currency: "UAH",
      amount: Math.round(validatedData.totalAmount * 100),
      response_url: `${process.env.NEXT_PUBLIC_API_URL}/api/payment-callback`,
      server_callback_url: `${process.env.NEXT_PUBLIC_API_URL}/api/payment-callback`,
    };
    //Example of paymenrresponse
    //    checkout_url: 'https://pay.fondy.eu/merchants/5ad6b888f4becb0c33d543d54e57d86c/default/index.html?token=2e4c4b6d84051c2dd90f5938c65f04fef0c1af90',
    // payment_id: '818304793',
    // response_status: 'success'

    const paymentResponse: {
      checkout_url: string;
      payment_id: string;
      response_status: string;
    } = await fondy.Checkout(paymentData);

    if (paymentResponse.checkout_url) {
      return {
        success: true,
        checkout_url: paymentResponse.checkout_url,
      };
    } else {
      throw new Error("Payment failed");
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

export async function handlePaymentCallback(data: any) {
  try {
    // Verify the payment status
    const isValid = fondy.isValidResponse(data);

    if (isValid) {
      const status = data.order_status;

      if (status === "approved") {
        // Payment successful
        // Update your database, send confirmation email, etc.
        revalidatePath("/"); // Revalidate the home page or any other relevant pages
        return { success: true, redirectUrl: "/thankyou" };
      } else {
        // Payment failed or was canceled
        return {
          success: false,
          redirectUrl: "/checkout",
          message: `Платіж ${status}. Спробуйте ще раз або зверніться до служби підтримки.`,
        };
      }
    } else {
      // Invalid callback data
      console.error("Invalid payment callback data");
      return {
        success: false,
        redirectUrl: "/checkout",
        message: "Отримано недійсні платіжні дані. Спробуйте ще раз.",
      };
    }
  } catch (error) {
    console.error("Error in handlePaymentCallback:", error);
    return {
      success: false,
      redirectUrl: "/checkout",
      message: "Сталася неочікувана помилка. Спробуйте пізніше.",
    };
  }
}
