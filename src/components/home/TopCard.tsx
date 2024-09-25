import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface ITopCardProps {
  id: string;
  subcategoryId: string;
  title: string;
  retail: string;
  imageSrc: string;
  currency: string;
  label?: "top" | "new" | "sale";
}

const TopCard: React.FC<ITopCardProps> = ({
  label,
  id,
  subcategoryId,
  title,
  retail,
  currency,
  imageSrc,
}) => {
  return (
    <div className="rounded-xl shadow-light hover:shadow-hover_card transition-shadow duration-300 flex flex-col h-full overflow-hidden">
      <div className="relative pt-[100%]">
        <Image
          src={`${imageSrc}`}
          alt="Product Image"
          className="absolute top-0 left-0 w-full h-full"
          layout="fill"
          objectFit="cover"
        />
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
        {label === "top" && (
          <div className="absolute top-0 left-0 bg-orange-500 text-white px-2 py-1 rounded-br-lg">
            TOP
          </div>
        )}

        {(label === "new" || label === "sale") && (
          <div className="absolute  -top-4 left-0 w-1/3 h-1/3 z-50">
            <Image
              src={label === "new" ? "/new-product-label.png" : "/sale.png"}
              alt={label === "new" ? "new product label" : "sale product label"}
              fill
              className="object-contain"
            />
          </div>
        )}
      </div>
      <div className="flex-grow  p-3">
        <h2 className="text-sm font-normal line-clamp-2">{title}</h2>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex-grow py-2 px-4 font-medium text-sm bg-white z-10 overflow-hidden rounded-r-2xl">
          <span className="whitespace-nowrap">{retail}</span>
          <span className="ml-1 whitespace-nowrap">{currency}</span>
        </div>
        <Link
          href={`${subcategoryId}/${id}`}
          className="bg-gradient-elektro-massive-horizontal py-2 px-4 text-white text-sm text-center w-2/3 -ml-6"
        >
          Купити
        </Link>
      </div>
    </div>
  );
};

export default TopCard;
