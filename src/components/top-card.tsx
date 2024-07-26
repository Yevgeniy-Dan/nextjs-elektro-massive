import Image from "next/image";
import React from "react";

const TopCard = () => {
  return (
    <div className=" bg-white   rounded-lg  overflow-hidden shadow-light hover:shadow-xl transition-shadow duration-300 w-52 h-auto my-2">
      <div className="relative">
        <div className="absolute top-2 right-2 flex">
          <svg
            className="w-5 h-5 text-white mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            className="w-5 h-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
        </div>
        <img
          src="https://plus.unsplash.com/premium_photo-1677234147181-2510b2c1ea75?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Product Image"
          className="w-full"
        />
        <div className="absolute top-0 left-0 bg-orange-500 text-white px-2 py-1 rounded-br-lg">
          TOP
        </div>
      </div>
      <div className="pt-4">
        <h2 className="text-base font-normal mb-1 px-3">
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
