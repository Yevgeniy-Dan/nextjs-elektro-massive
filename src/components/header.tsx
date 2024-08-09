"use client";

import Image from "next/image";
import React, { useState } from "react";
import Dropdown from "./dropdown";
import { menuItems } from "@/data/menuItems";
import { FaChevronDown } from "react-icons/fa6";
import Link from "next/link";
import useOutsideClick from "@/hooks/useOutsideClick";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

  const dropdownRef = useOutsideClick(() => setIsMenuOpen(false));

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div className="bg-gradient-elektro-massive  rounded-r-3xl  pl-4 sm:pl-8 md:pl-12 lg:pl-16 pr-2 -ml-6 md:-ml-16">
      <header className="mt-2  font-medium  ">
        <div className="flex flex-row md:flex-col lg:flex-row justify-between items-center w-full">
          <div className="flex items-center w-1/2 sm:2/3 md:w-auto  ">
            <div className="relative w-48 h-16 md:w-64 md:h-24 ">
              <Image
                src="/logo-label.png"
                alt="ElektroMassive Label"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="hidden md:flex flex-wrap justify-center items-center text-white text-sm gap-2 sm:gap-4 mb-4 lg:mb-0">
            <a href="#" className="border border-white px-2 py-2">
              Послуги
            </a>
            <a href="#" className="border border-white px-2 py-2">
              Про нас
            </a>
            <a href="#" className="border border-white px-2 py-2">
              Співпраця
            </a>
            <a href="#" className="border border-white px-2 py-2">
              Оплата та доставка
            </a>
          </div>
          <div className="flex flex-col xl:flex-row  items-center text-white">
            <div className="hidden md:block">
              <Dropdown
                className=" my-4  xl:my-0 lg:mr-4 bg-gray-800 px-3 py-2"
                title="Служба підтримки"
                items={[
                  { name: "Account settings", href: "#" },
                  { name: "Support", href: "#" },
                ]}
              />
            </div>
            <div className="flex flex-col lg:flex-row  items-center text-white">
              <div className="flex items-center gap-1 md:gap-3  flex-row md:mb-3 xl:mb-0">
                <div className="flex items-center">
                  <a href="#" className="mr-1 hover:text-gray-300">
                    <Image
                      src="/bucket.png"
                      alt="Bucket icon"
                      className="h-8 w-8 md:h-10 md:w-10 invert"
                      width={32}
                      height={32}
                    />
                  </a>
                  <span className="text-xs sm:text-sm md:text-base text-white">
                    0.00 грн
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <a href="#" className=" hover:text-gray-300">
                    <Image
                      src="/call.png"
                      alt="Phone icon"
                      className="h-6 w-6 md:h-8 md:w-8 invert"
                      width={32}
                      height={32}
                    />
                  </a>
                  <a
                    href="#"
                    className="hidden md:block  hover:text-gray-300 relative"
                  >
                    <Image
                      src="/bell.png"
                      alt="Notification icon"
                      className="h-6 w-6 md:h-8 md:w-8 invert"
                      width={32}
                      height={32}
                    />
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                      1
                    </span>
                  </a>
                  <a href="#" className=" hover:text-gray-300">
                    <Image
                      src="/avatar.png"
                      alt="Avatar icon"
                      className="h-6 w-6 md:h-8 md:w-8 invert"
                      width={32}
                      height={32}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <nav
        className="flex flex-row  justify-start items-center w-full pb-3 gap-2 max-w-7xl mx-auto  "
        ref={dropdownRef}
      >
        <div className="relative md:w-1/5 md:min-w-[200px]">
          <button
            className="w-auto md:w-full px-3 hover:text-gray-300 flex items-center justify-between text-white border border-white py-2 rounded-l-2xl bg-gray-800 "
            onClick={toggleMenu}
          >
            <div className="flex justify-center w-full">
              <span className="text-white font-black px-4 sm:px-5 whitespace-nowrap hidden md:inline">
                Каталог товарів
              </span>
            </div>
            <Image
              src="/menu-hamburger.png"
              alt="Menu icon"
              className="h-6 w-6 invert"
              width={32}
              height={32}
            />
          </button>

          {isMenuOpen && (
            <div className="absolute mt-3 top-full left-0  w-screen  sm:w-[500%] md:w-[150%]  bg-gray-800 text-white rounded-r-3xl   sm:rounded-r-none sm:rounded-l-2xl  shadow-lg z-50 -ml-6 sm:-ml-0">
              <div className="flex flex-col items-stretch relative">
                {menuItems.map((item, index) => (
                  <div key={index} className="group">
                    <div
                      className={`flex items-center justify-start space-x-5 p-6 py-5  text-black font-semibold  border-b border-black sm:border-none hover:bg-white  invert hover:invert-0  ${
                        index === 0
                          ? "rounded-tl-2xl"
                          : index === menuItems.length - 1
                          ? "rounded-bl-2xl "
                          : ""
                      }`}
                      onClick={() =>
                        setOpenSubmenu(openSubmenu === index ? null : index)
                      }
                    >
                      <div className="flex-shrink-0 w-9 h-9 ">
                        <Image
                          src={`${item.imgPath}`}
                          alt={item.name}
                          width={36}
                          height={36}
                          className="rounded-sm object-cover  "
                        />
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <p>{item.name}</p>
                        <FaChevronDown
                          className={` ml-2 transition-transform sm:hidden ${
                            openSubmenu === index ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                    <div
                      className={`sm:hidden ${
                        openSubmenu === index ? "block" : "hidden"
                      } bg-gray-800 text-white w-full`}
                    >
                      {/* Submenu for small screens */}
                      <div className="grid grid-cols-2 gap-4">
                        {item.submenu.map((subitem, subindex) => (
                          <Link
                            href={"#"}
                            key={subindex}
                            className="flex flex-row items-center space-x-3 p-6  hover:text-gray-700 hover:bg-white w-full"
                          >
                            <div className="flex-shrink-0 w-9 h-9">
                              <Image
                                src={`https://via.placeholder.com/24x24`}
                                alt={subitem.name}
                                width={36}
                                height={36}
                                className="rounded-sm object-cover"
                              />
                            </div>
                            <span className="flex-grow line-clamp-3 overflow-ellipsis break-words">
                              {subitem.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="hidden sm:group-hover:block absolute top-full left-0 sm:top-0 sm:left-full  bg-gray-800 text-white w-full sm:w-[120%] lg:w-[180%] rounded-r-2xl">
                      {/* Submenu for large screens */}
                      <div className="grid grid-cols-2 lg:grid-cols-3 ">
                        {item.submenu.map((subitem, subindex) => (
                          <Link
                            href={"#"}
                            key={subindex}
                            className="flex flex-row items-center space-x-3 p-4  hover:text-gray-700 hover:bg-white w-full"
                          >
                            <div className="flex-shrink-0 w-9 h-9">
                              <Image
                                src={`https://via.placeholder.com/24x24`}
                                alt={subitem.imgPath}
                                width={36}
                                height={36}
                                className="rounded-sm object-cover"
                              />
                            </div>
                            <span className="flex-grow line-clamp-3 overflow-ellipsis break-words">
                              {subitem.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex flex-col py-5 sm:hidden">
                  <a href="#" className=" p-6 py-2">
                    Послуги
                  </a>
                  <a href="#" className=" p-6 py-2">
                    Про нас
                  </a>
                  <a href="#" className=" p-6 py-2">
                    Співпраця
                  </a>
                  <a href="#" className=" p-6 py-2">
                    Оплата та доставка
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-grow w-auto sm:w-3/4  lg:w-2/3 max-w-[730px]">
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
