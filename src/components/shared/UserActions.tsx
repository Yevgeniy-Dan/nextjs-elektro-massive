import Image from "next/image";
import Dropdown from "../home/Dropdown";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openModal } from "@/store/storeSlice";
import { useCart } from "@/hooks/useCart";

const UserActions: React.FC = () => {
  const dispatch = useAppDispatch();
  const { calculateTotal, calculateDiscountTotal } = useCart();

  return (
    <div className="md:mb-3 lg:mb-0 flex items-center gap-x-4 text-white">
      <Dropdown
        className="hidden md:flex bg-gray-800 text-white"
        title="Служба підтримки"
        items={[
          { name: "Налаштування", href: "#" },
          { name: "Підтримка", href: "#" },
        ]}
      />
      <div className="flex items-center gap-3">
        <button
          className="flex items-center"
          onClick={() => dispatch(openModal())}
        >
          <Image
            src="/bucket.png"
            alt="Bucket"
            width={32}
            height={32}
            className="invert mr-1"
          />
          <span>
            {(calculateTotal - calculateDiscountTotal).toFixed(2)} грн
          </span>
        </button>
        <a href="#" className="hover:text-gray-300">
          <Image
            src="/call.png"
            alt="Phone"
            width={24}
            height={24}
            className="invert"
          />
        </a>
        <a href="#" className="hidden md:block hover:text-gray-300 relative">
          <Image
            src="/bell.png"
            alt="Notifications"
            width={24}
            height={24}
            className="invert"
          />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            1
          </span>
        </a>
        <a href="#" className="hover:text-gray-300">
          <Image
            src="/avatar.png"
            alt="Avatar"
            width={24}
            height={24}
            className="invert"
          />
        </a>
      </div>
    </div>
  );
};

export default UserActions;
