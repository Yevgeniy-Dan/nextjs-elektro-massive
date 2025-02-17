import React from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";

interface MenuItems {
  href: string;
  name: string;
}

interface DropdownProps {
  className?: string;
  title: string;
  items: MenuItems[];
  lng: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  className,
  title,
  items,
  lng,
}) => {
  const { t } = useTranslation(lng, "header");
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          className={`inline-flex w-full rounded-md px-3 py-2 font-semibold shadow-sm ${className}`}
        >
          {title}
          <ChevronDown className="w-5 h-5 ml-2" />
        </MenuButton>
      </div>
      <MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white text-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-4 pb-3 font-medium">
          <p className="text-sm font-normal text-center mb-4">
            {t("supportService.workTime")}
          </p>
          <div className="space-y-3">
            <Link
              href={`viber://chat?number=+380964992448`}
              className="flex items-center"
              onClick={() => {
                window.gtag("event", "support_service_click", {
                  event_category: "Support Service",
                  event_action: "Click",
                  event_label: "Viber Chat",
                });
              }}
            >
              <Image
                src="/viber-black-white-icon.png"
                alt="Viber"
                className="mr-4"
                width={24}
                height={24}
              />
              <span>Viber</span>
            </Link>
            <Link
              href={`https://t.me/Elektro_Massive`}
              className="flex items-center"
              onClick={() => {
                window.gtag("event", "support_service_click", {
                  event_category: "Support Service",
                  event_action: "Click",
                  event_label: "Telegram Chat",
                });
              }}
            >
              <Image
                src="/telegram-black-white-icon.png"
                alt="Telegram"
                className="mr-4"
                width={24}
                height={24}
              />
              <span>Telegram</span>
            </Link>
            <Link
              href={`mailto:elektromassive@gmail.com`}
              className="flex items-center"
              onClick={() => {
                window.gtag("event", "support_service_click", {
                  event_category: "Support Service",
                  event_action: "Click",
                  event_label: "E-mail",
                });
              }}
            >
              <Image
                src="/wing-black-white-icon.png"
                alt="Mail"
                className="mr-4"
                width={24}
                height={24}
              />
              <span>E-mail</span>
            </Link>
            <hr className="my-3 border-gray-200" />
            <Link
              href="tel:+380980392853"
              className="flex items-center"
              onClick={() => {
                window.gtag("event", "support_service_click", {
                  event_category: "Support Service",
                  event_action: "Click",
                  event_label: "Phone",
                });
              }}
            >
              <Image
                src="/phone.png"
                alt="Phone Icon"
                className="mr-1"
                width={24}
                height={24}
              />
              <span className="font-normal">
                {t("supportService.firstPhone")}
              </span>
            </Link>
            <Link
              href="tel:+380976323159"
              className="flex items-center"
              onClick={() => {
                window.gtag("event", "support_service_click", {
                  event_category: "Support Service",
                  event_action: "Click",
                  event_label: "Phone",
                });
              }}
            >
              <Image
                src="/phone.png"
                alt="Phone Icon"
                className="mr-1"
                width={24}
                height={24}
              />
              <span className="font-normal">
                {t("supportService.secondPhone")}
              </span>
            </Link>
          </div>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default Dropdown;
