import { Enum_Order_Paymentmethod } from "@/gql/graphql";
import { useExtendedFormContext } from "@/hooks/extendedFormContext";
import { OrderFormData } from "@/hooks/useOrderForm";
import { Check, CreditCard, Truck } from "lucide-react";
import React from "react";

const Payment: React.FC = () => {
  const { register } = useExtendedFormContext<OrderFormData>();

  return (
    <section>
      <h2 className="text-lg font-semibold mb-2 flex items-center">
        <span className="w-6 h-6 rounded-full bg-green-500/80 text-white flex items-center justify-center mr-2">
          <Check size={16} />
        </span>
        Оплата
      </h2>
      <div className="space-y-2">
        <label className="flex items-center space-x-3  rounded-md">
          <input
            type="radio"
            value={Enum_Order_Paymentmethod.Card}
            {...register("paymentMethod")}
            className="form-radio"
          />
          <CreditCard className="w-5 h-5 text-gray-600" />
          <span>Оплата карткою</span>
        </label>

        <label className="flex items-center space-x-3  rounded-md">
          <input
            type="radio"
            value={Enum_Order_Paymentmethod.Cash}
            {...register("paymentMethod")}
            className="form-radio"
          />
          <Truck className="w-5 h-5 text-gray-600" />
          <span>Оплата при отриманні</span>
        </label>
      </div>
    </section>
  );
};

export default Payment;
