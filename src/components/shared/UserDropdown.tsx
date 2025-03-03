import React from "react";
import { useTranslation } from "@/app/i18n/client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LogIn, LogOut, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import OptimizedImage from "./OptimizedImage";
import { useSignInModal } from "@/store/useSignInModal";
import { AWS_CDN_URL } from "@/app/utils/constants";

interface UserDropdownProps {
  lng: string;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ lng }) => {
  const { t } = useTranslation(lng, "header");
  const { status } = useSession();
  const pathname = usePathname();

  const { openSignInModal } = useSignInModal();

  const handleLogin = () => {
    openSignInModal(`${pathname}`);
  };

  const handleLogout = async () => {
    await signOut({
      callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}${pathname}`,
    });
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton>
        <div className="hover:text-gray-300 w-6 sm:w-8 h-6 sm:h-8 relative">
          <OptimizedImage
            src={`${AWS_CDN_URL}shared/public/icons/avatar.png`}
            alt="Avatar"
            fill
            sizes="32px"
            className="invert object-contain"
            priority
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
              <button
                onClick={handleLogout}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-200"
              >
                <LogOut className="size-4 fill-white/30" />
                {t("userMenu.logout")}
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
              {t("userMenu.login")}
            </button>
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  );
};
export default UserDropdown;
