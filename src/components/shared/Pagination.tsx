import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...");
    }

    if (totalPages > 1 && !rangeWithDots.includes(totalPages)) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <nav className="flex flex-wrap justify-center items-center gap-2 my-4">
      <div className="flex flex-wrap justify-center items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className={`px-3 py-1 border rounded ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
          disabled={currentPage === 1}
        >
          «
        </button>
        {getPageNumbers().map((number, index) => (
          <React.Fragment key={index}>
            {number === "..." ? (
              <span className="px-3 py-1">...</span>
            ) : (
              <button
                key={number}
                onClick={() => onPageChange(number as number)}
                className={`px-3 py-1 border rounded ${
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {number}
              </button>
            )}
          </React.Fragment>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className={`px-3 py-1 border rounded ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
