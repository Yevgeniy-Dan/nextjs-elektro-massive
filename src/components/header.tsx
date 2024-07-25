import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-[#960806] to-[#343333]">
      <header className=" py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="ElektroMassive"
              className="h-12 w-12 mr-2"
              width={64}
              height={64}
            />
            <span className="text-white font-bold">ELEKTROMASSIVE</span>
          </div>
          <div className="flex items-center text-white">
            <a href="#" className="mr-4  border border-white px-2 py-2">
              Послуги
            </a>
            <a href="#" className="mr-4  border border-white px-2 py-2">
              Про нас
            </a>
            <a href="#" className="mr-4  border border-white px-2 py-2">
              Співпраця
            </a>
            <a href="#" className="mr-4  border border-white px-2 py-2">
              Оплата та доставка
            </a>
            <a href="#" className="mr-4  bg-gray-800 px-3 py-2">
              Служба підтримки
            </a>
            <div className="flex items-center">
              <a href="#" className="mr-2 hover:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17"
                  />
                </svg>
              </a>
              <span className="text-white">0.00 грн</span>
            </div>
            <a href="#" className="ml-4 hover:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </a>
            <a href="#" className="ml-4 hover:text-gray-300 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                1
              </span>
            </a>
            <a href="#" className="ml-4 hover:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </a>
          </div>
        </div>
      </header>
      <nav className="py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center text-white border border-white px-4 py-2">
            <span className="text-white font-bold">Каталог товарів</span>
            <button className="ml-4 hover:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              className="bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none"
            />
            <button className="bg-gray-700 text-white px-4 py-2 rounded-r-md hover:bg-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
