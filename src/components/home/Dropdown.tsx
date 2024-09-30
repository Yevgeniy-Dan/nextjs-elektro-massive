import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown, Mail, Phone } from "lucide-react";
import Image from "next/image";

interface MenuItems {
  href: string;
  name: string;
}

interface DropdownProps {
  className?: string;
  title: string;
  items: MenuItems[];
}

const Dropdown: React.FC<DropdownProps> = ({ className, title, items }) => {
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
            з 8:00 до 20:00 (пн-нд)
          </p>
          <div className="space-y-3">
            <a href="#" className="flex items-center">
              <Image
                src="/viber-black-white-icon.png"
                alt="Viber"
                className="mr-4"
                width={24}
                height={24}
              />
              <span>Viber</span>
            </a>
            <a href="#" className="flex items-center">
              <Image
                src="/telegram-black-white-icon.png"
                alt="Telegram"
                className="mr-4"
                width={24}
                height={24}
              />
              <span>Telegram</span>
            </a>
            <a href="#" className="flex items-center">
              <Image
                src="/wing-black-white-icon.png"
                alt="Mail"
                className="mr-4"
                width={24}
                height={24}
              />
              <span>E-mail</span>
            </a>
            <hr className="my-3 border-gray-200" />
            <div className="flex items-center">
              <Image
                src="/phone.png"
                alt="Phone Icon"
                className="mr-1"
                width={24}
                height={24}
              />
              <span className="font-normal">380 (98) 039 28 53 (Вероніка)</span>
            </div>
            <div className="flex items-center">
              <Image
                src="/phone.png"
                alt="Phone Icon"
                className="mr-1"
                width={24}
                height={24}
              />
              <span className="font-normal">380 (97) 632 31 59 (Євген)</span>
            </div>
          </div>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default Dropdown;
