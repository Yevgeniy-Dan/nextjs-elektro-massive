import React, { useState } from "react";
import { CreditCard } from "lucide-react";
import Cards, { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import valid from "card-validator";
import creditCardType from "credit-card-type";
import {
  Visa,
  Mastercard,
  Amex,
  Discover,
  Diners,
  Jcb,
  Unionpay,
} from "react-payment-logos/dist/flat";
import { useCardForm } from "@/hooks/useCardForm";
import { getCardTypeInfo } from "@/app/utils/cardUtils";
import NameInput from "../payment/NameInput";
import CVCInput from "../payment/CVCInput";
import ExpiryInput from "../payment/ExpiryInput";
import CardInput from "../payment/CardInput";
import { CardTypeDisplay } from "../payment/CardTypeDisplay";

const Payment = () => {
  const { state, validation, handleInputChange, handleInputFocus } =
    useCardForm();

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
          <input
            type="radio"
            defaultChecked
            name="payment"
            className="form-radio"
          />
          <CreditCard size={20} />
          <span>Оплата карткою</span>
        </label>
      </div>
      <div className="mt-4 space-y-4">
        {/* <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        /> */}
        <div className="relative">
          <CardInput
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            isValid={validation.number}
          />
          <CardTypeDisplay cardNumber={state.number} />
        </div>
        <div className="flex space-x-4">
          <ExpiryInput
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            isValid={validation.expiry}
          />
          <CVCInput
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            isValid={validation.cvc}
          />
        </div>
        <NameInput
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          isValid={validation.name}
        />
      </div>
    </section>
  );
};

export default Payment;
