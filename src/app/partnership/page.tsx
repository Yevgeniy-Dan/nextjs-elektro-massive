import Image from "next/image";
import React from "react";

const PartnershipPage = () => {
  return (
    <div className="py-5">
      <p className="text-sm font-bold">Головна/Співпраця</p>
      <div className="bg-gradient-elektro-massive-vertical text-white  py-10 px-6   my-4 space-y-4 rounded-none  -mx-4 sm:-ml-10 md:-ml-16 lg:ml-0 ">
        <p className="text-lg md:text-xl lg:text-2xl">Співпраця</p>

        <p className="text-base md:text-lg lg:text-xl">
          Ми активно розвиваємо нашу партнерську мережу, пропонуючи унікальні
          переваги та спеціальні пропозиції для всіх категорій партнерів. З нами
          ви зможете будувати довгострокові та вигідні відносини на основі
          довіри та безпеки.
        </p>
        <p className="text-base md:text-lg lg:text-xl">
          Співпрацюючи з нами, ви отримуєте доступ до високоякісних будівельних
          матеріалів, сучасних електротоварів та надійної сантехніки. Ми
          забезпечуємо стабільний дохід і надаємо надійну продукцію від
        </p>
      </div>
      <div className="">
        <div className="py-6">
          <h2 className="text-2xl font-bold mb-4">Наші переваги</h2>
          <div className=" max-w-4xl space-y-5">
            <div className="space-y-4">
              <div className="flex items-center space-x-6">
                <Image
                  src="/great-quality.png"
                  alt={`great-quality Icon`}
                  className="h-16 w-16 mx-auto "
                  width={64}
                  height={64}
                />
                <p className="flex-1 text-base md:text-lg lg:text-xl text-justify ">
                  <span className="font-bold">Висока якість продукції -</span>{" "}
                  Ми працюємо тільки з перевіреними та надійними виробниками.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-6">
                <Image
                  src="/wide-range.png"
                  alt={`wide-range Icon`}
                  className="h-16 w-16 mx-auto "
                  width={64}
                  height={64}
                />
                <p className="flex-1 text-base md:text-lg lg:text-xl text-justify ">
                  <span className="font-bold">Широкий асортимент -</span> У нас
                  ви знайдете все необхідне для будівництва, електрики та
                  світлотехніки.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-6">
                <Image
                  src="/certified-products.png"
                  alt={`certified-products Icon`}
                  className="h-16 w-16 mx-auto "
                  width={64}
                  height={64}
                />
                <p className="flex-1 text-base md:text-lg lg:text-xl text-justify ">
                  <span className="font-bold">Сертифіковані товари -</span> Вся
                  продукція відповідає строгим нормам якості та безпеки.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-6">
                <Image
                  src="/innovative-solutions.png"
                  alt={`innovative-solutions Icon`}
                  className="h-16 w-16 mx-auto "
                  width={64}
                  height={64}
                />
                <p className="flex-1 text-base md:text-lg lg:text-xl text-justify ">
                  <span className="font-bold">Інноваційні рішення -</span> Ми
                  пропонуємо найсучасніші та найефективніші товари на ринку.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-6">
                <Image
                  src="/reliable-partnership.png"
                  alt={`reliable-partnership Icon`}
                  className="h-16 w-16 mx-auto "
                  width={64}
                  height={64}
                />
                <p className="flex-1 text-base md:text-lg lg:text-xl text-justify ">
                  <span className="font-bold">Надійне партнерство -</span> Ми
                  цінуємо довгострокові відносини та завжди готові підтримати
                  наших клієнтів.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6">
          <h2 className="text-2xl font-bold mb-8">Умови співпраці</h2>

          <div className="max-w-4xl space-y-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-12">
                <div className="relative w-1/3 h-36 md:h-48">
                  <div className="absolute -top-4 -right-4 w-full h-full bg-purple-600 -z-10 rounded-lg"></div>
                  <Image
                    src="/trade-organizations.jpeg"
                    alt={`trade-organizations Icon`}
                    className="h-64 w-64 mx-auto rounded-lg"
                    fill
                    objectFit="cover"
                  />
                </div>
                <div className="w-2/3">
                  <p className="text-base md:text-lg lg:text-xl">
                    <span className="font-bold">Торговим організаціям</span> –
                    Ми пропонуємо всебічну підтримку: надання торгового
                    обладнання, повний маркетинговий супровід та всі необхідні
                    дані для розміщення нашої продукції на вашому сайті.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-12">
                <div className="relative w-1/3 h-36 md:h-48">
                  <div className="absolute -top-4 -right-4 w-full h-full bg-purple-600 -z-10 rounded-lg"></div>
                  <Image
                    src="/business-owner.jpg"
                    alt={`business-owner Icon`}
                    className="h-64 w-64 mx-auto rounded-lg"
                    fill
                    objectFit="cover"
                  />
                </div>

                <div className="w-2/3">
                  <p className="text-base md:text-lg lg:text-xl">
                    <span className="font-bold">Власникам бізнесу</span> –
                    (готелі, ресторани, виробничі або житлових об&apos;єкти,
                    магазини чи торгових центрів) - ми надаємо сучасні рішення
                    для освітлення за привабливими цінами. Наша продукція
                    відрізняється високою якістю та енергоефективністю.
                  </p>
                </div>
              </div>
            </div>

            <div className="max-4-xl space-y-4">
              <div className="flex items-center space-x-12">
                <div className="relative w-1/3 h-36 md:h-48">
                  <div className="absolute -top-4 -right-4 w-full h-full bg-purple-600 -z-10 rounded-lg"></div>
                  <Image
                    src="/designers-and-design-bureaus.jpg"
                    alt={`designers-and-design-bureaus Icon`}
                    className="h-64 w-64 mx-auto rounded-lg"
                    fill
                    objectFit="cover"
                  />
                </div>

                <div className="w-2/3">
                  <p className="text-base md:text-lg lg:text-xl">
                    <span className="font-bold">
                      Дизайнерам та проектним організаціям
                    </span>{" "}
                    Ми надаємо повну технічну документацію та організовуємо
                    персоналізовані презентації у вигідному для вас форматі.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnershipPage;
