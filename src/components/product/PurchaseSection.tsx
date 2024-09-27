import React, { useEffect, useState } from "react";
import { Heart, BarChart2, ShoppingCart } from "lucide-react";
import { ProductAttributes } from "@/types/types";

interface PurchaseSectionProps {
  product: ProductAttributes;
  onBuyClick: (qty: number) => void;
}

const PurchaseSection: React.FC<PurchaseSectionProps> = ({
  product,
  onBuyClick,
}) => {
  const { currency, retail, title, image_link, subcategory } = product;
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="w-full lg:w-1/3 flex flex-col mt-3">
      <div className="flex flex-col items-center gap-4 justify-between mb-4">
        <span className="text-3xl font-bold">{retail} грн</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1 border rounded"
          >
            -
          </button>
          <span className="w-8 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1 border rounded"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => onBuyClick(quantity)}
        className="w-full bg-gradient-elektro-massive-horizontal text-white py-2 rounded-xl mb-4"
      >
        Купити
      </button>
      <div className="flex flex-col items-start gap-4 justify-between mb-4">
        <button className="flex items-center gap-2 text-gray-600">
          <Heart size={30} /> Додати в обране
        </button>
        <button className="flex items-center gap-2 text-gray-600">
          <BarChart2 size={30} />
          Додати в порівняння
        </button>
      </div>
    </div>
  );
};

export default PurchaseSection;
