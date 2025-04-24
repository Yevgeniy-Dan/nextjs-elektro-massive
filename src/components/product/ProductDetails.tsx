"use client";

import ProductParams from "./ProductParams";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";

import { ProductAttributes } from "@/types/types";
import { ComponentImagesImages } from "@/gql/graphql";
import { usePathname, useSearchParams } from "next/navigation";
import Breadcrumbs from "../shared/Breadcrumbs";
import { useCart } from "@/hooks/useCart";
import dynamic from "next/dynamic";
import SocialShare from "./SocialShare";
import ProductHeader from "./ProductHeader";
import { useModalStore } from "@/store/useModalStore";
import { AWS_CDN_URL } from "@/app/utils/constants";

const initialParamsCount = 5;

const ImageCarousel = dynamic(() => import("./ImageCarousel"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

const ReactMarkdown = dynamic(() => import("react-markdown"), {
  ssr: true,
});

const ProductDetails: React.FC<{
  product: ProductAttributes;
  id: string;
  productTypeId: string;
  categoryTitle: string;
  productTypeTitle: string;
  subcategoryTitle: string;
  categorySlug: string;
  productTypeSlug: string;
  subcategorySlug: string;
}> = ({
  product,
  id,
  productTypeId,
  categorySlug,
  productTypeSlug,
  subcategorySlug,
  categoryTitle,
  productTypeTitle,
  subcategoryTitle,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentUrl, setCurrentUrl] = useState("");
  const { openModal } = useModalStore();

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
    product_parameters,
    part_number,
    retail,
    title,
    discount,
    description,
    slug,
  } = product;

  const customLabels = {
    [categorySlug]: categoryTitle,
    [subcategorySlug]: subcategoryTitle,
    [productTypeSlug]: productTypeTitle,
    [slug]: title,
  };

  const images: { id: string; link: string }[] = useMemo(
    () => [
      { id: "main", link: image_link ?? "" },
      ...(additional_images
        ?.filter((img): img is ComponentImagesImages => img !== null)
        .map((img) => ({
          id: img.id,
          link: img.link ?? "",
        })) ?? []),
    ],
    [image_link, additional_images]
  );

  const handleBuyClick = useCallback(
    (qty: number) => {
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "add_to_cart", {
          event_category: "CTA",
          event_label: "Купить",
          value: retail,
          quantity: Math.max(qty, 1),
        });
      }

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
          product_parameters,
          part_number,
          slug,
        },
      };

      handleUpdateItem(addedCartItem, Math.max(qty, 1));

      openModal();
    },
    [
      id,
      currency,
      discount,
      image_link,
      retail,
      title,
      product_parameters,
      part_number,
      slug,
      handleUpdateItem,
      openModal,
    ]
  );

  const memoizedSocialIcons = useMemo(
    () => [
      {
        src: `${AWS_CDN_URL}shared/public/icons/telegram.png`,
        alt: "Telegram icon",
        getShareUrl: (url: string) =>
          `https://t.me/share/url?url=${encodeURIComponent(url)}`,
      },
      {
        src: `${AWS_CDN_URL}shared/public/icons/viber.png`,
        alt: "Viber icon",
        getShareUrl: (url: string) =>
          `viber://forward?text=${encodeURIComponent(url)}`,
      },
    ],
    []
  );

  return (
    <div className="mx-auto p-4">
      <Breadcrumbs customLabels={customLabels} />
      <div className="md:float-left md:w-1/2 md:pr-8">
        <h1 className="text-2xl font-bold mb-2 border-b-2 md:border-0 md:hidden">
          {title}
        </h1>

        <ImageCarousel images={images} title={title} />

        <SocialShare
          currentUrl={currentUrl}
          socialIcons={memoizedSocialIcons}
        />
      </div>

      <div className="md:float-right md:w-1/2 md:pl-8">
        <ProductHeader
          title={title}
          part_number={part_number}
          params={product_parameters}
          initialParamsCount={initialParamsCount}
          product={product}
          onBuyClick={handleBuyClick}
          productTypeId={productTypeId}
          id={id}
        />
      </div>

      <div className="w-full md:hidden mt-4">
        <ProductParams
          part_number={part_number}
          params={product_parameters}
          initialParamsCount={initialParamsCount}
        />
      </div>

      <div className="md:pl-8 md:clear-right">
        <Suspense fallback={<div>Loading description...</div>}>
          <div className="pt-4">
            <h2 className="font-bold mb-2">Опис:</h2>
            <ReactMarkdown className="text-md">{description}</ReactMarkdown>
          </div>
        </Suspense>
      </div>
    </div>
  );
};
export default ProductDetails;
