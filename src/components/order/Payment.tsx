import { CreditCard } from "lucide-react";
import React from "react";

const Payment = () => {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2 flex items-center">
        <span className="w-6 h-6 rounded-full bg-gradient-elektro-massive-horizontal  text-white flex items-center justify-center mr-2">
          3
        </span>
        Оплата
      </h2>
      <div className="space-y-2">
        <label className="flex items-center space-x-3 p-3 border border-gray-300 rounded-md">
          <input type="radio" name="payment" className="form-radio" />
          <CreditCard size={20} />
          <span>Оплата карткою</span>
        </label>
      </div>
      <div className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Номер карти"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
        />
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="ММ / РР"
            className="w-1/2 border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
          <input
            type="text"
            placeholder="CVV"
            className="w-1/2 border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>
      </div>
    </section>
  );
};

export default Payment;
