import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

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
    <Menu as="div" className="relative inline-block text-left mx-4">
      <div className="w-56">
        <MenuButton
          className={`inline-flex w-full justify-around rounded-md px-3 py-2 text-sm font-semibold shadow-sm  ${className} w-full`}
        >
          {title}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
            className="-mr-1 h-5 w-5 text-white "
          >
            <path
              fillRule="evenodd"
              d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {items.map((menuItem, index) => (
            <MenuItem key={index}>
              <a
                href={`${menuItem.href}`}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                {menuItem.name}
              </a>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default Dropdown;
