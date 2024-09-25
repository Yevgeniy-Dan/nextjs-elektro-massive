import React from "react";
import QuantityAdjuster from "./QuantityAdjuster";
import { ICartItem } from "@/types/cart";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";

interface CartItemProps {
  item: ICartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { handleRemoveItem, handleQuantityChange } = useCart();

  return (
    <div key={item.id} className="flex items-center mb-4 border-b pb-2">
      <button
        onClick={() => handleRemoveItem(item.id)}
        className="text-red-800 hover:text-red-700 mr-2 flex-shrink-0"
      >
        <Trash2 size={20} />
      </button>

      <div className="flex-shrink-0 mr-4">
        <Image
          src={item.product.image_link}
          alt={item.product.title}
          width={100}
          height={100}
          className="object-cover"
        />
      </div>

      <div className="flex flex-col flex-grow">
        <p className="font-semibold mb-2">{item.product.title}</p>

        <div className="flex items-center justify-around">
          <div className="flex-1">
            <span>{item.product.retail.toFixed(2)} грн</span>
          </div>

          <QuantityAdjuster
            quantity={item.quantity}
            onQuantityChange={(newQuantity) =>
              handleQuantityChange(item.id, newQuantity)
            }
          />

          <div>
            {item.product.discount && item.product.discount > 0 ? (
              <>
                <p className="line-through decoration-red-800 mr-2 my-0">
                  {(item.product.retail * item.quantity).toFixed(2)} грн
                </p>
                <p className="font-bold text-red-800 my-0">
                  {(
                    (item.product.retail -
                      (item.product.retail * item.product.discount) / 100) *
                    item.quantity
                  ).toFixed(2)}{" "}
                  грн
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
export default CartItem;
