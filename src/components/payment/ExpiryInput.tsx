import { useCardForm } from "@/hooks/useCardForm";
import React from "react";

interface ExpiryInputProps {
  value: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (evt: React.FocusEvent<HTMLInputElement>) => void;
  isValid: boolean;
}

export const ExpiryInput: React.FC<ExpiryInputProps> = ({
  value,
  onChange,
  onFocus,
  isValid,
}) => {
  return (
    <input
      type="tel"
      name="expiry"
      placeholder="ММ / РР"
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      className={`w-1/2 border rounded-md shadow-sm py-2 px-3 ${
        isValid ? "border-gray-300" : "border-red-800"
      }`}
    />
  );
};

export default ExpiryInput;
