import { Category } from "@/types/menu";
import React, { useEffect, useState, useRef } from "react";
import SubcategoryGrid from "./SubcategoryGrid";
import useOutsideClick from "@/hooks/useOutsideClick";

interface CategoryProps {
  category: Category;
  isOpen: boolean;
  toggleMenu: (e: React.MouseEvent) => void;
  toggleCategory: (e: React.MouseEvent) => void;
}

const CategorySubmenu: React.FC<CategoryProps> = ({
  category,
  isOpen,
  toggleCategory,
  toggleMenu,
}) => {
  return (
    <div>
      {/* Container for small screens */}
      <div
        className={`sm:hidden ${
          isOpen ? "block" : "hidden"
        } bg-gray-800 text-white w-full`}
      >
        <div className="max-w-screen-xl mx-auto px-4">
          <SubcategoryGrid
            category={category}
            toggleCategory={toggleCategory}
          />
        </div>
      </div>

      {/* Container for large screens */}
      <div
        className={`hidden sm:block absolute top-0 left-full bg-gray-800 text-white rounded-r-2xl ${isOpen ? "" : "invisible"}`}
      >
        <div className="w-screen max-w-screen-xl sm:w-auto sm:min-w-[500px] lg:min-w-[700px] xl:min-w-[900px]">
          <SubcategoryGrid category={category} toggleCategory={toggleMenu} />
        </div>
      </div>
    </div>
  );
};

export default CategorySubmenu;
