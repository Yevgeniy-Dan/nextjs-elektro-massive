import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import valid from "card-validator";
import { useState } from "react";
import {
  formatCardholderName,
  formatCardNumber,
  formatCVC,
  formatExpiry,
} from "@/app/utils/cardFormatters";
import { ExtendedUseFormReturn } from "./extendedFormContext";

const orderFormSchema = z.object({
  contactData: z.object({
    phone: z
      .string()
      .regex(/^\d{2}-\d{3}-\d{4}$/, "Невірний формат номера телефону")
      .transform((val) => `+380${val.replace(/-/g, "")}`),
    firstName: z.string().min(1, "Ім'я є обов'язковим"),
    secondName: z.string().min(1, "По-батькові є обов'язковим"),
    lastName: z.string().min(1, "Прізвище є обов'язковим"),
  }),
  // addressData: z.object({
  //   street: z.string().min(1, "Вулиця є обов'язковою"),
  //   city: z.string().min(1, "Місто є обов'язковим"),
  //   postalCode: z.string().min(1, "Поштовий індекс є обов'язковим"),
  //   country: z.string().min(1, "Країна є обов'язковою"),
  // }),
  cardData: z.object({
    number: z.string().refine((val) => valid.number(val).isValid, {
      message: "Невірний номер карти",
    }),
    expiry: z.string().refine((val) => valid.expirationDate(val).isValid, {
      message: "Невірна дата закінчення терміну",
    }),
    cvc: z.string().refine((val) => valid.cvv(val).isValid, {
      message: "Невірний CVC",
    }),
    name: z.string().min(1, "Ім'я власника картки є обов'язковим"),
    focus: z.string(),
  }),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;

export const useOrderForm = (): ExtendedUseFormReturn<OrderFormData> => {
  const [cardType, setCardType] = useState("");

  const methods = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      contactData: { phone: "", firstName: "", secondName: "", lastName: "" },
      // addressData: { street: "", city: "", postalCode: "", country: "" }, //TODO:
      cardData: { number: "", expiry: "", cvc: "", name: "", focus: "" },
    },
    mode: "onTouched",
  });

  const { setValue, trigger } = methods;

  const handleCardInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    let formattedValue = value;

    switch (name) {
      case "cardData.number":
        formattedValue = formatCardNumber(value);
        const numberValidation = valid.number(formattedValue);
        const detectedCardType = numberValidation.card?.type || "";
        setCardType(detectedCardType);
        break;
      case "cardData.expiry":
        formattedValue = formatExpiry(value);
        break;
      case "cardData.cvc":
        formattedValue = formatCVC(value);
        break;
      case "cardData.name":
        formattedValue = formatCardholderName(value);
        break;
    }

    setValue(name as any, formattedValue, { shouldValidate: true });
    await trigger(name as any);
  };

  const handleCardFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setValue("cardData.focus", event.target.name.replace("cardData.", ""), {
      shouldValidate: false,
    });
  };

  return {
    ...methods,
    handleCardInput,
    handleCardFocus,
    cardType,
  };
};
