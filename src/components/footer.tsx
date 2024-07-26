import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-elektro-massive text-white py-8 ">
      <div className="container mx-auto grid grid-cols-4 gap-8">
        <div>
          <img src="logo.png" alt="Elektro Massive Logo" className="mb-4" />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold mb-2">Компанія</h3>
          <a href="/services" className="block font-light">
            Послуги
          </a>
          <a href="/shop" className="block font-light">
            Інтернет-магазин
          </a>
          <a href="/about" className="block font-light">
            Про нас
          </a>
          <a href="/partnership" className="block font-light">
            Співпраця
          </a>
          <a href="/where-to-buy" className="block font-light">
            Де купити
          </a>
          <a href="/support" className="block font-light">
            Підтримка
          </a>
        </div>
        <div>
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
        <div className="flex flex-col">
          <div className="flex space-x-4 mb-4">
            <a href="#" className="text-white hover:text-gray-300">
              <Image
                className="w-12 h-12"
                src="/telegram.png"
                alt="Telegram icon"
                width={48}
                height={48}
              />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <Image
                className="w-12 h-12"
                src="/viber.png"
                alt="Viber icon"
                width={48}
                height={48}
              />
            </a>

            <a href="#" className="text-white hover:text-gray-300">
              <Image
                className="w-12 h-12"
                src="/tiktok.png"
                alt="TikTok icon"
                width={48}
                height={48}
              />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <Image
                className="w-12 h-12"
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
      <div className="container mx-auto mt-28">
        <p className="text-center text-sm">
          &copy; ELEKTRO MASSIVE, 2017-2024. Усі права захищені.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
