import { Category, Subcategory } from "@/types/menu";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SubcategoryGridProps {
  category: Category;
  toggleMenu: (e: React.MouseEvent) => void;
}

const SubcategoryGrid: React.FC<SubcategoryGridProps> = ({
  category,
  toggleMenu,
}) => {
  const subcategories = category?.attributes?.subcategories?.data ?? [];

  const getGridCols = (count: number): string => {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    if (count === 3) return "grid-cols-3";
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  };

  const gridCols = getGridCols(subcategories.length);

  const renderSubcategory = (subcategory: Subcategory) => {
    const isImage = subcategory.attributes?.icon?.data;

    return (
      <Link
        href={`/${subcategory.attributes?.slug}`}
        onClick={(e) => toggleMenu(e)}
        key={subcategory.id}
        className="flex flex-row items-center space-x-4 p-6 hover:text-gray-700 hover:bg-white w-full"
      >
        <div className="flex-shrink-0 w-20 h-20">
          <Image
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
      </Link>
    );
  };

  return (
    <div className={`grid ${gridCols} gap-4`}>
      {subcategories.map(renderSubcategory)}
    </div>
  );
};

export default SubcategoryGrid;
