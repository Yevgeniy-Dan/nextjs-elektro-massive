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

const WEIGHT_THRESHOLD = 30;
const CARGO_WAREHOUSE_REF = "9a68df70-0267-42a8-bb5c-37f427e36ee4";

const orderFormSchema = z
  .object({
    contactData: z.object({
      phone: z
        .string()
        .regex(/^\d{2}-\d{3}-\d{4}$/, "Невірний формат номера телефону")
        .transform((val) => `+380${val.replace(/-/g, "")}`),
      firstName: z
        .string()
        .min(1, "Ім'я є обов'язковим")
        .regex(
          /^[А-ЯЁІЇЄҐа-яёіїєґ']+$/,
          "Дозволені тільки українські та російські літери"
        ),
      secondName: z
        .string()
        .min(1, "По-батькові є обов'язковим")
        .regex(
          /^[А-ЯЁІЇЄҐа-яёіїєґ']+$/,
          "Дозволені тільки українські та російські літери"
        ),
      lastName: z
        .string()
        .min(1, "Прізвище є обов'язковим")
        .regex(
          /^[А-ЯЁІЇЄҐа-яёіїєґ']+$/,
          "Дозволені тільки українські та російські літери"
        ),
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
    // cardData: z.object({
    //   number: z.string().refine((val) => valid.number(val).isValid, {
    //     message: "Невірний номер карти",
    //   }),
    //   expiry: z.string().refine((val) => valid.expirationDate(val).isValid, {
    //     message: "Невірна дата закінчення терміну",
    //   }),
    //   cvc: z.string().refine((val) => valid.cvv(val).isValid, {
    //     message: "Невірний CVC",
    //   }),
    //   name: z.string().min(1, "Ім'я власника картки є обов'язковим"),
    //   focus: z.string(),
    // }),
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

export type OrderFormData = z.infer<typeof orderFormSchema>;

export const useOrderForm = (): ExtendedUseFormReturn<OrderFormData> => {
  const [cardType, setCardType] = useState("");
  const [cities, setCities] = useState<ICity[]>([]);
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
  const [isOverweightOrder, setIsOverweightOrder] = useState(false);
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

  const { setValue, trigger } = methods;

  const calculateTotalWeight = useCallback(async () => {
    const { totalWeight } = await getProductsParams(cartItems);
    setIsOverweightOrder(totalWeight > WEIGHT_THRESHOLD);
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
    setValue("addressData.cityRef", city.Ref, { shouldValidate: true });
    setValue("addressData.cityDescription", city.Description, {
      shouldValidate: true,
    });
    setCities([]);

    try {
      const warehouseData = await getNovaPoshtaWarehouses(city.Ref);
      const totalWeight = await calculateTotalWeight();

      if (totalWeight > WEIGHT_THRESHOLD) {
        const filteredWarehouses = warehouseData.filter(
          (warehouse) => warehouse.TypeOfWarehouse === CARGO_WAREHOUSE_REF
        );
        setWarehouses(filteredWarehouses);
      } else {
        setWarehouses(warehouseData);
      }
    } catch (err) {
      console.error("Error fetching warehouses:", err);
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
  };
};
