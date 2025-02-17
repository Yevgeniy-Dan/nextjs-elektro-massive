import React from "react";

import { SubcategoryData } from "@/types/types";
import Image from "next/image";
import Breadcrumbs from "../shared/Breadcrumbs";
import LocalizedLink from "../shared/LocalizedLink";

interface CategoryListingClientProps {
  categoryId: string;
  categorySlug: string;
  categoryTitle: string;
  lng: string;
  subcategories: SubcategoryData[];
  isLoading?: boolean;
}

const PlaceHolderCard = () => (
  <div className="flex flex-col items-center px-2">
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full md:rounded-lg overflow-hidden bg-gray-200 animate-pulse"></div>
      <div className="static transform-none w-[50%] ">
        <div className="md:hidden h-6 bg-gray-200 animate-pulse mt-2"></div>
      </div>
    </div>
  </div>
);

const CategoryListingClient: React.FC<CategoryListingClientProps> = ({
  categorySlug,
  categoryTitle,
  lng,
  subcategories,
  isLoading = false,
}) => {
  const customLabels: Record<string, string> = {
    [categorySlug]: categoryTitle,
  };

  const placeholders = Array(9)
    .fill(null)
    .map((_, index) => <PlaceHolderCard key={`placehodler-${index}`} />);

  if (isLoading) {
    return (
      <div className="text-white my-10">
        <div className="-ml-4 sm:-ml-8 md:-ml-12 lg:-ml-16 xl:ml-0 mb-10">
          <h2 className="bg-gradient-elektro-massive-horizontal text-white font-bold mb-2 pl-4 sm:pl-12 pr-28 py-5 rounded-r-3xl xl:rounded-full text-xl uppercase tracking-wide">
            {categoryTitle}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
          {placeholders}
        </div>
      </div>
    );
  }

  if (subcategories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No subcategories found</p>
      </div>
    );
  }

  return (
    <div className="text-white my-10">
      <Breadcrumbs customLabels={customLabels} />
      <div className="-ml-4 sm:-ml-8 md:-ml-12 lg:-ml-16 xl:ml-0 mb-10">
        <h1 className="bg-gradient-elektro-massive-horizontal text-white font-bold mb-2 pl-4 sm:pl-12 pr-28 py-5 rounded-r-3xl xl:rounded-full text-xl uppercase tracking-wide">
          {categoryTitle}
        </h1>
      </div>

      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {subcategories.map((subcategory) => {
          if (!subcategory.id || !subcategory.attributes) return null;

          const { title, slug: subcategorySlug, icon } = subcategory.attributes;
          const iconUrl = icon?.data?.attributes?.url;

          return (
            <LocalizedLink
              lng={lng}
              key={subcategory.id}
              href={`/${categorySlug}/${subcategorySlug}`}
              onClick={() => {
                window.gtag("event", "navigation", {
                  event_category: "Navigation",
                  event_action: "Subcategory Click",
                  event_label: subcategory.attributes?.title,
                  page_path: `/${categorySlug}/${subcategorySlug}`,
                });
              }}
              className="block transition-transform hover:scale-105 cursor-pointer"
            >
              <div className="flex flex-col items-center px-2">
                <div className="relative flex flex-col items-center justify-center">
                  <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full md:rounded-lg overflow-hidden">
                    {iconUrl && (
                      <Image
                        src={process.env.NEXT_PUBLIC_STRAPI_URL + iconUrl}
                        alt={title || "Category"}
                        fill
                        sizes="(max-width: 224px) 100vw, 224px"
                        className="object-cover"
                        priority
                      />
                    )}
                  </div>
                  <div className="md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-y-1/2 md:-translate-x-1/2 static transform-none w-full md:w-[70%] text-center">
                    <p className="text-black md:text-white md:[text-shadow:1px_1px_0px_#000,-1px_1px_0px_#000,1px_-1px_0px_#000,-1px_-1px_0px_#000] text-base md:text-lg font-semibold mt-2 break-words">
                      {title || "Unnamed Category"}
                    </p>
                  </div>
                </div>
              </div>
            </LocalizedLink>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryListingClient;
