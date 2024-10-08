"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import ImageCarousel from "./ImageCarousel";
import ProductParams from "./ProductParams";
import PurchaseSection from "./PurchaseSection";
import DeliveryPaymentSection from "./DeliveryPaymentSection";
import { useCallback, useEffect, useState } from "react";

import { useAppDispatch } from "@/store/hooks";
import { openModal } from "@/store/storeSlice";
import { ProductAttributes } from "@/types/types";
import { ComponentImagesImages } from "@/gql/graphql";
import { usePathname, useSearchParams } from "next/navigation";
import Breadcrumbs from "../shared/Breadcrumbs";
import { useCart } from "@/hooks/useCart";

const initialParamsCount = 5;

type ShareUrlFunction = (url: string) => string;

const ProductDetails: React.FC<{
  product: ProductAttributes;
  id: string;
  productTypeId: string;
  productTypeTitle: string;
  subcategoryTitle: string;
  productTypeSlug: string;
  subcategorySlug: string;
}> = ({
  product,
  id,
  productTypeId,
  productTypeSlug,
  subcategorySlug,
  productTypeTitle,
  subcategoryTitle,
}) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentUrl, setCurrentUrl] = useState("");

  const { handleUpdateItem } = useCart();

  useEffect(() => {
    setCurrentUrl(
      `${window.location.origin}${pathname}${
        searchParams.toString() ? `?${searchParams.toString()}` : ""
      }`
    );
  }, [pathname, searchParams]);

  const {
    additional_images,
    currency,
    image_link,
    params,
    part_number,
    retail,
    title,
    discount,
    description,
    slug,
  } = product;

  const customLabels = {
    [slug]: title,
    [subcategorySlug]: subcategoryTitle,
    [productTypeSlug]: productTypeTitle,
  };

  const images: { id: string; link: string }[] = [
    { id: "main", link: image_link ?? "" },
    ...(additional_images
      ?.filter((img): img is ComponentImagesImages => img !== null)
      .map((img) => ({
        id: img.id,
        link: img.link ?? "",
      })) ?? []),
  ];

  const handleBuyClick = useCallback(
    (qty: number) => {
      const addedCartItem = {
        id,
        quantity: Math.max(qty, 1),
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

      handleUpdateItem(addedCartItem, Math.max(qty, 1));

      dispatch(openModal());
    },
    [
      id,
      currency,
      discount,
      image_link,
      retail,
      title,
      params,
      part_number,
      slug,
      handleUpdateItem,
      dispatch,
    ]
  );

  const socialIcons = [
    {
      src: "/telegram.png",
      alt: "Telegram icon",
      getShareUrl: (url: string) =>
        `https://t.me/share/url?url=${encodeURIComponent(url)}`,
    },
    {
      src: "/viber.png",
      alt: "Viber icon",
      getShareUrl: (url: string) =>
        `viber://forward?text=${encodeURIComponent(url)}`,
    },
  ];

  const handleShare = (getShareUrl: ShareUrlFunction) => {
    window.open(getShareUrl(currentUrl), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mx-auto p-4">
      <Breadcrumbs customLabels={customLabels} />
      <div className="md:float-left md:w-1/2 md:pr-8">
        <h1 className="text-2xl font-bold mb-2 border-b-2 md:border-0 md:hidden">
          {title}
        </h1>

        <ImageCarousel images={images} title={title} />

        <div className="flex items-center gap-4 my-3 border-b">
          <p>Поділитися:</p>
          <div className="flex gap-3">
            {socialIcons.map((icon, index) => (
              <button
                key={index}
                onClick={() => handleShare(icon.getShareUrl)}
                className="focus:outline-none"
              >
                <Image
                  className="w-8 h-8"
                  src={icon.src}
                  alt={icon.alt}
                  width={36}
                  height={36}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="md:float-right md:w-1/2 md:pl-8">
        <h1 className="text-2xl font-bold mb-2 border-b-2 md:border-0 hidden md:block">
          {title}
        </h1>
        <div className="hidden md:block border-t-2 -ml-16 border-gray-300 mb-2"></div>
        <div className="lg:flex ">
          <div className="w-full lg:w-2/3 pr-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-500">В наявності</span>
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
            <div className="hidden md:block">
              <ProductParams
                params={params}
                initialParamsCount={initialParamsCount}
              />
            </div>
          </div>

          <PurchaseSection
            product={product}
            onBuyClick={(qty) => handleBuyClick(qty)}
            productTypeId={productTypeId}
            id={id}
          />
        </div>

        <DeliveryPaymentSection />
        <div className="hidden md:block border-b-2 border-gray-300 mb-2 md:clear-both -ml-16"></div>
      </div>

      <div className="w-full md:hidden mt-4">
        <ProductParams
          params={params}
          initialParamsCount={initialParamsCount}
        />
      </div>

      <div className="md:pl-8 md:clear-right">
        <div className="pt-4">
          <h2 className="font-bold mb-2">Опис:</h2>
          <ReactMarkdown className="text-md">{description}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
