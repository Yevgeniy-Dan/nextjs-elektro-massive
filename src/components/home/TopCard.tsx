import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useAppDispatch } from "@/store/hooks";
import { openSignInModal } from "@/store/signInModalSlice";
import { openModal } from "@/store/storeSlice";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

//TODO: change to CartItem type
export type TopCardProduct = {
  id: string;
  title: string;
  part_number: string;
  retail: number;
  currency: string;
  image_link?: string | null;
  slug: string;
  discount?: number | null;
  params?: any | null;
};

export interface ITopCardProps {
  id: string;
  categorySlug: string;
  subcategoryId: string;
  subcategorySlug: string;
  productTypeSlug: string;
  productTypeId: string;
  productSlug: string;
  product: TopCardProduct;
  label?: "top" | "new" | "sale";
}

const TopCard: React.FC<ITopCardProps> = ({
  id,
  categorySlug,
  subcategorySlug,
  productTypeId,
  productTypeSlug,
  productSlug,
  label,
  product,
}) => {
  const { status } = useSession();
  const pathname = usePathname();

  const handleLogin = () => {
    dispatch(openSignInModal(`${pathname}`));
  };

  const { favorites, handleAddToFavorites, handleRemoveFromFavorites } =
    useFavorites();
  const isFavorite = favorites.some(
    (fav) => fav.product?.data?.id === product.id
  );

  const toggleFavorite = () => {
    if (status === "unauthenticated") {
      handleLogin();
    } else if (isFavorite) {
      handleRemoveFromFavorites(product.id);
    } else {
      handleAddToFavorites(product.id, productTypeId);
    }
  };

  const dispatch = useAppDispatch();

  const {
    currency,
    discount,
    image_link,
    retail,
    title,
    params,
    part_number,
    slug,
  } = product;

  const [isHovered, setIsHovered] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isTitleOverflowing, setIsTitleOverflowing] = useState(false);

  const { handleUpdateItem } = useCart();

  useEffect(() => {
    const checkOverflow = () => {
      if (titleRef.current) {
        const isOverflowing =
          titleRef.current.scrollHeight > titleRef.current.clientHeight;
        setIsTitleOverflowing(isOverflowing);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [title]);

  const handleBuyClick = useCallback(() => {
    handleUpdateItem(
      {
        id: id,
        quantity: 1,
        product: {
          id: id,
          title: title,
          retail: retail,
          currency: currency,
          discount: discount,
          image_link: image_link,
          params: params,
          part_number: part_number,
          slug: slug,
        },
      },
      1
    );
    dispatch(openModal());
  }, [
    handleUpdateItem,
    id,
    title,
    retail,
    currency,
    discount,
    image_link,
    params,
    part_number,
    slug,
    dispatch,
  ]);

  return (
    <div
      className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full overflow-hidden relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/${categorySlug}/${subcategorySlug}/${productTypeSlug}/${productSlug}`}
        className="relative pt-[100%] block"
      >
        <Image
          src={`${product.image_link}`}
          alt="Product Image"
          className="absolute top-0 left-0 w-full h-full object-contain"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority
        />
        <div className="absolute top-2 right-2 flex gap-x-1 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Heart
            size={22}
            fill={isFavorite ? "red" : "none"}
            stroke={isFavorite ? "red" : "currentColor"}
            strokeWidth={1.5}
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite();
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleBuyClick();
            }}
          >
            <Image
              src="/bucket.png"
              alt="Bucket icon"
              className="h-6 w-6 cursor-pointer"
              width={32}
              height={32}
              priority
            />
          </button>
        </div>
        {label === "top" && (
          <div className="absolute top-0 left-0 bg-orange-500 text-white px-2 py-1 rounded-br-lg">
            TOP
          </div>
        )}

        {(label === "new" || label === "sale") && (
          <div className="absolute  -top-4 left-0 w-1/3 h-1/3 z-50">
            <Image
              src={label === "new" ? "/new-product-label.png" : "/sale.png"}
              alt={label === "new" ? "new product label" : "sale product label"}
              fill
              sizes="33vw"
              className="object-contain"
              priority
            />
          </div>
        )}
      </Link>

      {/* Mobile version */}
      <div className="block sm:hidden">
        <div className="flex-grow p-3">
          <Link
            href={`/${categorySlug}/${subcategorySlug}/${productTypeSlug}/${productSlug}`}
          >
            <h2 className="text-sm font-normal line-clamp-2">{title}</h2>
          </Link>
        </div>
      </div>

      {/* Desktop version */}
      <div className="hidden sm:block">
        <div
          className={`flex-grow p-3 transition-all duration-300 ease-in-out
    ${isHovered && isTitleOverflowing ? "absolute left-0 right-0  bg-white bg-opacity-90" : ""}`}
          style={{
            bottom: isHovered && isTitleOverflowing ? `${35}px` : "35px",
            maxHeight: isHovered && isTitleOverflowing ? "none" : "56px", // 56px is the approximate height for two lines
          }}
        >
          <Link
            href={`/${categorySlug}/${subcategorySlug}/${productTypeSlug}/${productSlug}`}
          >
            <h2
              ref={titleRef}
              className={`text-sm font-normal transition-all duration-300 ease-in-out
        ${isHovered && isTitleOverflowing ? "" : "line-clamp-2"}`}
            >
              {title}
            </h2>
          </Link>
        </div>
      </div>
      <div className="mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex-grow py-2 px-4 font-medium text-xs sm:text-sm bg-white z-20 overflow-hidden rounded-r-2xl">
            <span className="whitespace-nowrap">{retail}</span>
            <span className="ml-1 whitespace-nowrap">грн</span>
          </div>
          <button
            onClick={handleBuyClick}
            className="bg-gradient-elektro-massive-horizontal py-2 px-4 text-white text-xs sm:text-sm text-center w-2/3 -ml-6 pl-8 z-10"
          >
            Купити
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopCard;
