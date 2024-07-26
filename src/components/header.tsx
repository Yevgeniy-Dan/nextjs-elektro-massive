import Image from "next/image";
import React from "react";
import Dropdown from "./dropdown";

const Header = () => {
  return (
    <div className="bg-gradient-elektro-massive mr-10 rounded-r-3xl">
      <header className="mt-2  py-2 font-medium">
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
          </div>
          <div className="flex items-center text-white">
            <Dropdown
              className="mr-4 bg-gray-800 px-3 py-2"
              title="Служба підтримки"
              items={[
                {
                  name: "Account settings",
                  href: "#",
                },
                {
                  name: "Support",
                  href: "#",
                },
              ]}
            />
            <div className="flex items-center">
              <a href="#" className="mr-2 hover:text-gray-300">
                <Image
                  src="/bucket.png"
                  alt="Bucket icon"
                  className="h-6 w-6 invert"
                  width={32}
                  height={32}
                />
              </a>
              <span className="text-white">0.00 грн</span>
            </div>
            <a href="#" className="ml-4 hover:text-gray-300">
              <Image
                src="/call.png"
                alt="Phone icon"
                className="h-6 w-6 invert"
                width={32}
                height={32}
              />
            </a>
            <a href="#" className="ml-4 hover:text-gray-300 relative">
              <Image
                src="/bell.png"
                alt="Notification icon"
                className="h-6 w-6 invert"
                width={32}
                height={32}
              />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                1
              </span>
            </a>
            <a href="#" className="ml-4 hover:text-gray-300">
              <Image
                src="/avatar.png"
                alt="Avatar icon"
                className="h-6 w-6 invert"
                width={32}
                height={32}
              />
            </a>
          </div>
        </div>
      </header>
      <nav className="py-10">
        <div className="container px-16 mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center text-white border border-white px-4 py-2 rounded-xl">
            <span className="text-white font-black px-5">Каталог товарів</span>
            <button className="ml-4 hover:text-gray-300">
              <Image
                src="/menu-hamburger.png"
                alt="Menu icon"
                className="h-6 w-6 invert"
                width={32}
                height={32}
              />
            </button>
          </div>
          <div className="flex-grow ml-4">
            <div className="flex items-center relative">
              <input
                type="text"
                className="bg-transparent border border-white text-white px-4 py-2 rounded-full focus:outline-none pr-14 w-full"
              />
              <button className="absolute inset-y-0 right-0 flex items-center  pointer-events-none ml-4">
                <div className="bg-gray-500 p-2 pl-5 rounded-r-full rounded-l-2xl ">
                  <Image
                    src="/search.png"
                    alt="Search icon"
                    className="h-6 w-6 "
                    width={32}
                    height={32}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
