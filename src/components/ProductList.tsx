"use client";

import React from "react";
import Image from "next/image";
import { ProductItem } from "../../lib/api";

const ProductList: React.FC<{ items: ProductItem[] }> = ({ items }) => {
  return (
    <div>
      <h1>Product List</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-gray-300 rounded-lg overflow-hidden"
          >
            <Image
              src={`http://localhost:1337/`}
              alt={item.attributes.name}
              className="w-full h-[200px] object-cover"
              width={200}
              height={200}
            />
            <p className="p-2 text-center">{item.attributes.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
