import { GetFilteredProductsQuery, GetProductsQuery } from "@/gql/graphql";
import { useAppDispatch } from "@/store/hooks";
import { openModal } from "@/store/storeSlice";
import { ProductAttributes } from "@/types/types";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback } from "react";

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
  productSlug: string;
  product: TopCardProduct;
  label?: "top" | "new" | "sale";
}

const TopCard: React.FC<ITopCardProps> = ({
  id,
  subcategorySlug,
  productTypeSlug,
  productSlug,
  label,
  product,
}) => {
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
    <div className="rounded-xl shadow-light hover:shadow-hover_card transition-shadow duration-300 flex flex-col h-full overflow-hidden group">
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
            fill="red"
            stroke="red"
            strokeWidth={1.5}
            className="cursor-pointer"
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
      <div className="flex-grow  p-3">
        <Link
          href={`/${subcategorySlug}/${productTypeSlug}/${productSlug}`}
          className="block"
        >
          <h2 className="text-xs sm:text-sm font-normal line-clamp-2 group-hover:line-clamp-none">
            {title}
          </h2>
        </Link>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex-grow py-2 px-4 font-medium text-xs sm:text-sm bg-white z-10 overflow-hidden rounded-r-2xl">
          <span className="whitespace-nowrap">{retail}</span>
          <span className="ml-1 whitespace-nowrap">грн</span>
        </div>
        <button
          onClick={handleBuyClick}
          className="bg-gradient-elektro-massive-horizontal py-2 px-4 text-white text-xs sm:text-sm text-center w-2/3 -ml-6 pl-8"
        >
          Купити
        </button>
      </div>
    </div>
  );
};

export default TopCard;
