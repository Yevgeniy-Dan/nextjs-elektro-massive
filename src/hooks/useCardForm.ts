import {
  formatCardholderName,
  formatCardNumber,
  formatCVC,
  formatExpiry,
} from "@/app/utils/cardFormatters";
import { ICardState, ICardValidation } from "@/types/card";
import valid from "card-validator";
import { useState } from "react";
import { Focused } from "react-credit-cards-2";

export const useCardForm = () => {
  const [state, setState] = useState<ICardState>({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const [validation, setValidation] = useState<ICardValidation>({
    number: true,
    expiry: true,
    cvc: true,
    name: true,
  });

  const [cardType, setCardType] = useState("");

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    let formattedValue = value;
    let isValid = true;

    if (name === "number") {
      formattedValue = formatCardNumber(value);
      const numberValidation = valid.number(formattedValue);
      isValid = numberValidation.isValid || numberValidation.isPotentiallyValid;
    } else if (name === "expiry") {
      formattedValue = formatExpiry(value);
      const expiryValidation = valid.expirationDate(formattedValue);
      isValid = expiryValidation.isValid || expiryValidation.isPotentiallyValid;
    } else if (name === "cvc") {
      formattedValue = formatCVC(value);
      const cvcValidation = valid.cvv(formattedValue);
      isValid = cvcValidation.isValid || cvcValidation.isPotentiallyValid;
    } else if (name === "name") {
      formattedValue = formatCardholderName(value);
      isValid = formattedValue.trim().length > 0;
    }

    setState((prev) => ({ ...prev, [name]: formattedValue }));
    setValidation((prev) => ({ ...prev, [name]: isValid }));

    // Additional validation for card type
    if (name === "number") {
      const cardTypeInfo = valid.number(formattedValue).card;
      const detectedCardType = cardTypeInfo?.type || "";
      setCardType(detectedCardType);

      // Update CVC validation based on card type
      if (cardTypeInfo) {
        const cvcLength = cardTypeInfo.code.size;
        const cvcValidation = valid.cvv(state.cvc, cvcLength);
        setValidation((prev) => ({
          ...prev,
          cvc: cvcValidation.isValid || cvcValidation.isPotentiallyValid,
        }));
      }
    }
  };

  const handleInputFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, focus: evt.target.name as Focused }));
  };

  return { state, validation, cardType, handleInputChange, handleInputFocus };
};
