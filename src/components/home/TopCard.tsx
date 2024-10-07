import { GetFilteredProductsQuery, GetProductsQuery } from "@/gql/graphql";
import { useFavorites } from "@/hooks/useFavorites";
import { useAppDispatch } from "@/store/hooks";
import { openModal } from "@/store/storeSlice";
import { ProductAttributes } from "@/types/types";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

type TopCardProduct = {
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
  subcategorySlug,
  productTypeId,
  productTypeSlug,
  productSlug,
  label,
  product,
}) => {
  const { favorites, handleAddToFavorites, handleRemoveFromFavorites } =
    useFavorites();
  const isFavorite = favorites.some(
    (fav) => fav.product?.data?.id === product.id
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      console.log("Removing from favorites", product.id);
      handleRemoveFromFavorites(product.id);
    } else {
      console.log("Adding to favorites", product.id, productTypeId);
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
    const addedCartItem = {
      id,
      quantity: 1,
      product: {
        id,
        currency,
        discount,
        image_link: image_link ?? "",
        retail,
        title,
        params,
        part_number,
        slug,
      },
    };

    dispatch(openModal(addedCartItem));
  }, [
    id,
    currency,
    discount,
    image_link,
    retail,
    title,
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
        href={`/${subcategorySlug}/${productTypeSlug}/${productSlug}`}
        className="relative pt-[100%] block"
      >
        <Image
          src={`${product.image_link}`}
          alt="Product Image"
          className="absolute top-0 left-0 w-full h-full"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute top-2 right-2 flex gap-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
          <Image
            src="/bucket.png"
            alt="Bucket icon"
            className="h-6 w-6 cursor-pointer"
            width={32}
            height={32}
          />
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
              className="object-contain"
            />
          </div>
        )}
      </Link>
      <div
        className={`flex-grow p-3 transition-all duration-300 ease-in-out
    ${isHovered && isTitleOverflowing ? "absolute left-0 right-0  bg-white bg-opacity-90" : ""}`}
        style={{
          bottom: isHovered && isTitleOverflowing ? `${35}px` : "35px",
          maxHeight: isHovered && isTitleOverflowing ? "none" : "56px", // 56px is the approximate height for two lines
        }}
      >
        <Link href={`/${subcategorySlug}/${productTypeSlug}/${productSlug}`}>
          <h2
            ref={titleRef}
            className={`text-sm font-normal transition-all duration-300 ease-in-out
        ${isHovered && isTitleOverflowing ? "" : "line-clamp-2"}`}
          >
            {title}
          </h2>
        </Link>
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
