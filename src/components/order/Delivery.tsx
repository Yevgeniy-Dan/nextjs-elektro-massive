import React from "react";

import { useExtendedFormContext } from "@/hooks/extendedFormContext";
import { OrderFormData } from "@/hooks/useOrderForm";
import Image from "next/image";
import { Check, Edit, Home, MapPin, Truck } from "lucide-react";
import { Enum_Order_Deliverymethod } from "@/gql/graphql";

interface DeliveryProps {
  isActive: boolean;
  onExpand: () => void;
  onContinue: () => void;
}

const Delivery: React.FC<DeliveryProps> = ({
  isActive,
  onContinue,
  onExpand,
}) => {
  const {
    register,
    formState: { errors },
    setValue,
    handleCityInput,
    handleCitySelect,
    handleWarehouseSelect,
    cities,
    warehouses,
    watch,
  } = useExtendedFormContext<OrderFormData>();

  const deliveryMethod = watch("deliveryMethod");
  const cityDescription = watch("addressData.cityDescription");
  const warehouseDescription = watch("addressData.warehouseDescription");
  const warehouseRef = watch("addressData.warehouseRef");
  const cityRef = watch("addressData.cityRef");
  const selectedWarehouse = warehouses.find((w) => w.Ref === warehouseRef);

  const isDeliveryFilled =
    (deliveryMethod === Enum_Order_Deliverymethod.NovaPoshta &&
      Boolean(
        cityRef && warehouseRef && cityDescription && warehouseDescription
      )) ||
    deliveryMethod === Enum_Order_Deliverymethod.SelfPickup;
  const hasDeliveryErrors =
    deliveryMethod === Enum_Order_Deliverymethod.NovaPoshta &&
    errors.addressData &&
    Object.keys(errors.addressData).length > 0;

  const handleDeliveryMethodChange = (method: Enum_Order_Deliverymethod) => {
    setValue("deliveryMethod", method);
    if (method === "selfPickup") {
      // Clear Nova Poshta fields when switching to self-pickup
      setValue("addressData.cityRef", "");
      setValue("addressData.cityDescription", "");
      setValue("addressData.warehouseRef", "");
      setValue("addressData.warehouseDescription", "");
    }
  };

  if (!isActive) {
    return (
      <section className="relative border border-gray-200 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
        <button
          onClick={onExpand}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Edit delivery details"
        >
          <Edit size={18} />
        </button>
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <span
            className={`w-6 h-6 rounded-full text-white flex items-center justify-center mr-2 ${
              isDeliveryFilled && !hasDeliveryErrors
                ? "bg-green-500/80"
                : "bg-gradient-elektro-massive-horizontal"
            }`}
          >
            {isDeliveryFilled && !hasDeliveryErrors ? <Check size={16} /> : "2"}
          </span>
          Доставка
        </h2>
        <div className="mt-2 text-sm text-gray-600 flex">
          {deliveryMethod === "novaPoshta" ? (
            <>
              <Image
                src="/novaposhta.jpg"
                width={24}
                height={24}
                alt="Nova Poshta"
                className="w-5 h-5 mr-2"
              />
              <div>
                <p className="flex items-center mt-0">
                  <MapPin size={16} className="mr-2" />
                  {cityDescription || "Місто не вибрано"}
                </p>
                <p className="flex items-center mt-1">
                  <Home size={16} className="mr-2" />

                  {selectedWarehouse
                    ? selectedWarehouse.Description
                    : "Відділення не вибрано"}
                </p>
              </div>
            </>
          ) : (
            <p className="flex items-center">
              <Truck size={16} className="mr-2" />
              Самовивіз
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-lg font-semibold mb-2 flex items-center">
        <span
          className={`w-6 h-6 rounded-full text-white flex items-center justify-center mr-2 ${
            isDeliveryFilled && !hasDeliveryErrors
              ? "bg-green-500/80"
              : "bg-gradient-elektro-massive-horizontal"
          }`}
        >
          {isDeliveryFilled && !hasDeliveryErrors ? <Check size={16} /> : "2"}
        </span>
        Доставка
      </h2>
      <div className="space-y-2">
        <label className="flex items-center space-x-3 p-3 border border-gray-300 rounded-md">
          <input
            type="radio"
            name="delivery"
            className="form-radio"
            checked={deliveryMethod === "novaPoshta"}
            onChange={() =>
              handleDeliveryMethodChange(Enum_Order_Deliverymethod.NovaPoshta)
            }
          />
          <Image
            src="/novaposhta.jpg"
            width={24}
            height={24}
            alt="Nova Poshta"
            className="w-5 h-5"
          />
          <span>Нова Пошта</span>
          <span className="ml-auto text-gray-500від">від 50 грн</span>
        </label>
        <label className="flex items-center space-x-3 p-3 border border-gray-300 rounded-md">
          <input
            type="radio"
            name="delivery"
            className="form-radio"
            checked={deliveryMethod === "selfPickup"}
            onChange={() =>
              handleDeliveryMethodChange(Enum_Order_Deliverymethod.SelfPickup)
            }
          />
          <Truck size={20} />
          <span>Самовивіз</span>
        </label>
      </div>
      {deliveryMethod === "novaPoshta" ? (
        <>
          <div className="mb-4 relative">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              Місто
            </label>
            <input
              type="text"
              id="city"
              value={cityDescription || ""}
              onChange={(e) => {
                handleCityInput(e);
                setValue("addressData.cityRef", "", { shouldValidate: false });
              }}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Введіть назву міста"
            />
            <input type="hidden" {...register("addressData.cityRef")} />
            {errors.addressData?.cityRef && (
              <p className="mt-1 text-sm text-red-800">
                {errors.addressData.cityRef.message}
              </p>
            )}

            {cities.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {cities.map((city) => (
                  <li
                    key={city.Ref}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city.Description} ({city.Area})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="warehouse"
              className="block text-sm font-medium text-gray-700"
            >
              Відділення
            </label>
            <select
              id="warehouse"
              {...register("addressData.warehouseRef")}
              onChange={(e) => {
                const selectedWarehouse = warehouses.find(
                  (w) => w.Ref === e.target.value
                );
                if (selectedWarehouse) {
                  handleWarehouseSelect(selectedWarehouse);
                }
              }}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Виберіть відділення</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.Ref} value={warehouse.Ref}>
                  {warehouse.Description}
                </option>
              ))}
            </select>
            {errors.addressData?.warehouseRef && (
              <p className="mt-1 text-sm text-red-800">
                {errors.addressData.warehouseRef.message}
              </p>
            )}
          </div>
        </>
      ) : (
        <div className="my-3">
          <h3 className="mb-2 font-semibold">Адреси пунктів самовивізу</h3>
          <p className="my-0 text-gray-700 mb-1">Одеська область, Ізмаїл</p>
          <p className="my-0 text-gray-700 mb-1">Шевченко 1</p>
          <p className="my-0 text-gray-700 mb-1">
            Магазин &quot;ELEKTRO-MASSIVE&quot;
          </p>
        </div>
      )}

      <button
        onClick={onContinue}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Продовжити
      </button>
    </section>
  );
};

export default Delivery;
