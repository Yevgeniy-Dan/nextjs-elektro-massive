import React from "react";

interface CVCInputProps {
  value: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (evt: React.FocusEvent<HTMLInputElement>) => void;
  isValid: boolean;
}

export const CVCInput: React.FC<CVCInputProps> = ({
  value,
  onChange,
  onFocus,
  isValid,
}) => {
  return (
    <input
      type="tel"
      name="cvc"
      placeholder="CVV"
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      className={`w-1/2 border rounded-md shadow-sm py-2 px-3 ${
        isValid ? "border-gray-300" : "border-red-800"
      }`}
    />
  );
};

export default CVCInput;
