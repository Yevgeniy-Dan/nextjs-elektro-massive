import { ArrowLeft } from "lucide-react";
import React, { Suspense } from "react";
import CartTotals from "./CartTotals";
import { useCart } from "@/hooks/useCart";
import { useTranslation } from "@/app/i18n/client";

interface CartFooterProps {
  lng: string;
}

const CartFooter: React.FC<CartFooterProps> = ({ lng }) => {
  const { t } = useTranslation(lng, "cart");
  const { cartItems, handleCloseModal, handleConfirm } = useCart();

  return (
    <div className="p-4 border-t">
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <button
            onClick={() => handleCloseModal()}
            className="flex items-center bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-100"
          >
            <ArrowLeft size={24} />
            {t("continueShopping")}
          </button>
        </div>

        <div>
          <Suspense fallback={<div>Loading cart totals...</div>}>
            <CartTotals lng={lng} />
          </Suspense>
          <button
            onClick={() => handleConfirm()}
            disabled={!cartItems.length}
            className="bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600 transition duration-300"
          >
            {t("makeOrder")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartFooter;
