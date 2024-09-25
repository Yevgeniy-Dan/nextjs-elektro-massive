import React from "react";
import { getCardTypeInfo } from "@/app/utils/cardUtils";

interface CardTypeDisplayProps {
  cardNumber: string;
}

export const CardTypeDisplay: React.FC<CardTypeDisplayProps> = ({
  cardNumber,
}) => {
  const cardTypeInfo = getCardTypeInfo(cardNumber);

  return (
    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
      {cardTypeInfo.Logo && (
        <>
          <cardTypeInfo.Logo width={40} height={30} className="mr-2" />
          <span className="text-sm text-gray-500">{cardTypeInfo.niceType}</span>
        </>
      )}
    </span>
  );
};
