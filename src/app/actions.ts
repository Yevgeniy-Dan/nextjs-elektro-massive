"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

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

    // Here you would typically save the order to a database,
    // process payment, send confirmation emails, etc.

    // Revalidate the current page
    revalidatePath("/");

    return { success: true, message: "Замовлення успішно оброблено" };
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
