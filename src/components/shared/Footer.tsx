import Image from "next/image";
import Link from "next/link";
import React from "react";

const companyLinks = [
  { href: "/services", title: "Послуги" },
  { href: "/shop", title: "Інтернет-магазин" },
  { href: "/about", title: "Про нас" },
  { href: "/partnership", title: "Співпраця" },
  { href: "/where-to-buy", title: "Де купити" },
  { href: "/support", title: "Підтримка" },
];

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  return (
    <footer
      className={`bg-gradient-elektro-massive-horizontal text-white py-8 ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          <div className="relative  mb-6 sm:mb-0 mx-auto sm:m-0">
            <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 z-10">
              <Image
                src="/logo.png"
                alt="Elektro Massive Logo"
                fill
                className="mb-4"
              />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold mb-3">Компанія</h3>
            {companyLinks.map((item, index) => (
              <a key={index} href={`/${item.href}`} className="block mt-2">
                {item.title}
              </a>
            ))}
          </div>
          <div className="space-y-2">
            <h3 className="font-bold mb-2">Час роботи:</h3>
            <p className="font-light">Пн-сб с 8.00 до 18.00</p>
            <a href="/payment-and-delivery" className="block mb-2 mt-4">
              Оплата та доставка
            </a>
            <a href="/warranty" className="block mb-2 mt-4">
              Гарантії
            </a>
            <a href="/returns" className="block mb-2 mt-4">
              Повернення товару
            </a>
          </div>
          <div className="flex flex-col-reverse sm:flex-col">
            <div className="flex flex-wrap justify-center sm:justify-start items-center lg:grid lg:grid-cols-2  xl:flex lg:flex-nowrap   my-4">
              <Link
                href="https://t.me/YourTelegramUsername"
                className="text-white hover:text-gray-300 hover:opacity-75 transition-opacity mr-4"
              >
                <Image
                  className="w-10 h-10"
                  src="/telegram.png"
                  alt="Telegram icon"
                  width={48}
                  height={48}
                />
              </Link>
              <Link
                href="viber://chat?number=+YourViberNumber"
                className="text-white hover:text-gray-300  hover:opacity-75 transition-opacity mr-4"
              >
                <Image
                  className="w-10 h-10"
                  src="/viber.png"
                  alt="Viber icon"
                  width={48}
                  height={48}
                />
              </Link>

              <Link
                href="https://www.tiktok.com/@YourTikTokUsername"
                className="text-white hover:text-gray-300  hover:opacity-75 transition-opacity mr-4"
              >
                <Image
                  className="w-10 h-10"
                  src="/tiktok.png"
                  alt="TikTok icon"
                  width={48}
                  height={48}
                />
              </Link>
              <Link
                href="https://www.instagram.com/YourInstagramUsername"
                className="text-white hover:text-gray-300  hover:opacity-75 transition-opacity mr-4"
              >
                <Image
                  className="w-10 h-10"
                  src="/instagram.png"
                  alt="Instagram icon"
                  width={48}
                  height={48}
                />
              </Link>
            </div>
            <div className="space-y-1">
              <h3 className="font-bold mb-2 mt-4">Зв&#39;язатися з нами:</h3>
              <p className="font-light">Євген +380 (97) 63 23 159</p>
              <p className="font-light">Вероніка +380 (98) 039 28 53</p>
              <p className="font-light">Олександр +380 (68) 555 94 73</p>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-sm">
            &copy; ELEKTRO MASSIVE, 2017-2024. Усі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
