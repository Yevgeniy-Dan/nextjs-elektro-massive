"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [desbouncedSearchTerm] = useDebounce(searchTerm, 300);
  const router = useRouter();
  useEffect(() => {
    if (desbouncedSearchTerm.trim()) {
      router.push(
        `/search?q=${encodeURIComponent(desbouncedSearchTerm.trim())}`
      );
    } else {
      router.push("/");
    }
  }, [desbouncedSearchTerm, router]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex-grow w-auto sm:w-3/4 lg:w-2/3 max-w-[730px]">
      <div className="flex items-center relative">
        <input
          type="text"
          className="bg-transparent border border-white text-white px-4 py-2 rounded-r-2xl focus:outline-none pr-14 w-full"
          placeholder="Пошук..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
          <div className="bg-transparent p-2 pr-4 rounded-r-full rounded-l-2xl">
            <Image
              src="/search.png"
              alt="Search icon"
              className="h-6 w-6 invert"
              width={32}
              height={32}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
