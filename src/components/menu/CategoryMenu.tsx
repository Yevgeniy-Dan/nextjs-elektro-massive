import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa6";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY_MENU } from "@/graphql/queries/categories";
import CategorySubmenu from "./CategorySubmenu";
import useOutsideClick from "@/hooks/useOutsideClick";
import Spinner from "../shared/Spinner";
import { CategoryMenuQuery, CategoryMenuQueryVariables } from "@/gql/graphql";
import { useTranslation } from "@/app/i18n/client";
import { useScrollToElement } from "@/hooks/useScrollToElement";
import LocalizedLink from "../shared/LocalizedLink";

interface CategoryMenuProps {
  lng: string;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ lng }) => {
  const { t } = useTranslation(lng, "header");
  const { scrollToElement } = useScrollToElement();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const categoryRefs = useRef<Array<HTMLDivElement | null>>([]);
  const delayTimeout = useRef<NodeJS.Timeout | null>(null);

  const setCategoryRef = useCallback(
    (el: HTMLDivElement | null, index: number) => {
      categoryRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const menuRef = useOutsideClick(() => {
    if (isMenuOpen) setIsMenuOpen(false);
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    data: menuItems,
    loading,
    error,
  } = useQuery<CategoryMenuQuery, CategoryMenuQueryVariables>(
    GET_CATEGORY_MENU,
    {
      variables: { locale: lng },
    }
  );

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseEnter = () => {
    if (delayTimeout.current) clearTimeout(delayTimeout.current);
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    delayTimeout.current = setTimeout(() => {
      setIsMenuOpen(false);
      setOpenSubmenu(null);
    }, 300);
  };

  const handleCategoryHover = (index: number) => {
    setOpenSubmenu(index);
  };

  const handleCategoryClick = (index: number) => {
    if (isMobile) {
      if (openSubmenu === index) {
        setOpenSubmenu(null);
        // Scroll to top of menu when closing category
        scrollToElement(scrollRef);
      } else {
        setTimeout(() => {
          setOpenSubmenu(index);
          if (categoryRefs.current[index]) {
            scrollToElement({ current: categoryRefs.current[index] });
          }
        }, 100);
      }
    }
  };

  useEffect(() => {
    if (!isMenuOpen) {
      setOpenSubmenu(null);
    }
    return () => {
      if (delayTimeout.current) clearTimeout(delayTimeout.current);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative md:w-1/5 md:min-w-[200px]" ref={menuRef}>
      <div
        ref={scrollRef}
        className="w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className="w-full px-3 py-2 flex items-center justify-between text-white border border-white rounded-l-2xl bg-gray-800 hover:bg-gray-700 hover:border-gray-300 transition-all duration-300"
          onClick={toggleMenu}
        >
          <div className="hidden md:flex justify-center w-full">
            <span className="text-white text-base font-black whitespace-nowrap hidden md:inline">
              {t("menuTitle")}
            </span>
          </div>
          <div className="relative md:block w-6 h-6">
            <Image
              src="/menu-hamburger.png"
              alt="Menu icon"
              className="h-6 w-6 invert hover:invert-[80%]"
              fill
              sizes="24px"
              priority
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
                    ref={(el) => setCategoryRef(el, index)}
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
                          priority
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
                      lng={lng}
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
                <LocalizedLink
                  lng={lng}
                  href={"/services"}
                  className="p-6 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("navigation.services")}
                </LocalizedLink>
                <LocalizedLink
                  lng={lng}
                  href={"/about"}
                  className="p-6 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("navigation.about")}
                </LocalizedLink>
                <LocalizedLink
                  lng={lng}
                  href={"/partnership"}
                  className="p-6 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("navigation.cooperation")}
                </LocalizedLink>
                <LocalizedLink
                  lng={lng}
                  href={"/payment-and-delivery"}
                  className="p-6 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("navigation.paymentDelivery")}
                </LocalizedLink>
                <LocalizedLink
                  lng={lng}
                  href={"/reviews"}
                  className="p-6 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("navigation.reviews")}
                </LocalizedLink>
                <LocalizedLink
                  lng={lng}
                  href={"/blog"}
                  className="p-6 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("navigation.blog")}
                </LocalizedLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryMenu;
