import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import valid from "card-validator";
import { useCallback, useState } from "react";
import {
  formatCardholderName,
  formatCardNumber,
  formatCVC,
  formatExpiry,
} from "@/app/utils/cardFormatters";
import { ExtendedUseFormReturn } from "./extendedFormContext";
import { getNovaPoshtaCities } from "@/app/actions";
import {
  getNovaPoshtaWarehouses,
  getProductsParams,
  ICity,
  IWarehouse,
} from "@/app/actions/nova-poshta";
import { useCart } from "./useCart";
import {
  Enum_Order_Deliverymethod,
  Enum_Order_Paymentmethod,
} from "@/gql/graphql";

const orderFormSchema = z
  .object({
    contactData: z.object({
      phone: z
        .string()
        .trim()
        .regex(/^\d{2}-\d{3}-\d{4}$/, "Невірний формат номера телефону")
        .transform((val) => `+380${val.replace(/-/g, "")}`),
      firstName: z
        .string()
        .trim()
        .min(1, "Ім'я є обов'язковим")
        .regex(/^[А-ЯЁІЇЄҐа-яёіїєґ'\s]+$/, "Тільки кирилиця"),
      secondName: z
        .string()
        .trim()
        .min(1, "По-батькові є обов'язковим")
        .regex(/^[А-ЯЁІЇЄҐа-яёіїєґ'\s]+$/, "Тільки кирилиця"),
      lastName: z
        .string()
        .trim()
        .min(1, "Прізвище є обов'язковим")
        .regex(/^[А-ЯЁІЇЄҐа-яёіїєґ'\s]+$/, "Тільки кирилиця"),
    }),
    addressData: z.object({
      // warehouseRef: z.string().min(1, "Відділення є обов'язковим"),
      // warehouseDescription: z
      //   .string()
      //   .min(1, "Назва відділення є обов'язковою"),
      // cityRef: z.string().min(1, "Місто є обов'язковим"),
      // cityDescription: z.string().min(1, "Назва міста є обов'язковою"),
      warehouseRef: z.string().optional(),
      warehouseDescription: z.string().optional(),
      cityRef: z.string().optional(),
      cityDescription: z.string().optional(),
    }),
    deliveryMethod: z
      .nativeEnum(Enum_Order_Deliverymethod)
      .default(Enum_Order_Deliverymethod.NovaPoshta),
    paymentMethod: z
      .nativeEnum(Enum_Order_Paymentmethod, {
        errorMap: () => ({ message: "Виберіть метод оплати" }),
      })
      .default(Enum_Order_Paymentmethod.Card),
  })
  .refine(
    (data) => {
      if (data.deliveryMethod === Enum_Order_Deliverymethod.NovaPoshta) {
        return Boolean(
          data.addressData.warehouseRef && data.addressData.cityRef
        );
      }
      return true;
    },
    {
      message: "Виберіть місто та відділення для доставки Новою Поштою",
      path: ["addressData"],
    }
  );

export type OrderFormData = z.infer<typeof orderFormSchema>;

export const useOrderForm = (): ExtendedUseFormReturn<OrderFormData> => {
  const [cardType, setCardType] = useState("");
  const [cities, setCities] = useState<ICity[]>([]);
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);

  const { cartItems } = useCart();

  const methods = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      contactData: { phone: "", firstName: "", secondName: "", lastName: "" },
      addressData: { warehouseRef: "", cityRef: "" },
      // cardData: { number: "", expiry: "", cvc: "", name: "", focus: "" },
      deliveryMethod: Enum_Order_Deliverymethod.NovaPoshta,
      paymentMethod: Enum_Order_Paymentmethod.Card,
    },
    mode: "onTouched",
  });

  const { setValue, trigger, setError, clearErrors } = methods;

  const calculateTotalWeight = useCallback(async () => {
    const { totalWeight } = await getProductsParams(cartItems);
    return totalWeight;
  }, [cartItems]);

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
    // setValue("cardData.focus", event.target.name.replace("cardData.", ""), {
    //   shouldValidate: false,
    // });
  };

  const handleCityInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setValue("addressData.cityDescription", value, { shouldValidate: false });
    setValue("addressData.cityRef", "", { shouldValidate: false });
    setValue("addressData.warehouseDescription", "", { shouldValidate: false });
    setValue("addressData.warehouseRef", "", { shouldValidate: false });

    if (value.length >= 2) {
      try {
        const cityData = await getNovaPoshtaCities(value);
        setCities(cityData);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    } else {
      setCities([]);
    }

    await trigger("addressData.cityDescription");
  };

  const handleCitySelect = async (city: ICity) => {
    console.log("Selected city:", city);
    setValue("addressData.cityRef", city.Ref, { shouldValidate: true });
    setValue("addressData.cityDescription", city.Description, {
      shouldValidate: true,
    });
    setCities([]);
    setWarehouses([]);

    setValue("addressData.warehouseRef", "", {
      shouldValidate: false,
    });
    setValue("addressData.warehouseDescription", "", {
      shouldValidate: false,
    });

    try {
      const totalWeight = await calculateTotalWeight();
      const result = await getNovaPoshtaWarehouses(city.Ref, totalWeight);
      if (result.error) {
        setError("addressData.warehouseRef", {
          message: result.error,
        });
      } else {
        clearErrors("addressData.warehouseRef");
        setWarehouses(result.warehouses);
      }
    } catch (err) {
      console.error("Error fetching warehouses:", err);
      setError("addressData.warehouseRef", {
        message: "Не вдалося отримати відділення Нової Пошти.",
      });
      setWarehouses([]);
    }
  };

  const handleWarehouseSelect = (warehouse: IWarehouse) => {
    setValue("addressData.warehouseRef", warehouse.Ref, {
      shouldValidate: true,
    });
    setValue("addressData.warehouseDescription", warehouse.Description, {
      shouldValidate: true,
    });
  };

  return {
    ...methods,
    handleCardInput,
    handleCardFocus,
    handleCitySelect,
    handleCityInput,
    handleWarehouseSelect,
    warehouses,
    cities,
    cardType,
    setError,
    clearErrors,
  };
};
