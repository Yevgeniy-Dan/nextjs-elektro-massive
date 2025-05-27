"use server";

import axios from "axios";
import { addDays, format } from "date-fns";
import { calculateProductDimensions } from "../utils/novaPoshtaHeplers";
import {
  Enum_Order_Deliverymethod,
  Enum_Order_Paymentmethod,
} from "@/gql/graphql";
import { getOrder } from "./payment";
import { CartItemType } from "@/types/types";

const NOVA_POSHTA_API_URL = "https://api.novaposhta.ua/v2.0/json/";
const API_KEY = process.env.NOVA_POSHTA_API_KEY;
const WEIGHT_THRESHOLD = 30;
const CARGO_WAREHOUSE_REF = "9a68df70-0267-42a8-bb5c-37f427e36ee4"; // Вантажне відділення

interface INovaPoshtaMethodProperties {
  PayerType: string;
  PaymentMethod: string;
  DateTime: string;
  CargoType: string;
  VolumeGeneral: string;
  Weight: string;
  ServiceType: string;
  SeatsAmount: string;
  Description: string;
  Cost: string;
  CitySender: string;
  Sender: string;
  SenderAddress: string;
  ContactSender: string;
  SendersPhone: string;
  CityRecipient?: string;
  Recipient: string;
  RecipientAddress?: string;
  ContactRecipient: string;
  RecipientsPhone: string;
  OptionsSeat?: Array<{
    volumetricVolume: string;
    volumetricWidth: string;
    volumetricLength: string;
    volumetricHeight: string;
    weight: string;
  }>[];
  AfterpaymentOnGoodsCost?: string;
}

interface NovaPoshtaApiResponse<T> {
  success: boolean;
  data: T[];
  errors: string[];
  warnings: string[];
  info: string[];
}

export interface ICity {
  Description: string;
  Ref: string;
  Area: string;
}

export interface IWarehouse {
  Description: string;
  Ref: string;
  Number: string;
  TypeOfWarehouse: string;
}

interface ISenderContactPerson {
  Ref: string;
  Description: string;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  Phones: string;
  Email: string;
}

type CartItemForShipment = Pick<CartItemType, "id" | "quantity" | "product">;

interface IShipmentData {
  firstName: string;
  secondName: string;
  lastName: string;
  phone: string;
  warehouseRef?: string;
  cityRef?: string;
  cartItems: CartItemForShipment[];
  deliveryMethod: Enum_Order_Deliverymethod;
  totalAmount: number;
}

export async function getNovaPoshtaCities(search?: string) {
  const response = await axios.post<
    NovaPoshtaApiResponse<{
      Addresses: Array<{
        Present: string;
        Ref: string;
        DeliveryCity: string;
        Area: string;
      }>;
      TotalCount: number;
    }>
  >(NOVA_POSHTA_API_URL, {
    apiKey: API_KEY,
    modelName: "Address",
    calledMethod: "searchSettlements",
    methodProperties: {
      CityName: search,
      Limit: 20,
    },
  });

  return (
    response.data.data[0]?.Addresses.map((address) => ({
      Description: address.Present,
      Ref: address.DeliveryCity,
      Area: address.Area,
    })) || []
  );
}

async function getWarehousesByType(
  cityRef: string
  // typeOfWarehouseRef: string
): Promise<IWarehouse[]> {
  try {
    const response = await axios.post<NovaPoshtaApiResponse<IWarehouse>>(
      NOVA_POSHTA_API_URL,
      {
        apiKey: API_KEY,
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityRef: cityRef,
          // TypeOfWarehouseRef: typeOfWarehouseRef,
        },
      }
    );

    if (response.data.success) {
      return response.data.data.filter(
        (warehouse) =>
          warehouse.Description.startsWith("Відділення") ||
          warehouse.Description.startsWith("Пункт")
      );
    } else {
      console.error("API request failed:", response.data.errors);
      return [];
    }
  } catch (error) {
    console.error("Error fetching warehouses:", error);
    return [];
  }
}

export async function getNovaPoshtaWarehouses(
  cityRef: string,
  totalWeight: number
): Promise<{ warehouses: IWarehouse[]; error?: string }> {
  const warehouseTypes = [
    "9a68df70-0267-42a8-bb5c-37f427e36ee4", // Вантажне відділення
    "841339c7-591a-42e2-8233-7a0a00f0ed6f", // Відділення
    // Add other warehouse type refs as needed
  ];

  try {
    // const warehousePromises = warehouseTypes.map((type) =>
    //   getWarehousesByType(cityRef, type)
    // );
    const warehouses = await getWarehousesByType(cityRef);
    let warehouseArrays = await Promise.all(warehouses);

    warehouseArrays = warehouseArrays.flat();

    let filteredWarehouses: IWarehouse[] = [];

    if (totalWeight > WEIGHT_THRESHOLD) {
      filteredWarehouses = warehouseArrays.filter(
        (warehouse) => warehouse.TypeOfWarehouse === CARGO_WAREHOUSE_REF
      );
      if (filteredWarehouses.length === 0) {
        return {
          warehouses: [],
          error:
            "У цьому місті немає грузових відділень для посилок вагою понад 30 кг. Виберіть інше найближче до вас місто.", //FIXME: lang support
        };
      }
    } else {
      filteredWarehouses = warehouseArrays;
    }

    return { warehouses: filteredWarehouses };
  } catch (error) {
    console.error("Error fetching warehouses:", error);
    return {
      warehouses: [],
      error: "Не вдалося отримати відділення Нової Пошти", //FIXME: lang support
    };
  }
}

export async function createNovaPoshtaShipment(data: IShipmentData) {
  if (data.deliveryMethod === Enum_Order_Deliverymethod.SelfPickup) {
    // For self-pickup, we don't need to create a Nova Poshta shipment
    // Instead, we'll return a custom identifier for the self-pickup order
    return `SELF-PICKUP-${Date.now()}`;
  }

  const { recipientRef, contactPersonRecipientRef } =
    await createRecipient(data);

  const contactSender = await getSenderCounterpartyContactPersons();

  const {
    totalWeight,
    optionsSeat /*if you plan to create an EN with/to a post office*/,
    totalVolume,
  } = await getProductsParams(data.cartItems);

  const senderAddress =
    totalWeight > WEIGHT_THRESHOLD
      ? process.env.NOVA_POSHTA_SENDER_ADDRESS_CARGO
      : process.env.NOVA_POSHTA_SENDER_ADDRESS_REGULAR;

  if (!senderAddress) {
    throw new Error(
      totalWeight > WEIGHT_THRESHOLD
        ? "Вантажне відділення відправника не налаштоване"
        : "Звичайне відділення відправника не налаштоване"
    );
  }

  const description =
    data.cartItems.reduce((acc, item) => {
      const itemDesc = `${item.product.title} (${item.quantity} шт.)`;
      if ((acc + itemDesc).length <= 36) {
        return acc ? `${acc}; ${itemDesc}` : itemDesc;
      }
      return acc;
    }, "") || data.cartItems[0].product.title.slice(0, 36);

  const methodProperties: INovaPoshtaMethodProperties = {
    PayerType: data.totalAmount >= 3000 ? "Sender" : "Recipient",
    PaymentMethod: "Cash",
    DateTime: format(addDays(new Date(), 1), "dd.MM.yyyy"),
    CargoType: "Parcel",
    VolumeGeneral: totalVolume.toFixed(4),
    Weight: totalWeight.toFixed(3),
    ServiceType: "WarehouseWarehouse",
    SeatsAmount: "1", // is responsible for the number of positions per EN.
    Description: description,
    Cost: Math.ceil(data.totalAmount).toString(),
    CitySender: await getSenderCityRef("Ізмаїл"),
    Sender: process.env.NOVA_POSHTA_SENDER_REF,
    SenderAddress: senderAddress,
    ContactSender: contactSender.Ref,
    SendersPhone: contactSender.Phones,
    CityRecipient: data.cityRef,
    Recipient: recipientRef,
    RecipientAddress: data.warehouseRef,
    ContactRecipient: contactPersonRecipientRef,
    RecipientsPhone: data.phone,
  };

  if (!Enum_Order_Paymentmethod.Card) {
    methodProperties.AfterpaymentOnGoodsCost = Math.ceil(
      data.totalAmount
    ).toString();
  }

  const response = await axios.post<
    NovaPoshtaApiResponse<{ IntDocNumber: string }>
  >(NOVA_POSHTA_API_URL, {
    apiKey: API_KEY,
    modelName: "InternetDocument",
    calledMethod: "save",
    methodProperties: methodProperties,
  });

  if (!response.data.success) {
    throw new Error(
      `Nova Poshta API Error: ${response.data.errors.join(", ")}`
    );
  }

  return response.data.data[0]?.IntDocNumber;
}

export async function deleteNovaPoshtaShipment(orderNumber: string) {
  try {
    // Skip deletion if it's a self-pickup order
    if (orderNumber.startsWith("SELF-PICKUP-")) {
      return true;
    }

    const { orderDate } = await getOrder(orderNumber);

    const date = new Date(orderDate);

    const fromDate = new Date(date);
    fromDate.setDate(fromDate.getDate() - 1);
    const toDate = new Date(date);
    toDate.setDate(toDate.getDate() + 1);

    const dateTimeFrom = format(fromDate, "dd.MM.yyyy");
    const dateTimeTo = format(toDate, "dd.MM.yyyy");

    const documentsResponse = await axios.post(NOVA_POSHTA_API_URL, {
      apiKey: API_KEY,
      modelName: "InternetDocumentGeneral",
      calledMethod: "getDocumentList",
      methodProperties: {
        DateTimeFrom: dateTimeFrom,
        DateTimeTo: dateTimeTo,
        GetFullList: "1",
      },
    });

    if (!documentsResponse.data.success) {
      console.error(
        `Failed to get document list: ${documentsResponse.data.errors.join(", ")}`
      );
      return false;
    }

    const documentToDelete = documentsResponse.data.data.find((doc: any) => {
      return doc.IntDocNumber === orderNumber;
    });

    if (!documentToDelete) {
      console.error(`No document found for order number: ${orderNumber}`);
      return false;
    }

    const deleteResponse = await axios.post(NOVA_POSHTA_API_URL, {
      apiKey: API_KEY,
      modelName: "InternetDocumentGeneral",
      calledMethod: "delete",
      methodProperties: {
        DocumentRefs: documentToDelete.Ref,
      },
    });

    if (!deleteResponse.data.success) {
      console.error(
        `Failed to delete Nova Poshta shipment: ${deleteResponse.data.errors.join(", ")}`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting Nova Poshta shipment:", error);
    return false;
  }
}

export async function getSenderCityRef(cityName: string) {
  try {
    const response = await axios.post(NOVA_POSHTA_API_URL, {
      apiKey: API_KEY,
      modelName: "Address",
      calledMethod: "getCities",
      methodProperties: {
        FindByString: cityName,
      },
    });

    if (response.data.success && response.data.data.length > 0) {
      const city = response.data.data[0];

      return city.Ref;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching city data:", error);
    return null;
  }
}

async function createRecipient(data: IShipmentData): Promise<{
  recipientRef: string;
  contactPersonRecipientRef: string;
}> {
  const response = await axios.post(NOVA_POSHTA_API_URL, {
    apiKey: API_KEY,
    modelName: "Counterparty",
    calledMethod: "save",
    methodProperties: {
      FirstName: data.firstName,
      MiddleName: data.secondName,
      LastName: data.lastName,
      Phone: data.phone,
      Email: "",
      CounterpartyType: "PrivatePerson",
      CounterpartyProperty: "Recipient",
    },
  });
  if (response.data.success) {
    return {
      recipientRef: response.data.data[0].Ref,
      contactPersonRecipientRef:
        response.data.data[0].ContactPerson.data[0].Ref,
    };
  } else {
    throw new Error("Failed to create recipient");
  }
}

export async function getSenderAddress() {
  const response = await axios.post(NOVA_POSHTA_API_URL, {
    apiKey: API_KEY,
    modelName: "CounterpartyGeneral",
    calledMethod: "getCounterpartyAddresses",
    methodProperties: {
      Ref: process.env.NOVA_POSHTA_SENDER_REF,
      CounterpartyProperty: "Sender",
    },
  });

  if (response.data.success && response.data.data.length > 0) {
    return response.data.data[0];
  } else {
    throw new Error("Failed to get sender address");
  }
}

async function getSenderCounterpartyContactPersons(): Promise<ISenderContactPerson> {
  try {
    const response = await axios.post(NOVA_POSHTA_API_URL, {
      apiKey: API_KEY,
      modelName: "CounterpartyGeneral",
      calledMethod: "getCounterpartyContactPersons",
      methodProperties: {
        Ref: process.env.NOVA_POSHTA_SENDER_REF,
      },
    });

    if (response.data.success) {
      return response.data.data[0];
    } else {
      throw new Error(`API request failed: ${response.data.errors.join(", ")}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Network error: ${error.message}`);
    } else {
      throw error;
    }
  }
}

export async function getProductsParams(cartItems: CartItemForShipment[]) {
  let totalWeight = 0;
  let totalVolume = 0;

  const optionsSeat: Array<{
    volumetricVolume: string;
    volumetricWidth: string;
    volumetricLength: string;
    volumetricHeight: string;
    weight: string;
  }> = [];

  cartItems.forEach((item, index) => {
    const { volume, weight, width, length, height } =
      calculateProductDimensions(item.product);

    totalWeight += weight * item.quantity;
    totalVolume += volume * item.quantity;

    for (let i = 0; i < item.quantity; i++) {
      optionsSeat.push({
        volumetricVolume: volume.toFixed(4),
        volumetricWidth: width.toString(),
        volumetricLength: length.toString(),
        volumetricHeight: height.toString(),
        weight: weight.toFixed(3),
      });
    }
  });

  return {
    totalWeight,
    totalVolume,
    optionsSeat,
  };
}
