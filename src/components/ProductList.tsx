"use client";

import React from "react";
import Image from "next/image";
import { ProductItem } from "../../lib/api";

const ProductList: React.FC<{ items: ProductItem[] }> = ({ items }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Наші товари</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="relative h-64">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.photo.data[0].attributes.url}`}
                alt={item.attributes.photo.data[0].attributes.alternativeText}
                layout="fill"
                objectFit="cover"
                className="transition-opacity duration-300 hover:opacity-80"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 truncate">
                {item.attributes.name}
              </h2>
              <p className="text-gray-600 mb-4">{item.attributes.price} грн.</p>
              <button className="w-full bg-red-700 text-white py-2 rounded-md transition-colors duration-300 hover:bg-red-800">
                У кошик
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
