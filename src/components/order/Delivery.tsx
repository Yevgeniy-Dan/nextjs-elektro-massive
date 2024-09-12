import { Truck } from "lucide-react";
import Image from "next/image";
import React from "react";

const Delivery = () => {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2 flex items-center">
        <span className="w-6 h-6 rounded-full bg-gradient-elektro-massive-horizontal  text-white flex items-center justify-center mr-2">
          2
        </span>
        Доставка
      </h2>
      <div className="space-y-2">
        <label className="flex items-center space-x-3 p-3 border border-gray-300 rounded-md">
          <input
            type="radio"
            defaultChecked
            name="delivery"
            className="form-radio"
          />
          <Image
            src="/novaposhta.jpg"
            width={24}
            height={24}
            alt="Nova Poshta"
            className="w-5 h-5"
          />
          <span>Нова Пошта</span>
          <span className="ml-auto text-gray-500">60 грн</span>
        </label>
        {/* <label className="flex items-center space-x-3 p-3 border border-gray-300 rounded-md">
          <input type="radio" name="delivery" className="form-radio" />
          <Truck size={20} />
          <span>Самовивіз</span>
        </label> */}
      </div>
    </section>
  );
};

export default Delivery;
