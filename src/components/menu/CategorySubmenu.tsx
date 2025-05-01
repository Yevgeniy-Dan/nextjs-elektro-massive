import { Category } from "@/types/menu";
import React from "react";
import SubcategoryGrid from "./SubcategoryGrid";

interface CategoryProps {
  category: Category;
  isOpen: boolean;
  position?: number;
  toggleMenu: (e: React.MouseEvent) => void;
  toggleCategory: (e: React.MouseEvent) => void;
  lng: string;
}

const CategorySubmenu: React.FC<CategoryProps> = ({
  category,
  isOpen,
  position = 0,
  toggleCategory,
  toggleMenu,
  lng,
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
            lng={lng}
          />
        </div>
      </div>

      {/* Container for large screens */}
      <div
        className={`hidden sm:block absolute left-full bg-gray-800 text-white rounded-r-2xl ${isOpen ? "" : "invisible"}`}
        style={{ top: `${position}px`, transition: "top 0.2s ease-out" }}
      >
        <div className="w-screen max-w-screen-xl sm:w-auto sm:min-w-[500px] lg:min-w-[700px] xl:min-w-[900px]">
          <SubcategoryGrid
            category={category}
            toggleCategory={toggleMenu}
            lng={lng}
          />
        </div>
      </div>
    </div>
  );
};

export default CategorySubmenu;
