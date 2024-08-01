import Image from "next/image";
import React from "react";

interface IServiceCard {
  title: string;
  description: string;
}

const ServiceCard: React.FC<IServiceCard> = ({ title, description }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col flex-grow">
          <Image
            src="https://via.placeholder.com/500x300"
            alt={`${title}`}
            className="w-full"
            width={500}
            height={300}
          />
          <div className="py-5 px-6">
            <h2 className="text-xl font-bold mb-2 line-clamp-2 flex-grow h-16">
              {title}
            </h2>
            <p className="text-gray-700 mb-4 line-clamp-5 flex-grow">
              {description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">
                Локація: Вся Одеська область.
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between py-3 bg-gradient-elektro-massive px-6">
            <div>
              <p className="text-white mr-2">+380 (97) 63 23 159</p>
            </div>
            <div className="flex flex-row">
              <a href="#" className="text-blue-500 mr-2">
                <Image
                  className="w-6 h-6"
                  src="/viber.png"
                  alt="Viber icon"
                  width={32}
                  height={32}
                />
              </a>
              <a href="#" className="text-blue-500">
                <Image
                  className="w-6 h-6"
                  src="/telegram.png"
                  alt="Telegram icon"
                  width={32}
                  height={32}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
