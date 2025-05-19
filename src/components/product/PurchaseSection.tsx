import React, { useState } from "react";
import { Heart } from "lucide-react";
import { ProductAttributes } from "@/types/types";
import { useFavorites } from "@/hooks/useFavorites";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useSignInModal } from "@/store/useSignInModal";

interface PurchaseSectionProps {
  id: string;
  product: ProductAttributes;
  onBuyClick: (qty: number) => void;
  productTypeId: string;
}

const PurchaseSection: React.FC<PurchaseSectionProps> = ({
  id,
  product,
  onBuyClick,
  productTypeId,
}) => {
  const { status } = useSession();
  const pathname = usePathname();
  const { retail } = product;
  const [quantity, setQuantity] = useState(1);

  const { openSignInModal } = useSignInModal();

  const handleLogin = () => {
    openSignInModal(`${pathname}`);
  };

  const { favorites, handleAddToFavorites, handleRemoveFromFavorites } =
    useFavorites();
  const isFavorite = favorites.some((fav) => fav.product?.data?.id === id);

  const toggleFavorite = () => {
    if (status === "unauthenticated") {
      handleLogin();
    } else if (isFavorite) {
      handleRemoveFromFavorites(id);
    } else {
      handleAddToFavorites(id, productTypeId);
    }
  };

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
          <input
            type="number"
            className="w-14 text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            onBlur={(e) => {
              const value = parseInt(e.target.value);
              if (isNaN(value) || value < 1) {
                setQuantity(1);
              }
            }}
          />
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
        <button
          className="flex items-center gap-2 text-gray-600"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite();
          }}
        >
          <Heart
            size={30}
            fill={isFavorite ? "red" : "none"}
            stroke={isFavorite ? "red" : "currentColor"}
            strokeWidth={1.5}
          />{" "}
          Додати в обране
        </button>
      </div>
    </div>
  );
};

export default PurchaseSection;
