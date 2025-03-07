import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import LocalizedLink from "../shared/LocalizedLink";
import OptimizedImage from "../shared/OptimizedImage";
import { useSignInModal } from "@/store/useSignInModal";
import { useModalStore } from "@/store/useModalStore";
import { AWS_CDN_URL } from "@/app/utils/constants";
import { FilteredProduct } from "@/types/types";

export interface ITopCardProps {
  id: string;
  categorySlug: string;
  subcategoryId: string;
  subcategorySlug: string;
  productTypeSlug: string;
  productTypeId: string;
  productSlug: string;
  //TODO: change to CartItem type , but not sure
  product: FilteredProduct;
  label?: "top" | "new" | "sale";
  lng: string;
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
  lng,
}) => {
  const { status } = useSession();
  const pathname = usePathname();
  const { openModal } = useModalStore();

  const { openSignInModal } = useSignInModal();

  const handleLogin = () => {
    openSignInModal(`${pathname}`);
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
    openModal();

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      (window as any).gtag("event", "add_to_cart", {
        event_category: "CTA",
        event_label: "Купить",
        value: retail,
        quantity: 1,
      });
    } else {
      console.warn("Google Analytics не загружен или `gtag` недоступен.");
    }
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
    openModal,
  ]);

  return (
    <div
      className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full overflow-hidden relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <LocalizedLink
        lng={lng}
        href={`/${categorySlug}/${subcategorySlug}/${productTypeSlug}/${productSlug}`}
        onClick={() => {
          if (
            typeof window !== "undefined" &&
            typeof window.gtag === "function"
          ) {
            window.gtag("event", "navigation", {
              event_category: "Navigation",
              event_action: "Product Click",
              event_label: title,
              page_path: `/${categorySlug}/${subcategorySlug}/${productTypeSlug}/${productSlug}`,
            });
          }
        }}
        className="relative pt-[100%] block"
      >
        <OptimizedImage
          src={`${product.image_link}`}
          alt="Product Image"
          className="absolute top-0 left-0 w-full h-full object-contain"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
            <OptimizedImage
              src={`${AWS_CDN_URL}shared/public/icons/bucket.png`}
              alt="Bucket icon"
              className="h-6 w-6 cursor-pointer"
              width={32}
              height={32}
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
            <OptimizedImage
              src={
                label === "new"
                  ? `${AWS_CDN_URL}shared/public/icons/new-product-label.png`
                  : `${AWS_CDN_URL}shared/public/icons/sale.png`
              }
              alt={label === "new" ? "new product label" : "sale product label"}
              fill
              sizes="33vw"
              className="object-contain"
            />
          </div>
        )}
      </LocalizedLink>

      {/* Mobile version */}
      <div className="block sm:hidden">
        <div className="flex-grow p-3">
          <LocalizedLink
            lng={lng}
            href={`/${categorySlug}/${subcategorySlug}/${productTypeSlug}/${productSlug}`}
            onClick={() => {
              if (
                typeof window !== "undefined" &&
                typeof window.gtag === "function"
              ) {
                window.gtag("event", "navigation", {
                  event_category: "Navigation",
                  event_action: "Product Click",
                  event_label: title,
                  page_path: `/${categorySlug}/${subcategorySlug}/${productTypeSlug}/${productSlug}`,
                });
              }
            }}
          >
            <h2 className="text-sm font-normal line-clamp-2">{title}</h2>
          </LocalizedLink>
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
          <LocalizedLink
            lng={lng}
            href={`/${categorySlug}/${subcategorySlug}/${productTypeSlug}/${productSlug}`}
            onClick={() => {
              if (
                typeof window !== "undefined" &&
                typeof window.gtag === "function"
              ) {
                window.gtag("event", "navigation", {
                  event_category: "Navigation",
                  event_action: "Product Click",
                  event_label: title,
                  page_path: `/${categorySlug}/${subcategorySlug}/${productTypeSlug}/${productSlug}`,
                });
              }
            }}
          >
            <h2
              ref={titleRef}
              className={`text-sm font-normal transition-all duration-300 ease-in-out
        ${isHovered && isTitleOverflowing ? "" : "line-clamp-2"}`}
            >
              {title}
            </h2>
          </LocalizedLink>
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
