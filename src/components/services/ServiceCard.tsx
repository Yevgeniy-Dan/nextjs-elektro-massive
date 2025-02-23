import React from "react";
import OptimizedImage from "../shared/OptimizedImage";

interface IServiceCard {
  title: string;
  description: string;
  imageUrl: string;
  cartFooterText: string;
}

const ServiceCard: React.FC<IServiceCard> = ({
  title,
  description,
  imageUrl,
  cartFooterText,
}) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative w-full h-48">
        <OptimizedImage
          src={imageUrl || "/images/placeholder.jpg"}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4 flex-grow">{description}</p>
        <div className="mt-auto">
          <span className="text-gray-700 block">{cartFooterText}</span>
        </div>
      </div>
      <div className="flex items-center justify-between py-3 bg-gradient-elektro-massive-horizontal px-6">
        <div>
          <p className="text-white mr-2">+380 (97) 63 23 159</p>
        </div>
        <div className="flex flex-row">
          <a href="#" className="text-blue-500 mr-2">
            <OptimizedImage
              className="w-6 h-6"
              src="/viber.png"
              alt="Viber icon"
              width={24}
              height={24}
            />
          </a>
          <a href="#" className="text-blue-500">
            <OptimizedImage
              className="w-6 h-6"
              src="/telegram.png"
              alt="Telegram icon"
              width={24}
              height={24}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
