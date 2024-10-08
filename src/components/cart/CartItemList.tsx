import React, { useEffect } from "react";
import CartItemComponent from "./CartItem";
import { CartItem } from "@/gql/graphql";
import CenteredSpinner from "../shared/CenteredSpinner";

interface CartItemListProps {
  items: CartItem[];
  isLoading: boolean;
}

const CartItemList: React.FC<CartItemListProps> = ({ items, isLoading }) => {
  return (
    <div className="overflow-y-auto flex-grow">
      <div className="p-4">
        {isLoading ? (
          <div>
            <CenteredSpinner />
          </div>
        ) : items.length === 0 ? (
          <div className="p-4 text-center text-xl">Кошик порожній</div>
        ) : (
          items.map((item) => <CartItemComponent key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
};

export default CartItemList;
