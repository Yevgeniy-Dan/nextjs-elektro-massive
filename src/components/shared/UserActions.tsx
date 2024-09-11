import Image from "next/image";
import Dropdown from "../home/Dropdown";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openModal } from "@/store/storeSlice";
import { useCartCalculations } from "@/hooks/useCartCalcutaions";

const UserActions = () => {
  const dispatch = useAppDispatch();
  const { total, discountTotal } = useCartCalculations();

  return (
    <div className="flex flex-col xl:flex-row items-center text-white">
      <div className="hidden md:block">
        <Dropdown
          className="mt-4 mb-2 xl:mt-0 lg:mr-4 bg-gray-800 px-3 py-2"
          title="Служба підтримки"
          items={[
            { name: "Account settings", href: "#" },
            { name: "Support", href: "#" },
          ]}
        />
      </div>
      <div className="flex items-center gap-1 md:gap-3 flex-row md:mb-3 xl:mb-0">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => dispatch(openModal())}
        >
          <button className="mr-1 hover:text-gray-300">
            <Image
              src="/bucket.png"
              alt="Bucket icon"
              className="h-8 w-8 md:h-10 md:w-10 invert"
              width={32}
              height={32}
            />
          </button>
          <span className="text-xs sm:text-sm md:text-base text-white">
            {(total - discountTotal).toFixed(2)} грн
          </span>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <a href="#" className="hover:text-gray-300">
            <Image
              src="/call.png"
              alt="Phone icon"
              className="h-6 w-6 md:h-8 md:w-8 invert"
              width={32}
              height={32}
            />
          </a>
          <a href="#" className="hidden md:block hover:text-gray-300 relative">
            <Image
              src="/bell.png"
              alt="Notification icon"
              className="h-6 w-6 md:h-8 md:w-8 invert"
              width={32}
              height={32}
            />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              1
            </span>
          </a>
          <a href="#" className="hover:text-gray-300">
            <Image
              src="/avatar.png"
              alt="Avatar icon"
              className="h-6 w-6 md:h-8 md:w-8 invert"
              width={32}
              height={32}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserActions;
