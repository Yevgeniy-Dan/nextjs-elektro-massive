// import React from "react";
// import { CreditCard } from "lucide-react";
// import Cards from "react-credit-cards-2";
// import "react-credit-cards-2/dist/es/styles-compiled.css";

// import { CardTypeDisplay } from "../payment/CardTypeDisplay";
// import { Focused } from "react-credit-cards-2";
// import { OrderFormData } from "@/hooks/useOrderForm";
// import { useExtendedFormContext } from "@/hooks/extendedFormContext";

// const Payment: React.FC = () => {
//   const {
//     register,
//     watch,
//     formState: { errors, touchedFields },
//     handleCardInput,
//     handleCardFocus,
//   } = useExtendedFormContext<OrderFormData>();

//   const cardData = watch("cardData");

//   const showError = (fieldName: keyof OrderFormData["cardData"]) =>
//     touchedFields.cardData?.[fieldName] && errors.cardData?.[fieldName];

//   return (
//     <section>
//       <h2 className="text-lg font-semibold mb-2 flex items-center">
//         <span className="w-6 h-6 rounded-full bg-gradient-elektro-massive-horizontal text-white flex items-center justify-center mr-2">
//           3
//         </span>
//         Оплата
//       </h2>
//       <div className="space-y-2">
//         <label className="flex items-center space-x-3 p-3 border border-gray-300 rounded-md">
//           <input
//             type="radio"
//             defaultChecked
//             name="payment"
//             className="form-radio"
//           />
//           <CreditCard size={20} />
//           <span>Оплата карткою</span>
//         </label>
//       </div>
//       <div className="mt-4 space-y-4">
//         {/* Uncomment if you want to show the card visualization */}
//         {/* <Cards
//           number={cardData.number}
//           expiry={cardData.expiry}
//           cvc={cardData.cvc}
//           name={cardData.name}
//           focused={cardData.focus as Focused}
//         /> */}
//         <div>
//           <div className="relative">
//             <input
//               {...register("cardData.number")}
//               placeholder="Номер картки"
//               onChange={handleCardInput}
//               onFocus={handleCardFocus}
//               className="w-full border rounded-md shadow-sm py-2 px-3 border-gray-300"
//             />
//             <CardTypeDisplay cardNumber={cardData.number} />
//           </div>
//           {showError("number") && (
//             <p className="mt-1 text-sm text-red-800">
//               {errors.cardData?.number?.message}
//             </p>
//           )}
//         </div>
//         <div className="flex space-x-4">
//           <div className="w-full">
//             <input
//               {...register("cardData.expiry")}
//               placeholder="MM/YY"
//               onChange={handleCardInput}
//               onFocus={handleCardFocus}
//               className="w-full border rounded-md shadow-sm py-2 px-3 border-gray-300"
//             />
//             {showError("expiry") && (
//               <p className="mt-1 text-sm text-red-800">
//                 {errors.cardData?.expiry?.message}
//               </p>
//             )}
//           </div>
//           <div className="w-full">
//             <input
//               {...register("cardData.cvc")}
//               placeholder="CVC"
//               onChange={handleCardInput}
//               onFocus={handleCardFocus}
//               className="w-full border rounded-md shadow-sm py-2 px-3 border-gray-300"
//             />
//             {showError("cvc") && (
//               <p className="mt-1 text-sm text-red-800">
//                 {errors.cardData?.cvc?.message}
//               </p>
//             )}
//           </div>
//         </div>
//         <div>
//           <input
//             {...register("cardData.name")}
//             placeholder="Ім'я власника картки"
//             onChange={handleCardInput}
//             onFocus={handleCardFocus}
//             className="w-full border rounded-md shadow-sm py-2 px-3 border-gray-300"
//           />
//           {showError("name") && (
//             <p className="mt-1 text-sm text-red-800">
//               {errors.cardData?.name?.message}
//             </p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Payment;

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
