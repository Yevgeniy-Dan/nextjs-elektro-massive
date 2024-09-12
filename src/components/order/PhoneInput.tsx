import React, { useState, useEffect } from "react";
import Image from "next/image";

const PhoneInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (value && value.startsWith("+380")) {
      setPhoneNumber(value.slice(4));
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    if (input.length <= 9) {
      setPhoneNumber(input);
      onChange(`+380${input}`);
    }
  };

  const formatPhoneNumber = (number: string) => {
    const groups = [
      number.slice(0, 2),
      number.slice(2, 5),
      number.slice(5, 7),
      number.slice(7, 9),
    ];
    return groups.filter((group) => group.length > 0).join("-");
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Image
          src="/ukrainian-flag.png"
          alt="Ukrainian flag"
          width={20}
          height={15}
        />
        <span className="ml-2 font-semibold">+380</span>
      </div>
      <input
        type="tel"
        value={formatPhoneNumber(phoneNumber)}
        onChange={handleChange}
        className="block w-full pl-24 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Номер телефону"
      />
    </div>
  );
};

export default PhoneInput;
