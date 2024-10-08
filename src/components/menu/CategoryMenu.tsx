import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa6";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY_MENU } from "../home/queries";
import CategorySubmenu from "./CategorySubmenu";
import useOutsideClick from "@/hooks/useOutsideClick";
import Spinner from "../shared/Spinner";
import { CategoryMenuQuery } from "@/gql/graphql";

const CategoryMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDelayedMenu, setShowDelayedMenu] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

  const {
    data: menuItems,
    loading,
    error,
  } = useQuery<CategoryMenuQuery>(GET_CATEGORY_MENU);

  const menuRef = useOutsideClick(() => {
    if (isMenuOpen) setIsMenuOpen(false);
  });

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
    setShowDelayedMenu(true);
  };

  const handleMouseLeave = () => {
    setShowDelayedMenu(false);

    setTimeout(() => {
      if (!showDelayedMenu) {
        setIsMenuOpen(false);
        setOpenSubmenu(null);
      }
    }, 300);
  };

  const handleCategoryHover = (index: number) => {
    setOpenSubmenu(index);
  };

  const handleCategoryClick = (index: number) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };
  useEffect(() => {
    if (!isMenuOpen) {
      setOpenSubmenu(null);
    }
  }, [isMenuOpen]);

  return (
    <div
      className="relative md:w-1/5 md:min-w-[200px]"
      ref={menuRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="w-full px-3 py-2 flex items-center justify-between text-white border border-white rounded-l-2xl bg-gray-800 hover:bg-gray-700 hover:border-gray-300 transition-all duration-300"
        onClick={toggleMenu}
      >
        <div className="hidden md:flex justify-center w-full">
          <span className="text-white text-base font-black whitespace-nowrap hidden md:inline">
            Каталог товарів
          </span>
        </div>
        <div className="md:block">
          <Image
            src="/menu-hamburger.png"
            alt="Menu icon"
            className="h-6 w-6 invert hover:invert-[80%]"
            width={24}
            height={24}
          />
        </div>
      </button>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-screen sm:w-[500%] md:w-[150%] bg-gray-800 text-white rounded-r-3xl sm:rounded-r-none sm:rounded-l-2xl shadow-lg z-50 -ml-6 sm:-ml-0">
          <div className="flex flex-col items-stretch relative">
            {loading ? (
              <div className="flex justify-center items-center p-8">
                <Spinner size={24} />
              </div>
            ) : error ? (
              <div className="flex justify-center items-center p-8">
                <p className="text-white">Упс.. Щось не так с сервером</p>
              </div>
            ) : (
              menuItems?.categories?.data.map((category, index) => (
                <div
                  key={category.id ?? index}
                  className="group"
                  onMouseEnter={() => handleCategoryHover(index)}
                >
                  <div
                    className={`flex items-center justify-start space-x-5 p-6 py-5 text-black font-semibold border-b border-black sm:border-none hover:bg-white invert hover:invert-0 ${
                      index === 0 && "rounded-tl-2xl"
                    } ${
                      index === (menuItems?.categories?.data.length ?? 0) - 1
                        ? "rounded-bl-2xl"
                        : ""
                    }`}
                    onClick={() => handleCategoryClick(index)}
                  >
                    <div className="flex-shrink-0 w-9 h-9">
                      <Image
                        src={`${
                          category.attributes?.icon?.data
                            ? process.env.NEXT_PUBLIC_STRAPI_URL +
                              category.attributes.icon.data.attributes?.url
                            : "https://via.placeholder.com/24x24"
                        }`}
                        alt={category.attributes?.name ?? ""}
                        width={36}
                        height={36}
                        className="rounded-sm object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <p>{category.attributes?.name}</p>
                      <FaChevronDown
                        className={`ml-2 transition-transform sm:hidden ${
                          openSubmenu === index ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                  <CategorySubmenu
                    category={category}
                    isOpen={openSubmenu === index}
                    toggleCategory={(e) => {
                      handleCategoryClick(index);
                      toggleMenu(e);
                    }}
                    toggleMenu={toggleMenu}
                  />
                </div>
              ))
            )}
            <div className="flex flex-col py-5 md:hidden">
              <Link
                href={"/services"}
                className="p-6 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Послуги
              </Link>
              <Link
                href={"/about"}
                className="p-6 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Про нас
              </Link>
              <Link
                href={"/partnership"}
                className="p-6 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Співпраця
              </Link>
              <Link
                href={"/payment-and-delivery"}
                className="p-6 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Оплата та доставка
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryMenu;
