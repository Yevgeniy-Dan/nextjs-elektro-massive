"use client";

import React from "react";
import { UseFormRegister, FieldError, UseFormSetValue } from "react-hook-form";
import OptimizedImage from "../shared/OptimizedImage";
import { AWS_CDN_URL } from "@/app/utils/constants";

interface PhoneInputProps {
  register: UseFormRegister<any>;
  error?: FieldError;
  value: string;
  setValue: UseFormSetValue<any>;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  register,
  error,
  value,
  setValue,
}) => {
  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    let formatted = "";
    for (let i = 0; i < digits.length && i < 9; i++) {
      if (i === 2 || i === 5) {
        formatted += "-";
      }
      formatted += digits[i];
    }
    return formatted;
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(event.target.value);
    setValue("contactData.phone", formatted, { shouldValidate: true });
  };

  return (
    <div>
      <label
        htmlFor="phone"
        className="block text-sm font-medium text-gray-700"
      >
        Телефон *
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <OptimizedImage
            src={`${AWS_CDN_URL}shared/public/icons/ukrainian-flag.png`}
            alt="Ukrainian flag"
            width={20}
            height={15}
          />
          <span className="ml-2 font-semibold">+380</span>
        </div>
        <input
          type="tel"
          {...register("contactData.phone")}
          onChange={handlePhoneChange}
          value={value}
          className="block w-full pl-24 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="XX-XXX-XXXX"
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-800">{error.message}</p>}
    </div>
  );
};

export default PhoneInput;
