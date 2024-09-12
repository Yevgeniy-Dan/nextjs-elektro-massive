import React from "react";
import PhoneInput from "./PhoneInput";

interface ContactDetailsProps {
  contactData: {
    phone: string;
    firstName: string;
    secondName: string;
    lastName: string;
  };
  handleContactChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({
  contactData,
  handleContactChange,
}) => {
  const handlePhoneChange = (value: string) => {
    handleContactChange({
      target: { name: "phone", value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <section>
      <h2 className="text-lg font-semibold mb-2 flex items-center">
        <span className="w-6 h-6 rounded-full bg-gradient-elektro-massive-horizontal text-white flex items-center justify-center mr-2">
          1
        </span>
        Контактні дані
      </h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Телефон *
          </label>

          <PhoneInput value={contactData.phone} onChange={handlePhoneChange} />
        </div>
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
            name="firstName"
            value={contactData.firstName}
            onChange={handleContactChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="secondName"
            className="block text-sm font-medium text-gray-700"
          >
            По-батькові *
          </label>
          <input
            type="secondName"
            id="secondName"
            name="secondName"
            value={contactData.secondName}
            onChange={handleContactChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Прізвище *
          </label>
          <input
            type="lastName"
            id="lastName"
            name="lastName"
            value={contactData.lastName}
            onChange={handleContactChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
