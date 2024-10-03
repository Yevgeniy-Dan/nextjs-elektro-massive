import Link from "next/link";

const NavLinks = () => {
  return (
    <div className="hidden md:flex flex-wrap justify-center items-center text-white gap-2 sm:gap-4 mb-4 lg:mb-0">
      <Link
        href={"/services"}
        className="border border-white px-2 py-2 hover:bg-gray-800 hover:border-gray-300 transition-all duration-300"
      >
        Послуги
      </Link>
      <Link
        href={"/about"}
        className="border border-white px-2 py-2 hover:bg-gray-800 hover:border-gray-300 transition-all duration-300"
      >
        Про нас
      </Link>
      <Link
        href={"/partnership"}
        className="border border-white px-2 py-2 hover:bg-gray-800 hover:border-gray-300 transition-all duration-300"
      >
        Співпраця
      </Link>
      <Link
        href={"/payment-and-delivery"}
        className="border border-white px-2 py-2 hover:bg-gray-800 hover:border-gray-300 transition-all duration-300"
      >
        Оплата та доставка
      </Link>
      <Link
        href={"/reviews"}
        className="border border-white px-2 py-2 hover:bg-gray-800 hover:border-gray-300 transition-all duration-300"
      >
        Відгуки
      </Link>
    </div>
  );
};

export default NavLinks;
