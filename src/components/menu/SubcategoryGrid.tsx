import { Category, Subcategory } from "@/types/menu";
import React from "react";
import LocalizedLink from "../shared/LocalizedLink";
import OptimizedImage from "../shared/OptimizedImage";

interface SubcategoryGridProps {
  lng: string;
  category: Category;
  toggleCategory: (e: React.MouseEvent) => void;
}

const SubcategoryGrid: React.FC<SubcategoryGridProps> = ({
  lng,
  category,
  toggleCategory,
}) => {
  const subcategories = category?.attributes?.subcategories?.data ?? [];

  const getGridCols = (count: number): string => {
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  };

  const gridCols = getGridCols(subcategories.length);

  const renderSubcategory = (subcategory: Subcategory) => {
    const isImage = subcategory.attributes?.icon?.data;

    return (
      <LocalizedLink
        lng={lng}
        href={`/${category.attributes?.slug}/${subcategory.attributes?.slug}`}
        onClick={(e) => {
          if (
            typeof window !== "undefined" &&
            typeof window.gtag === "function"
          ) {
            window.gtag("event", "navigation", {
              event_category: "Navigation",
              event_action: "Subcategory Click",
              event_label: subcategory.attributes?.title,
              page_path: `/${category.attributes?.slug}/${subcategory.attributes?.slug}`,
            });
          }
          toggleCategory(e);
        }}
        key={subcategory.id}
        className="flex flex-row items-center space-x-4 p-6 hover:text-gray-700 hover:bg-white w-full"
      >
        <div className="flex-shrink-0 w-20 h-20">
          <OptimizedImage
            src={`${
              isImage
                ? process.env.NEXT_PUBLIC_STRAPI_URL + isImage.attributes?.url
                : "https://via.placeholder.com/48x48"
            }`}
            alt={subcategory.attributes?.title ?? ""}
            width={80}
            height={80}
            className="rounded-sm object-cover"
          />
        </div>
        <span className="flex-grow text-lg font-medium line-clamp-3 overflow-ellipsis break-words">
          {subcategory.attributes?.title}
        </span>
      </LocalizedLink>
    );
  };

  return (
    <div className={`grid ${gridCols} gap-4`}>
      {subcategories.map(renderSubcategory)}
    </div>
  );
};

export default SubcategoryGrid;
