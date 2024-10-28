import React from "react";

const CategoryGridPlaceholder = () => {
  const SubcategoryPlaceholder = () => (
    <div className="flex flex-col items-center px-2 min-w-[160px] md:min-w-[224px] mx-4">
      <div className="relative flex flex-col items-center justify-center">
        <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full md:rounded-lg overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
        </div>
        <div className="w-32 h-6 mt-2 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded" />
      </div>
    </div>
  );

  const CategorySection = () => (
    <div className="my-10">
      <div className="-ml-4 sm:-ml-8 md:-ml-12 lg:-ml-16 xl:ml-0 mb-10">
        <div className="bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse h-16 w-2/3 rounded-r-3xl xl:rounded-full" />
      </div>
      <div className="relative">
        <div className="embla overflow-hidden">
          <div className="embla__container flex">
            {Array(6)
              .fill(null)
              .map((_, idx) => (
                <SubcategoryPlaceholder
                  key={`subcategory-placeholder-${idx}`}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="text-white">
      {Array(3)
        .fill(null)
        .map((_, idx) => (
          <CategorySection key={`category-section-placeholder-${idx}`} />
        ))}
    </div>
  );
};

export default CategoryGridPlaceholder;
