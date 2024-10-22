"use client";

import { useTranslation } from "@/app/i18n/client";
import Link from "next/link";

interface NavLinks {
  lng: string;
}

const NavLinks: React.FC<NavLinks> = ({ lng }) => {
  const { t } = useTranslation(lng, "header");

  return (
    <div className="hidden md:flex flex-wrap justify-center items-center text-white gap-2 sm:gap-4 mb-4 lg:mb-0">
      <Link
        href={"/services"}
        className="border border-white px-2 py-2 hover:bg-gray-800 hover:border-gray-300 transition-all duration-300"
      >
        {t("navigation.services")}
      </Link>
      <Link
        href={"/about"}
        className="border border-white px-2 py-2 hover:bg-gray-800 hover:border-gray-300 transition-all duration-300"
      >
        {t("navigation.about")}
      </Link>
      <Link
        href={"/partnership"}
        className="border border-white px-2 py-2 hover:bg-gray-800 hover:border-gray-300 transition-all duration-300"
      >
        {t("navigation.cooperation")}
      </Link>
      <Link
        href={"/payment-and-delivery"}
        className="border border-white px-2 py-2 hover:bg-gray-800 hover:border-gray-300 transition-all duration-300"
      >
        {t("navigation.paymentDelivery")}
      </Link>
      <Link
        href={"/reviews"}
        className="border border-white px-2 py-2 hover:bg-gray-800 hover:border-gray-300 transition-all duration-300"
      >
        {t("navigation.reviews")}
      </Link>
    </div>
  );
};

export default NavLinks;
