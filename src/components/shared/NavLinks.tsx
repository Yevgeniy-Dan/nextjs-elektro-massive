import Link from "next/link";

const NavLinks = () => {
  return (
    <div className="hidden md:flex flex-wrap justify-center items-center text-white gap-2 sm:gap-4 mb-4 lg:mb-0">
      <Link
        href={"/services"}
        className="border border-white px-2 py-2 transition-all duration-300 hover:bg-[#b30000] hover:text-white hover:border-[#b30000] hover:shadow-[0_0_10px_rgba(179,0,0,0.7)]"
      >
        Послуги
      </Link>
      <Link
        href={"/about"}
        className="border border-white px-2 py-2 transition-all duration-300 hover:bg-[#b30000] hover:text-white hover:border-[#b30000] hover:shadow-[0_0_10px_rgba(179,0,0,0.7)]"
      >
        Про нас
      </Link>
      <Link
        href={"/partnership"}
        className="border border-white px-2 py-2 transition-all duration-300 hover:bg-[#b30000] hover:text-white hover:border-[#b30000] hover:shadow-[0_0_10px_rgba(179,0,0,0.7)]"
      >
        Співпраця
      </Link>
      <Link
        href={"/payment-and-delivery"}
        className="border border-white px-2 py-2 transition-all duration-300 hover:bg-[#b30000] hover:text-white hover:border-[#b30000] hover:shadow-[0_0_10px_rgba(179,0,0,0.7)]"
      >
        Оплата та доставка
      </Link>
    </div>
  );
};

export default NavLinks;
