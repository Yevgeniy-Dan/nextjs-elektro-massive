import Image from "next/image";
import React from "react";
import Dropdown from "./dropdown";

const Header = () => {
  return (
    <div className="bg-gradient-elektro-massive  rounded-r-3xl pl-4 sm:pl-8 md:pl-12 lg:pl-16 pr-2 -ml-6 sm:-ml-16">
      <header className="mt-2 py-2 font-medium  max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full">
          <div className="flex items-center  mb-4 lg:mb-0">
            <div className="relative w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24">
              <Image
                src="/logo.png"
                alt="ElektroMassive"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative w-32 h-10 sm:w-40 sm:h-12 md:w-48 md:h-14 lg:w-56 lg:h-16 mt-2 sm:mt-0 sm:ml-2 -mb-2">
              <Image
                src="/logo-label.png"
                alt="ElektroMassive Label"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center text-white text-sm gap-2 sm:gap-4 mb-4 lg:mb-0">
            {["Послуги", "Про нас", "Співпраця", "Оплата та доставка"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="border border-white px-2 py-2"
                >
                  {item}
                </a>
              )
            )}
          </div>
          <div className="flex flex-col xl:flex-row  items-center text-white">
            <Dropdown
              className="mb-4  lg:mb-0 lg:mr-4 bg-gray-800 px-3 py-2"
              title="Служба підтримки"
              items={[
                { name: "Account settings", href: "#" },
                { name: "Support", href: "#" },
              ]}
            />
            <div className="flex flex-col lg:flex-row mt-4 xl:mt-0 items-center text-white">
              <div className="flex items-center  flex-row mt-4 md:mt-0">
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
          </div>
        </div>
      </header>
      <nav className="flex flex-col sm:flex-row justify-between items-center w-full py-4 sm:py-10 gap-4 max-w-2xl sm:max-w-xl md:max-w-4xl  mx-auto ">
        <div className="flex items-center text-white border border-white py-2 rounded-l-2xl bg-gray-800 w-full sm:w-auto">
          <span className="text-white font-black px-4 sm:px-5 whitespace-nowrap">
            Каталог товарів
          </span>
          <button className="ml-auto px-3 hover:text-gray-300">
            <Image
              src="/menu-hamburger.png"
              alt="Menu icon"
              className="h-6 w-6 invert"
              width={32}
              height={32}
            />
          </button>
        </div>
        <div className="flex-grow w-full sm:w-auto">
          <div className="flex items-center relative">
            <input
              type="text"
              className="bg-transparent border border-white text-white px-4 py-2 rounded-r-2xl focus:outline-none pr-14 w-full"
              placeholder="Пошук..."
            />
            <button className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
              <div className="bg-transparent p-2 pr-4 rounded-r-full rounded-l-2xl">
                <Image
                  src="/search.png"
                  alt="Search icon"
                  className="h-6 w-6 invert"
                  width={32}
                  height={32}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
