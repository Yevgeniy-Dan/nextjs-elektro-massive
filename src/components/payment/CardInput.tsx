import React from "react";
import { CardTypeDisplay } from "./CardTypeDisplay";

interface CardInputProps {
  value: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (evt: React.FocusEvent<HTMLInputElement>) => void;
  isValid: boolean;
}

export const CardInput: React.FC<CardInputProps> = ({
  value,
  onChange,
  onFocus,
  isValid,
}) => {
  return (
    <input
      type="tel"
      name="number"
      placeholder="Номер карти"
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      className={`w-full border rounded-md shadow-sm py-2 px-3 ${
        isValid ? "border-gray-300" : "border-red-800"
      }`}
    />
  );
};

export default CardInput;
