import Dropdown from "../home/Dropdown";
import { useCart } from "@/hooks/useCart";
import { Heart } from "lucide-react";
import UserDropdown from "./UserDropdown";
import { useTranslation } from "@/app/i18n/client";
import { useFavorites } from "@/hooks/useFavorites";
import LanguageToggler from "./LanguageToggler";
import LocalizedLink from "./LocalizedLink";
import OptimizedImage from "./OptimizedImage";
import { useModalStore } from "@/store/useModalStore";
import { AWS_CDN_URL } from "@/app/utils/constants";

interface UserActionsProps {
  lng: string;
}

const UserActions: React.FC<UserActionsProps> = ({ lng }) => {
  const { t } = useTranslation(lng, "header");

  const { openModal } = useModalStore();
  const { calculateDiscountTotal, totalCount: cartTotalCount } = useCart();
  const { totalCount: favoritesTotalCount } = useFavorites();

  return (
    <div className="md:mb-3 lg:mb-0 flex items-center gap-x-2 text-white">
      <Dropdown
        className="hidden md:flex bg-gray-800 text-white"
        title={`${t("supportService.title")}`}
        lng={lng}
        items={[]}
      />
      <div className="flex justify-center items-center gap-1 sm:gap-2">
        <button className="flex items-center" onClick={() => openModal()}>
          <div className="w-6 sm:w-8 h-6 sm:h-8 relative mr-2">
            <OptimizedImage
              src={`${AWS_CDN_URL}shared/public/icons/bucket.png`}
              alt="Bucket"
              fill
              sizes="32px"
              className="invert object-contain"
              priority
            />
            {cartTotalCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-elektro-red rounded-full z-30">
                {cartTotalCount}
              </span>
            )}
          </div>
          <span className="hidden sm:inline text-base">
            {calculateDiscountTotal.toFixed(2)} грн
          </span>
        </button>
        {/* <div className="flex items-center"> */}
        <LanguageToggler lng={lng} />
        {/* </div> */}
        <LocalizedLink
          lng={lng}
          href="/favorites"
          className="relative w-6 sm:w-8 h-6 sm:h-8 flex items-center justify-center"
        >
          <Heart className="w-full h-full" />
          {favoritesTotalCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-elektro-red rounded-full z-30">
              {favoritesTotalCount}
            </span>
          )}
        </LocalizedLink>
        <div className="w-6 sm:w-8 h-6 sm:h-8">
          <UserDropdown lng={lng} />
        </div>
      </div>
    </div>
  );
};

export default UserActions;
