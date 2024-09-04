"use client";

import { motion, AnimatePresence } from "framer-motion";
import useOutsideClick from "@/hooks/useOutsideClick";
import { ArrowLeft, Trash2, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useCartCalculations } from "@/hooks/useCartCalcutaions";

interface ICartItem {
  id: string;
  title: string;
  retail: number;
  quantity: number;
  discount: number;
  image: string;
}

interface IShoppingCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: ICartItem[];
  total: number;
  discount: number;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onContinueShopping: () => void;
}

const ShoppingCartModal: React.FC<IShoppingCartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  total,
  discount,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onContinueShopping,
}) => {
  const modalRef = useOutsideClick(onClose);

  const { discountTotal } = useCartCalculations();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-md max-w-xl w-full mx-auto flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">ВАШ КОШИК</h2>
                <div className="flex items-center gap-4">
                  <button
                    onClick={onClearCart}
                    className="text-red-800 hover:text-red-700"
                  >
                    Видалити всі
                  </button>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <span className="text-2xl">
                      <X size={24} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* Scrollable items container */}
            <div className="overflow-y-auto flex-grow">
              <div className="p-4">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center mb-4 border-b pb-2"
                  >
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-800 hover:text-red-700 mr-2 flex-shrink-0"
                    >
                      <Trash2 size={20} />
                    </button>

                    <div className="flex-shrink-0 mr-4">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={100}
                        height={100}
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col flex-grow">
                      <p className="font-semibold mb-2">{item.title}</p>

                      <div className="flex items-center justify-around">
                        <div className="flex-1">
                          <span>{item.retail.toFixed(2)} грн</span>
                        </div>

                        <div className="flex items-center justify-center flex-1">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-3 py-1 border rounded"
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-3 py-1 border rounded"
                          >
                            +
                          </button>
                        </div>

                        <div>
                          {item.discount > 0 ? (
                            <>
                              <p className="line-through decoration-red-800 mr-2 my-0">
                                {(item.retail * item.quantity).toFixed(2)} грн
                              </p>
                              <p className="font-bold text-red-800 my-0">
                                {(
                                  (item.retail -
                                    (item.retail * item.discount) / 100) *
                                  item.quantity
                                ).toFixed(2)}{" "}
                                грн
                              </p>
                            </>
                          ) : (
                            <p className="font-bold">
                              {(item.retail * item.quantity).toFixed(2)} грн
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <button
                    onClick={onContinueShopping}
                    className="flex items-center bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-100"
                  >
                    <ArrowLeft size={24} />
                    Продовжити покупку
                  </button>
                </div>

                <div>
                  <p className="flex justify-between">
                    <span>Знижка:</span>{" "}
                    <span className="font-bold text-md">
                      {discountTotal.toFixed(2)} грн
                    </span>
                  </p>
                  <div className="flex justify-between items-start text-lg mt-1 mb-4">
                    <p>Разом:</p>
                    <div className="flex flex-col text-right">
                      <span className="text-gray-400 text-sm line-through">
                        {total.toFixed(2)} грн
                      </span>
                      <span className="font-bold">
                        {(total - discountTotal).toFixed(2)} грн
                      </span>
                    </div>
                  </div>
                  <button className="bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600 transition duration-300">
                    Оформити замовлення
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCartModal;
