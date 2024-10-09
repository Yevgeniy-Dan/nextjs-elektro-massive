import { useAppDispatch } from "@/store/hooks";
import { openSignInModal } from "@/store/signInModalSlice";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LogIn, LogOut, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const UserDropdown = () => {
  const { status } = useSession();
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(openSignInModal(`${pathname}`));
  };

  const handleLogout = async () => {
    await signOut({
      callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}${pathname}`,
    });
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton>
          <div className="hover:text-gray-300">
            <Image
              src="/avatar.png"
              alt="Avatar"
              width={32}
              height={32}
              className="invert"
            />
          </div>
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className="mt-3 w-52 origin-top-right rounded-xl border border-white bg-white p-1 text-sm/6  transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {status === "authenticated" ? (
            <>
              <MenuItem>
                <Link
                  href="/settings"
                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-200"
                >
                  <Settings className="size-4 fill-white/30" />
                  Налаштування
                </Link>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={handleLogout}
                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-200"
                >
                  <LogOut className="size-4 fill-white/30" />
                  Вийти
                </button>
              </MenuItem>
            </>
          ) : (
            <MenuItem>
              <button
                onClick={handleLogin}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-200"
              >
                <LogIn className="size-4 fill-white/30" />
                Увійти
              </button>
            </MenuItem>
          )}
        </MenuItems>
      </Menu>
    </>
  );
};
export default UserDropdown;
