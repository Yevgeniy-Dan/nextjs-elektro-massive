import Image from "next/image";
import Dropdown from "../home/Dropdown";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openModal } from "@/store/storeSlice";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { Heart } from "lucide-react";
import UserDropdown from "./UserDropdown";
import { useTranslation } from "@/app/i18n/client";

interface UserActionsProps {
  lng: string;
}

const UserActions: React.FC<UserActionsProps> = ({ lng }) => {
  const { t } = useTranslation(lng, "header");

  const dispatch = useAppDispatch();
  const { calculateTotal, calculateDiscountTotal } = useCart();

  return (
    <div className="md:mb-3 lg:mb-0 flex items-center gap-x-4 text-white">
      <Dropdown
        className="hidden md:flex bg-gray-800 text-white"
        title={`${t("supportService.title")}`}
        lng={lng}
        items={[]}
      />
      <div className="flex justify-center items-center gap-2">
        <button
          className="flex items-center"
          onClick={() => dispatch(openModal())}
        >
          <div className="w-8 h-8 relative mr-2">
            <Image
              src="/bucket.png"
              alt="Bucket"
              layout="fill"
              objectFit="contain"
              className="invert"
            />
          </div>
          <span className="hidden sm:inline text-base">
            {(calculateTotal - calculateDiscountTotal).toFixed(2)} грн
          </span>
        </button>
        <Link
          href="/favorites"
          className="w-8 h-8 flex items-center justify-center"
        >
          <Heart className="w-full h-full" />
        </Link>
        <div className="w-8 h-8">
          <UserDropdown lng={lng} />
        </div>
      </div>
    </div>
  );
};

export default UserActions;
