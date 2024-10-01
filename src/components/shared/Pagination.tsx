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
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center items-center space-x-2 my-4">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          «
        </button>
      )}
      <div className="hidden sm:flex space-x-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-1 border rounded ${
              currentPage === number
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
      <div className="sm:hidden">
        <span className="px-3 py-1 border rounded bg-gray-100">
          {currentPage} / {totalPages}
        </span>
      </div>
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          »
        </button>
      )}
    </nav>
  );
};

export default Pagination;
