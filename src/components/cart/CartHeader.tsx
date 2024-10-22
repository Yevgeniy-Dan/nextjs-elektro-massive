"use client";

import { useTranslation } from "@/app/i18n/client";
import { X } from "lucide-react";
import React from "react";

interface CartHeaderProps {
  onClose: () => void;
  onClearCart: () => void;
  lng: string;
}

const CartHeader: React.FC<CartHeaderProps> = ({
  onClose,
  onClearCart,
  lng,
}) => {
  const { t } = useTranslation(lng, "cart");
  return (
    <div className="p-4 border-b">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{t("cartTitle")}</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onClearCart()}
            className="text-red-800 hover:text-red-700"
          >
            {t("removeAll")}
          </button>
          <button
            onClick={() => onClose()}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="text-2xl">
              <X size={24} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;
