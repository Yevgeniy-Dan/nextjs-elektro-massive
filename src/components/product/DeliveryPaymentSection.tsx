import React from "react";
import Image from "next/image";

const DeliveryPaymentSection: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="p-3">
        <h3 className="font-bold flex items-center gap-2 mb-2">
          Способи доставки:
        </h3>
        <ul className="text-sm">
          <li className="flex items-start gap-2">
            <Image
              src="/novaposhta.jpg"
              width={24}
              height={24}
              alt="Nova Poshta"
              className="w-5 h-5"
            />
            <div>
              <span>Нова Пошта</span>
              <span className="block">Безкоштовна доставка від 3000 грн</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="p-3">
        <h3 className="font-bold flex items-center gap-2 mb-2">
          Способи плати:
        </h3>
        <ul className="text-sm flex flex-col gap-2">
          <li className="flex items-center gap-2">
            <Image
              src="/mastercard.png"
              width={48}
              height={48}
              alt="Visa"
              className="w-8 h-5"
            />
            <div>
              <span>Оплата онлайн - Visa/MasterCard, Google Pay/Apple Pay</span>
            </div>
          </li>
          <li className="flex items-center gap-2">
            <Image
              src="/product-page/transfer-to-account.jpg"
              width={48}
              height={48}
              alt="Transfer to Account"
              className="w-8 h-8"
            />
            <div>
              <span>Переказ на рахунок</span>
            </div>
          </li>
          <li className="flex items-center gap-2">
            <Image
              src="/product-page/cash-on-delivery.png"
              width={48}
              height={48}
              alt="Cash on Delivery"
              className="w-8 h-8"
            />
            <div>
              <span>Наложений платіж</span>
              <span className="block">Оплата при отриманні у відділенні</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DeliveryPaymentSection;