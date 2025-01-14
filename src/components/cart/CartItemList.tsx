import React from "react";
import CartItemComponent from "./CartItem";
import CenteredSpinner from "../shared/CenteredSpinner";
import { useTranslation } from "@/app/i18n/client";
import { CartItemType } from "@/types/types";

interface CartItemListProps {
  items: CartItemType[];
  isLoading: boolean;
  lng: string;
}

const CartItemList: React.FC<CartItemListProps> = ({
  items,
  isLoading,
  lng,
}) => {
  const { t } = useTranslation(lng, "cart");
  return (
    <div className="overflow-y-auto flex-grow">
      <div className="p-4">
        {isLoading ? (
          <div>
            <CenteredSpinner />
          </div>
        ) : items.length === 0 ? (
          <div className="p-4 text-center text-xl">{t("cartIsEmpty")}</div>
        ) : (
          items.map((item) => <CartItemComponent key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
};

export default CartItemList;
