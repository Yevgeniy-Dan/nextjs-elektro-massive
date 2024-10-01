import {
  Enum_Order_Deliverymethod,
  Enum_Order_Paymentmethod,
} from "@/gql/graphql";
import { z } from "zod";

// Define the schema for contact data
export const contactSchema = z.object({
  phone: z.string().regex(/^\+380\d{9}$/, "Невірний формат номера телефону"),
  firstName: z.string().min(1, "Ім'я є обов'язковим"),
  secondName: z.string().min(1, "По-батькові є обов'язковим"),
  lastName: z.string().min(1, "Прізвище є обов'язковим"),
});

// Define the schema for address data in Ukrainian
export const addressSchema = z.object({
  // warehouseRef: z.string().min(1, "Відділення є обов'язковим"),
  // warehouseDescription: z.string().min(1, "Назва відділення є обов'язковою"),
  // cityRef: z.string().min(1, "Місто є обов'язковим"),
  // cityDescription: z.string().min(1, "Назва міста є обов'язковою"),
  warehouseRef: z.string().optional(),
  warehouseDescription: z.string().optional(),
  cityRef: z.string().optional(),
  cityDescription: z.string().optional(),
});

// Define the schema for a single cart item
export const cartItemSchema = z.object({
  id: z.string(),
  quantity: z.number().int().positive(),
  product: z.object({
    id: z.string(),
    part_number: z.string(),
    title: z.string(),
    retail: z.number().positive(),
    currency: z.string(),
    discount: z.number().nullable(),
    image_link: z.string().url(),
    slug: z.string(),
    params: z.record(z.string()).optional(),
  }),
});

// Define the schema for the entire form data
export const formSchema = z
  .object({
    contactData: contactSchema,
    addressData: addressSchema,
    paymentMethod: z
      .nativeEnum(Enum_Order_Paymentmethod, {
        errorMap: () => ({ message: "Виберіть метод оплати" }),
      })
      .default(Enum_Order_Paymentmethod.Card),
    deliveryMethod: z
      .nativeEnum(Enum_Order_Deliverymethod)
      .default(Enum_Order_Deliverymethod.NovaPoshta),
    cartItems: z.array(cartItemSchema),
    totalAmount: z.string().transform((val) => Number(val)),
  })
  .refine(
    (data) => {
      if (data.deliveryMethod === Enum_Order_Deliverymethod.NovaPoshta) {
        return data.addressData.warehouseRef && data.addressData.cityRef;
      }

      return true;
    },
    {
      message: "Виберіть місто та відділення для доставки Новою Поштою",
      path: ["addressData"],
    }
  );
