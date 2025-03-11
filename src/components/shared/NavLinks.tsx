"use client";

import { useTranslation } from "@/app/i18n/client";
import LocalizedLink from "./LocalizedLink";

interface NavLinks {
  lng: string;
}

const NavLinks: React.FC<NavLinks> = ({ lng }) => {
  const { t } = useTranslation(lng, "header");

  return (
    <div
      className="invisible md:visible opacity-0 md:opacity-100 absolute md:relative h-0 md:h-auto overflow-hidden md:overflow-visible flex flex-wrap justify-center items-center text-white gap-2 sm:gap-4 mb-4 lg:mb-0 transition-opacity duration-200"
      aria-hidden="true"
    >
      <LocalizedLink
        lng={lng}
        href={"/services"}
        className="border border-white px-2 py-2 hover:bg-gray-800 hover:border-gray-300 transition-all duration-300"
      >
        {t("navigation.services")}
      </LocalizedLink>
      <LocalizedLink
        lng={lng}
        href={"/about"}
        className="border border-white px-2 py-2 hover:bg-gray-800 hover:border-gray-300 transition-all duration-300"
      >
        {t("navigation.about")}
      </LocalizedLink>
      <LocalizedLink
        lng={lng}
        href={"/partnership"}
        className="border border-white px-2 py-2 hover:bg-gray-800 hover:border-gray-300 transition-all duration-300"
      >
        {t("navigation.cooperation")}
      </LocalizedLink>
      <LocalizedLink
        lng={lng}
        href={"/payment-and-delivery"}
        className="border border-white px-2 py-2 hover:bg-gray-800 hover:border-gray-300 transition-all duration-300"
      >
        {t("navigation.paymentDelivery")}
      </LocalizedLink>
      <LocalizedLink
        lng={lng}
        href={"/reviews"}
        className="border border-white px-2 py-2 hover:bg-gray-800 hover:border-gray-300 transition-all duration-300"
      >
        {t("navigation.reviews")}
      </LocalizedLink>
      <LocalizedLink
        lng={lng}
        href={"/blog"}
        className="border border-white px-2 py-2 hover:bg-gray-800 hover:border-gray-300 transition-all duration-300"
      >
        {t("navigation.blog")}
      </LocalizedLink>
    </div>
  );
};

export default NavLinks;
