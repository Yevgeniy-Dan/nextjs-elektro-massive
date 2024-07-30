import Image from "next/image";
import React from "react";

const companyLinks = [
  { href: "/services", title: "Послуги" },
  { href: "/shop", title: "Інтернет-магазин" },
  { href: "/about", title: "Про нас" },
  { href: "/partnership", title: "Співпраця" },
  { href: "/where-to-buy", title: "Де купити" },
  { href: "/support", title: "Підтримка" },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-elektro-massive text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
          <div className="mb-6 sm:mb-0 mx-auto sm:m-0">
            <Image
              src="/logo.png"
              alt="Elektro Massive Logo"
              width={150}
              height={50}
              className="mb-4"
            />
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
          <div className="flex flex-col ">
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 lg:grid lg:grid-cols-2  xl:flex lg:flex-nowrap  mb-4">
              <a
                href="#"
                className="text-white hover:text-gray-300 hover:opacity-75 transition-opacity mr-4"
              >
                <Image
                  className="w-10 h-10"
                  src="/telegram.png"
                  alt="Telegram icon"
                  width={48}
                  height={48}
                />
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300  hover:opacity-75 transition-opacity mr-4"
              >
                <Image
                  className="w-10 h-10"
                  src="/viber.png"
                  alt="Viber icon"
                  width={48}
                  height={48}
                />
              </a>

              <a
                href="#"
                className="text-white hover:text-gray-300  hover:opacity-75 transition-opacity mr-4"
              >
                <Image
                  className="w-10 h-10"
                  src="/tiktok.png"
                  alt="TikTok icon"
                  width={48}
                  height={48}
                />
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300  hover:opacity-75 transition-opacity mr-4"
              >
                <Image
                  className="w-10 h-10"
                  src="/instagram.png"
                  alt="Instagram icon"
                  width={48}
                  height={48}
                />
              </a>
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
