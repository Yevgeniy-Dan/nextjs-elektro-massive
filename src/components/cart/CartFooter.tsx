import { ArrowLeft } from "lucide-react";
import React from "react";
import CartTotals from "./CartTotals";
import { useCart } from "@/hooks/useCart";

const CartFooter = () => {
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
            Продовжити покупку
          </button>
        </div>

        <div>
          <CartTotals />
          <button
            onClick={() => handleConfirm()}
            disabled={!cartItems.length}
            className="bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600 transition duration-300"
          >
            Оформити замовлення
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartFooter;
