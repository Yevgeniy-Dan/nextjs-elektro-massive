import React from "react";

interface NameInputProps {
  value: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (evt: React.FocusEvent<HTMLInputElement>) => void;
  isValid: boolean;
}

export const NameInput: React.FC<NameInputProps> = ({
  value,
  onChange,
  onFocus,
  isValid,
}) => {
  return (
    <input
      type="text"
      name="name"
      placeholder="Ім'я на картці"
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      className={`w-full border rounded-md shadow-sm py-2 px-3 ${
        isValid ? "border-gray-300" : "border-red-800"
      }`}
    />
  );
};

export default NameInput;
