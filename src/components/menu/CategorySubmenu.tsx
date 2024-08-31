import { Category } from "@/types/menu";
import React from "react";
import SubcategoryGrid from "./SubcategoryGrid";

interface CategoryProps {
  category: Category;
  index: number;
  openSubmenu: number | null;
}

const CategorySubmenu: React.FC<CategoryProps> = ({
  category,
  index,
  openSubmenu,
}) => {
  return (
    <>
      {/* Container for small screens */}
      <div
        className={`sm:hidden ${
          openSubmenu === index ? "block" : "hidden"
        } bg-gray-800 text-white w-full`}
      >
        <div className="max-w-screen-xl mx-auto px-4">
          <SubcategoryGrid category={category} />
        </div>
      </div>

      {/* Container for large screens */}
      <div className="hidden sm:group-hover:block absolute top-full left-0 sm:top-0 sm:left-full  bg-gray-800 text-white   rounded-r-2xl">
        <div className="w-screen max-w-screen-xl sm:w-auto sm:min-w-[500px] lg:min-w-[700px] xl:min-w-[900px]">
          <SubcategoryGrid category={category} />
        </div>
      </div>
    </>
  );
};

export default CategorySubmenu;
