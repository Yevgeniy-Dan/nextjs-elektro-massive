"use client";

import { useTranslation } from "@/app/i18n/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CompanyLink {
  href: string;
  title: string;
}

interface Contact {
  name: string;
  phone: string;
}

interface FooterProps {
  className?: string;
  lng: string;
}

const Footer: React.FC<FooterProps> = ({ className = "", lng }) => {
  const { t } = useTranslation(lng, "footer");

  const companyLinks = t("companyLinks", {
    returnObjects: true,
  }) as CompanyLink[];
  const additionalLinks = t("additionalLinks", {
    returnObjects: true,
  }) as CompanyLink[];
  const contacts = t("contacts", { returnObjects: true }) as Contact[];

  return (
    <footer
      className={`bg-gradient-elektro-massive-horizontal text-white py-8 ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          <div className="relative  mb-6 sm:mb-0 mx-auto sm:m-0">
            <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 z-10">
              <Image
                src="/logo-footer.png"
                alt="Elektro Massive Logo"
                fill
                sizes="(max-width: 640px) 128px, (max-width: 768px) 192px, 256px"
                className="mb-4"
                priority
              />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold mb-3">{t("company")}</h3>
            {companyLinks.map((item, index) => (
              <Link key={index} href={`/${item.href}`} className="block mt-2">
                {item.title}
              </Link>
            ))}
            <Link href="/privacy-policy" className="block mt-2">
              Privacy Policy
            </Link>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold mb-2">{t("workingHours.title")}</h3>
            <p className="font-light">{t("workingHours.hours")}</p>
            {additionalLinks.map((item, index) => (
              <Link key={index} href={item.href} className="block mb-2 mt-4">
                {item.title}
              </Link>
            ))}
          </div>
          <div className="flex flex-col-reverse sm:flex-col">
            <div className="flex flex-wrap justify-start items-center lg:grid lg:grid-cols-2  xl:flex lg:flex-nowrap gap-3 my-4">
              <Link
                href="https://t.me/YourTelegramUsername"
                className="text-white hover:text-gray-300 hover:opacity-75 transition-opacity"
              >
                <Image
                  className="w-10 h-10"
                  src="/telegram.png"
                  alt="Telegram icon"
                  width={48}
                  height={48}
                  priority
                />
              </Link>

              <Link
                href="https://www.tiktok.com/@YourTikTokUsername"
                className="text-white hover:text-gray-300  hover:opacity-75 transition-opacity"
              >
                <Image
                  className="w-10 h-10"
                  src="/tiktok.png"
                  alt="TikTok icon"
                  width={48}
                  height={48}
                  priority
                />
              </Link>
              <Link
                href="https://www.instagram.com/YourInstagramUsername"
                className="text-white hover:text-gray-300  hover:opacity-75 transition-opacity"
              >
                <Image
                  className="w-10 h-10"
                  src="/instagram.png"
                  alt="Instagram icon"
                  width={48}
                  height={48}
                  priority
                />
              </Link>
            </div>
            <div>
              <h3 className="font-bold mb-2 mt-4">{t("contactUs")}</h3>
              <div className="space-y-3">
                {contacts.map((contact, index) => (
                  <p key={index} className="font-light">
                    {contact.name}: <br /> {contact.phone}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-sm">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
