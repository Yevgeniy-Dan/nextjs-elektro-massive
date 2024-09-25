import React from "react";

import { useExtendedFormContext } from "@/hooks/extendedFormContext";
import { OrderFormData } from "@/hooks/useOrderForm";
import Image from "next/image";

const Delivery: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleCityInput,
    handleCitySelect,
    cities,
    warehouses,
    watch,
  } = useExtendedFormContext<OrderFormData>();

  const cityDescription = watch("addressData.cityDescription");

  return (
    <section>
      <h2 className="text-lg font-semibold mb-2 flex items-center">
        <span className="w-6 h-6 rounded-full bg-gradient-elektro-massive-horizontal text-white flex items-center justify-center mr-2">
          2
        </span>
        Доставка
      </h2>
      <div className="space-y-2">
        <label className="flex items-center space-x-3 p-3 border border-gray-300 rounded-md">
          <input
            type="radio"
            defaultChecked
            name="delivery"
            className="form-radio"
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
        {/* <label className="flex items-center space-x-3 p-3 border border-gray-300 rounded-md">
          <input type="radio" name="delivery" className="form-radio" />
          <Truck size={20} />
          <span>Самовивіз</span>
        </label> */}
      </div>
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
          {...register("addressData.cityRef")}
          value={cityDescription}
          onChange={handleCityInput}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Введіть назву міста"
        />
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
    </section>
  );
};

export default Delivery;
