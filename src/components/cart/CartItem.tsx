import React, { useMemo } from "react";
import QuantityAdjuster from "./QuantityAdjuster";
import { Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { CartItemType } from "@/types/types";
import OptimizedImage from "../shared/OptimizedImage";
import { it } from "node:test";

interface CartItemProps {
  item: CartItemType;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const { handleRemoveItem, handleUpdateItem } = useCart();

  const discountedPrice = useMemo(() => {
    const discount = item.product.discount || 0;
    return (
      (item.product.retail - (item.product.retail * discount) / 100) *
      item.quantity
    );
  }, [item.product.retail, item.product.discount, item.quantity]);

  return (
    <div key={item.id} className="flex items-center mb-4 border-b pb-2">
      <button
        onClick={() => handleRemoveItem(item.product)}
        className="text-red-800 hover:text-red-700 mr-2 flex-shrink-0"
      >
        <Trash2 size={20} />
      </button>

      <div className="flex-shrink-0 mr-4">
        <OptimizedImage
          src={item?.product?.image_link ?? ""}
          alt={item?.product?.title ?? ""}
          width={100}
          height={100}
          className="object-cover"
        />
      </div>

      <div className="flex flex-col flex-grow">
        <p className="font-semibold mb-2">{item.product.title}</p>

        <div className="flex items-center justify-around">
          <QuantityAdjuster
            quantity={item.quantity}
            onQuantityChange={(qtyChange) => handleUpdateItem(item, qtyChange)}
          />

          <div>
            {item.product.discount && item.product.discount > 0 ? (
              <>
                <p className="line-through decoration-red-800 mr-2 my-0">
                  {(item.product.retail * item.quantity).toFixed(2)} грн
                </p>
                <p className="font-bold text-red-800 my-0">
                  {discountedPrice.toFixed(2)} грн
                </p>
              </>
            ) : (
              <p className="font-bold">
                {(item.product.retail * item.quantity).toFixed(2)} грн
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItemComponent;
