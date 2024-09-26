import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

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
      <MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {items.map((item, index) => (
            <MenuItem key={index}>
              {({ active }) => (
                <a
                  href={item.href}
                  className={`block px-4 py-2 ${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </a>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default Dropdown;
