type PaginationProps = {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
};

function PaginationServerComponent({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-2 mt-8 mb-4">
      {Array.from({ length: totalPages }).map((_, i) => (
        <a
          key={i}
          href={`${baseUrl}?page=${i + 1}`}
          className={`px-4 py-2 rounded ${
            currentPage === i + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {i + 1}
        </a>
      ))}
    </div>
  );
}

export default PaginationServerComponent;
