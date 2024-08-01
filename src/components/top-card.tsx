import Image from "next/image";
import React from "react";

const TopCard = () => {
  return (
    <div className=" bg-white   rounded-lg  overflow-hidden shadow-light hover:shadow-hover_card transition-shadow duration-300 w-52 h-auto my-2">
      <div className="relative">
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
          src="https://plus.unsplash.com/premium_photo-1677234147181-2510b2c1ea75?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Product Image"
          className="w-full h-56 object-cover"
          width={1000}
          height={224}
        />
        <div className="absolute top-0 left-0 bg-orange-500 text-white px-2 py-1 rounded-br-lg">
          TOP
        </div>
      </div>
      <div className="pt-4">
        <h2 className="text-sm font-normal mb-1 px-3 py-3">
          LED лампа VIDEX Filament Globe G27 1800K
        </h2>
        <div className="flex bg-transparent text-black ">
          <div className="flex-grow py-2 px-4 font-medium text-sm bg-white z-10 overflow-hidden rounded-r-2xl">
            1445 грн
          </div>
          <div className="bg-gradient-elektro-massive py-2 px-4 text-white text-sm text-center w-2/3 -ml-6">
            Купити
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCard;
