import Image from "next/image";
import React from "react";
import Dropdown from "./dropdown";

const Header = () => {
  return (
    <div className="bg-gradient-elektro-massive  rounded-r-3xl pl-4 sm:pl-8 md:pl-12 lg:pl-16 pr-2 -ml-16">
      <header className="mt-2 py-2 font-medium  max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full">
          <div className="flex items-center mb-4 lg:mb-0">
            <Image
              src="/logo.png"
              alt="ElektroMassive"
              className="h-12 w-12 mr-2"
              width={48}
              height={48}
            />
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
          <div className="flex flex-col lg:flex-row items-center text-white">
            <Dropdown
              className="mb-4 lg:mb-0 lg:mr-4 bg-gray-800 px-3 py-2"
              title="Служба підтримки"
              items={[
                { name: "Account settings", href: "#" },
                { name: "Support", href: "#" },
              ]}
            />
            <div className="flex flex-col lg:flex-row items-center text-white">
              <div className="flex items-center flex-row mt-0 md:mt-4">
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
      <nav className="flex flex-col sm:flex-row justify-between items-center w-full py-4 sm:py-10 gap-4 max-w-sm md:max-w-xl mx-auto ">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 w-full">
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
                placeholder="Search..."
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
        </div>
      </nav>
    </div>
  );
};

export default Header;
