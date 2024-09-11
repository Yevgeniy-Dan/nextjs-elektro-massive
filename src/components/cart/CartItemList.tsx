import { ICartItem } from "@/types/cart";
import React from "react";
import CartItem from "./CartItem";

interface CartItemListProps {
  items: ICartItem[];
  isLoading: boolean;
}

const CartItemList: React.FC<CartItemListProps> = ({ items, isLoading }) => {
  return (
    <div className="overflow-y-auto flex-grow">
      <div className="p-4">
        {isLoading ? (
          <div>Loading cart...</div>
        ) : items.length === 0 ? (
          <div className="p-4 text-center text-xl">Кошик порожній</div>
        ) : (
          items.map((item) => <CartItem key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
};

export default CartItemList;
