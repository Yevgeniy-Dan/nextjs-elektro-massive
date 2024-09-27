import { Category } from "@/types/menu";
import React, { useEffect, useState, useRef } from "react";
import SubcategoryGrid from "./SubcategoryGrid";

interface CategoryProps {
  category: Category;
  index: number;
  openSubmenu: number | null;
  toggleMenu: (e: React.MouseEvent) => void;
}

const CategorySubmenu: React.FC<CategoryProps> = ({
  category,
  index,
  openSubmenu,
  toggleMenu,
}) => {
  const [showDelayedSubmenu, setShowDelayedSubmenu] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (openSubmenu === index) {
      // Clear the timeout if the submenu is opened
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      setShowDelayedSubmenu(true);
    } else {
      // Set a timeout to hide the submenu after a delay when it's closed
      hideTimeoutRef.current = setTimeout(() => {
        setShowDelayedSubmenu(false);
      }, 300); // 1 second delay
    }

    // Cleanup timeout on component unmount or if openSubmenu changes
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [openSubmenu, index]);

  return (
    <>
      {/* Container for small screens */}
      <div
        className={`sm:hidden ${
          openSubmenu === index ? "block" : "hidden"
        } bg-gray-800 text-white w-full`}
      >
        <div className="max-w-screen-xl mx-auto px-4">
          <SubcategoryGrid category={category} toggleMenu={toggleMenu} />
        </div>
      </div>

      {/* Container for large screens */}
      <div
        className={`hidden sm:block absolute top-full left-0 sm:top-0 sm:left-full bg-gray-800 text-white rounded-r-2xl ${
          showDelayedSubmenu ? "block" : "hidden"
        }`}
      >
        <div className="w-screen max-w-screen-xl sm:w-auto sm:min-w-[500px] lg:min-w-[700px] xl:min-w-[900px]">
          <SubcategoryGrid category={category} toggleMenu={toggleMenu} />
        </div>
      </div>
    </>
  );
};

export default CategorySubmenu;
