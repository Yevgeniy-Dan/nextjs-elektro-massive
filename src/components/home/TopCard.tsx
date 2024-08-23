import Image from "next/image";
import React from "react";

interface TopCardProps {
  productLabelPath?: string;
  title: string;
  retail: number;
  // imageSrc: string;
  currency: string;
}

const TopCard: React.FC<TopCardProps> = ({
  productLabelPath,
  title,
  retail,
  currency,
  // imageSrc,
}) => {
  return (
    <div className="rounded-xl shadow-light hover:shadow-hover_card transition-shadow duration-300 w-52 h-auto my-2 mt-5">
      <div className="relative rounded-t-xl overflow-hidden">
        <div className="absolute top-2 right-2 flex">
          <svg
            className="w-5 h-5 text-white mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          <Image
            src="/bucket.png"
            alt="Bucket icon"
            className="h-6 w-6 invert"
            width={32}
            height={32}
          />
        </div>
        <Image
          src={"/imageSrc"}
          alt="Product Image"
          className="w-full h-56 object-cover"
          width={1000}
          height={224}
        />
        {productLabelPath ? (
          <div className="absolute  -top-4 left-0 w-1/3 h-1/3 z-50">
            <Image
              src={productLabelPath}
              alt={productLabelPath}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="absolute top-0 left-0 bg-orange-500 text-white px-2 py-1 rounded-br-lg">
            TOP
          </div>
        )}
      </div>
      <div className="pt-4 rounded-b-xl overflow-hidden">
        <h2 className="text-sm font-normal mb-1 px-3 py-3">{title}</h2>
        <div className="flex bg-transparent text-black ">
          <div className="flex-grow py-2 px-4 font-medium text-sm bg-white z-10 overflow-hidden rounded-r-2xl">
            {retail} {currency}
          </div>
          <div className="bg-gradient-elektro-massive-horizontal py-2 px-4 text-white text-sm text-center w-2/3 -ml-6">
            Купити
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCard;
