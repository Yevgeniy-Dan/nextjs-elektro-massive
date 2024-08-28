import { ProductType } from "@/types/types";
import Image from "next/image";
import React from "react";

interface ProductTypeSelectorProps {
  types: ProductType[];
  selectedTypeId: string | null;
  onTypeChange: (type: string) => void;
}

const ProductTypeSelector: React.FC<ProductTypeSelectorProps> = ({
  types,
  selectedTypeId,
  onTypeChange,
}) => {
  return (
    <div className="flex justify-start items-end gap-6 mb-6 overflow-x-auto">
      {types.map((type, index) => (
        <React.Fragment key={type.id}>
          {index > 0 && <div className="h-32 w-px bg-gray-300"></div>}
          <button
            key={type.id}
            className={`flex flex-col items-center min-w-[80px] ${
              selectedTypeId === type.id
                ? "opacity-100"
                : "opacity-70 hover:opacity-100"
            }`}
            onClick={() => onTypeChange(type.id)}
          >
            <div className="w-32 h-32 mb-2 relative">
              {type.attributes.icon?.data?.attributes && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${type.attributes.icon.data.attributes.url}`}
                  alt={type.attributes.title}
                  fill
                  className="object-contain"
                />
              )}
            </div>
            <span className="text-md text-center">{type.attributes.title}</span>
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProductTypeSelector;
