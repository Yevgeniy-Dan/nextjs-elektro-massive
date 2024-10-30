import React from "react";
import PhoneInput from "./PhoneInput";
import { OrderFormData } from "@/hooks/useOrderForm";
import { useExtendedFormContext } from "@/hooks/extendedFormContext";
import { Check, Edit, Phone, User } from "lucide-react";

interface ContactDetailsProps {
  isActive: boolean;
  onExpand: () => void;
  onContinue: () => void;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({
  isActive,
  onExpand,
  onContinue,
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useExtendedFormContext<OrderFormData>();

  const phoneNumber = watch("contactData.phone");
  const firstName = watch("contactData.firstName");
  const secondName = watch("contactData.secondName");
  const lastName = watch("contactData.lastName");
  const phone = watch("contactData.phone");

  const isContactFilled = Boolean(firstName && secondName && lastName && phone);
  const hasContactErrors =
    errors.contactData && Object.keys(errors.contactData).length > 0;

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
              isContactFilled && !hasContactErrors
                ? "bg-green-500/80"
                : "bg-gradient-elektro-massive-horizontal"
            }`}
          >
            {isContactFilled && !hasContactErrors ? <Check size={16} /> : "1"}
          </span>
          Контактні дані
        </h2>
        <div className="mt-2 text-sm text-gray-600">
          <p className="flex items-center">
            <User size={16} className="mr-2" />

            {firstName && lastName
              ? `${firstName} ${lastName}`
              : "Ім'я та/або прізвище не вказані"}
          </p>
          <p className="flex items-center mt-1">
            <Phone size={16} className="mr-2" />
            {phoneNumber || "Номер телефону не вказано"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-lg font-semibold mb-2 flex items-center">
        <span
          className={`w-6 h-6 rounded-full text-white flex items-center justify-center mr-2 ${
            isContactFilled && !hasContactErrors
              ? "bg-green-500/80"
              : "bg-gradient-elektro-massive-horizontal"
          }`}
        >
          {isContactFilled && !hasContactErrors ? <Check size={16} /> : "1"}
        </span>
        Контактні дані
      </h2>
      <div className="space-y-4">
        <PhoneInput
          register={register}
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
      <button
        onClick={onContinue}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Продовжити
      </button>
    </section>
  );
};

export default ContactDetails;
