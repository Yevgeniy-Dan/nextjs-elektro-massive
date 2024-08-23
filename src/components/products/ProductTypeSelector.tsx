import React from "react";

interface ProductType {
  id: string;
  attributes: {
    title: string;
    slug: string;
  };
}

interface ProductTypeSelectorProps {
  types: ProductType[];
  selectedType: string | null;
  onTypeChange: (type: string) => void;
}

const ProductTypeSelector: React.FC<ProductTypeSelectorProps> = ({
  types,
  selectedType,
  onTypeChange,
}) => {
  return (
    <div className="product-type-selector">
      {types.map((type) => (
        <button
          key={type.id}
          className={`type-button ${
            selectedType === type.attributes.slug ? "selected" : ""
          }`}
          onClick={() => onTypeChange(type.attributes.slug)}
        >
          {type.attributes.title}
        </button>
      ))}
    </div>
  );
};

export default ProductTypeSelector;
