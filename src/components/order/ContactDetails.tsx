import React from "react";
import PhoneInput from "./PhoneInput";
import { OrderFormData } from "@/hooks/useOrderForm";
import { useExtendedFormContext } from "@/hooks/extendedFormContext";

const ContactDetails: React.FC = () => {
  const {
    register,
    formState: { errors, touchedFields },
    watch,
    setValue,
  } = useExtendedFormContext<OrderFormData>();

  const phoneNumber = watch("contactData.phone");

  return (
    <section>
      <h2 className="text-lg font-semibold mb-2 flex items-center">
        <span className="w-6 h-6 rounded-full bg-gradient-elektro-massive-horizontal text-white flex items-center justify-center mr-2">
          1
        </span>
        Контактні дані
      </h2>
      <div className="space-y-4">
        <PhoneInput
          register={register}
          // error={showError("phone") ? errors.contactData?.phone : undefined}
          error={errors.contactData?.phone}
          value={phoneNumber}
          setValue={setValue}
        />
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            Ім&apos;я *
          </label>
          <input
            type="text"
            id="firstName"
            {...register("contactData.firstName")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.contactData?.firstName && (
            <p className="mt-1 text-sm text-red-800">
              {errors.contactData.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="secondName"
            className="block text-sm font-medium text-gray-700"
          >
            По-батькові *
          </label>
          <input
            type="text"
            id="secondName"
            {...register("contactData.secondName")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.contactData?.secondName && (
            <p className="mt-1 text-sm text-red-800">
              {errors.contactData.secondName.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Прізвище *
          </label>
          <input
            type="text"
            id="lastName"
            {...register("contactData.lastName")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.contactData?.lastName && (
            <p className="mt-1 text-sm text-red-800">
              {errors.contactData.lastName.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
