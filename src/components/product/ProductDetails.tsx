"use client";

import { IProductAttributes } from "@/types/types";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import ImageCarousel from "./ImageCarousel";
import ProductParams from "./ProductParams";
import PurchaseSection from "./PurchaseSection";
import DeliveryPaymentSection from "./DeliveryPaymentSection";
import { useCallback } from "react";

import { useAppDispatch } from "@/store/hooks";
import { openModal } from "@/store/storeSlice";

const initialParamsCount = 5;

const ProductDetails: React.FC<{ product: IProductAttributes; id: string }> = ({
  product,
  id,
}) => {
  const dispatch = useAppDispatch();

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
  } = product;

  const images = [{ id: "main", link: image_link }, ...additional_images];

  const handleBuyClick = useCallback(() => {
    const addedCartItem = {
      id,
      quantity: 1,
      product: {
        id,
        currency,
        discount,
        image_link,
        retail,
        title,
        params,
      },
    };

    dispatch(openModal(addedCartItem));
  }, [id, currency, discount, image_link, retail, title, params, dispatch]);

  return (
    <div className="mx-auto p-4">
      <div className="md:float-left md:w-1/2 md:pr-8">
        <ImageCarousel images={images} title={title} />

        <div className="flex items-center justify-center gap-4 my-3 border-b">
          <p>Поділитися:</p>
          <div className="flex gap-3">
            <Image
              className="w-8 h-8"
              src="/telegram.png"
              alt="Telegram icon"
              width={36}
              height={36}
            />

            <Image
              className="w-8 h-8"
              src="/viber.png"
              alt="Viber icon"
              width={36}
              height={36}
            />

            <Image
              className="w-8 h-8"
              src="/instagram.png"
              alt="Instagram icon"
              width={36}
              height={36}
            />
          </div>
        </div>
      </div>

      <div className="md:float-right md:w-1/2 md:pl-8">
        <h1 className="text-2xl font-bold mb-2 border-b-2 md:border-0">
          {title}
        </h1>
        <div className="hidden md:block border-t-2 -ml-16 border-gray-300 mb-2"></div>
        <div className="lg:flex ">
          <div className="w-full lg:w-2/3 pr-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-500">В наявності</span>
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
            <ProductParams
              params={params}
              initialParamsCount={initialParamsCount}
            />
          </div>

          <PurchaseSection
            product={product}
            id={id}
            onBuyClick={handleBuyClick}
          />
        </div>

        <DeliveryPaymentSection />
        <div className="hidden md:block border-b-2 border-gray-300 mb-2 md:clear-both -ml-16"></div>
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
