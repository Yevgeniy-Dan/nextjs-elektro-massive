import Image from "next/image";
import React from "react";

const AboutPage = () => {
  return (
    <div className="py-5">
      <p className="text-sm font-bold">Головна/Про нас</p>
      <div>
        <h2 className="text-lg md:text-xl lg:text-2xl uppercase py-5">
          Про нас
        </h2>

        <p className="text-base md:text-lg lg:text-xl">
          ELEKTRO MASSIVE — ваш надійний партнер у світі електротехніки,
          будівельних матеріалів і сантехніки. З моменту нашого заснування у
          2017 році ми прагнемо забезпечити наших клієнтів продукцією та
          послугами найвищої якості, спираючись на сучасні технології та кращі
          традиції у галузі.
        </p>
      </div>
      <div className="flex flex-col items-start  my-10 pb-0  xl:pb-32 ">
        <div className="w-full  mb-8 relative">
          {/* ABOUT COMPANY */}
          <div className="flex justify-between  relative mt-10  h-auto ">
            <p className="flex flex-col items-center bg-gray-200 text-gray-950 font-thin  text-sm sm:text-lg text-justify max-w-prose  w-2/5  overflow-hidden rounded-2xl">
              <span className="block w-full text-center uppercase border border-b-8 border-b-white py-4 text-3xl font-semibold">
                Про компанію
              </span>
              <span className="px-16 py-5 sm:px-16">
                Ми розпочали свою діяльність у 2017 році як дистриб&apos;ютори
                електротехнічних товарів, прагнучи надати українському ринку
                тільки найкращу продукцію від перевірених виробників. Наша
                компанія швидко здобула репутацію надійного партнера завдяки
                увазі до деталей і якісному обслуговуванню. Всего через три
                роки, у 2020 році, ми відкрили великий спеціалізований магазин,
                що стало важливим етапом у розширенні нашого бізнесу та
                забезпеченні зручного сервісу для наших клієнтів.
              </span>
            </p>
            <div className="relative w-3/5 -my-2 rounded-xl object-contain">
              <Image
                src="/about/about_company.png"
                alt="Image 1"
                fill
                className=" object-contain rounded-xl"
              />
            </div>
          </div>

          {/* Development */}
          <div className="flex justify-between  relative mt-10  h-auto ">
            <div className="relative w-3/5 -my-2 rounded-xl">
              <Image
                src="/about/development.jpg"
                alt="Image 1"
                fill
                className=" object-cover rounded-xl"
              />
            </div>
            <p className="flex flex-col items-center bg-gray-200 text-gray-950 font-thin  text-sm sm:text-lg text-justify max-w-prose  w-2/5  overflow-hidden rounded-2xl">
              <span className="block w-full text-center uppercase border border-b-8 border-b-white py-4 text-3xl font-semibold">
                Розвиток
              </span>
              <span className="px-16 py-5 sm:px-16">
                З 2020 року наш бізнес продовжив зростати, і ми сформували
                команду досвідчених електриків та інженерів, які не тільки
                реалізують нашу продукцію, але й пропонують професійні послуги з
                проектування та монтажу електричних систем. У 2022 році ми
                зробили ще один важливий крок, відкривши новий магазин, що
                спеціалізується на будівельних матеріалах і сантехніці. Це
                дозволило нам розширити наш асортимент і запропонувати нашим
                клієнтам комплексні рішення для їх будівельних та ремонтних
                потреб.
              </span>
            </p>
          </div>

          {/* Achievments */}
          <div className="flex justify-between  relative mt-10  h-auto ">
            <p className="flex flex-col items-center bg-gray-200 text-gray-950 font-thin  text-sm sm:text-lg text-justify max-w-prose  w-2/5  overflow-hidden rounded-2xl">
              <span className="block w-full text-center uppercase border border-b-8 border-b-white py-4 text-3xl font-semibold">
                ДОСЯГНЕННЯ
              </span>
              <span className="px-16 py-5 sm:px-16">
                Сьогодні ELEKTRO MASSIVE пишається тим, що є одним з провідних
                дистриб&apos;юторів електротехнічних товарів в Україні. Ми
                пропонуємо широкий вибір продукції від найкращих виробників, а
                також надаємо професійні послуги з проектування, монтажу та
                обслуговування електричних систем. Наші магазини, розташовані в
                Ізмаїлі, що забезпечують нашим клієнтам зручний доступ до
                якісних матеріалів і обладнання.
              </span>
            </p>
            <div className="relative w-3/5 -my-2 rounded-xl">
              <Image
                src="/about/achievments.jpg"
                alt="Image 1"
                fill
                className=" object-cover rounded-xl"
              />
            </div>
          </div>

          {/* INNOVATIONS AND THE FUTURE */}
          <div className="flex justify-between  relative mt-10  h-auto ">
            <div className="relative w-3/5 -my-2 rounded-xl">
              <Image
                src="/about/innovations.jpg"
                alt="Image 1"
                fill
                className=" object-cover rounded-xl"
              />
            </div>
            <p className="flex flex-col items-center bg-gray-200 text-gray-950 font-thin  text-sm sm:text-lg text-justify max-w-prose  w-2/5  overflow-hidden rounded-2xl">
              <span className="block w-full text-center uppercase border border-b-8 border-b-white py-4 text-3xl font-semibold">
                ІННОВАЦІЇ ТА МАЙБУТНЄ
              </span>
              <span className="px-16 py-5 sm:px-16">
                Ми постійно працюємо над покращенням якості наших послуг та
                розширенням асортименту. Наша команда активно слідкує за новими
                тенденціями і технологіями, щоб запропонувати нашим клієнтам
                найсучасніші рішення. Ми пишаємося нашими досягненнями і
                продовжуємо розвивати наш бізнес, прагнучи стати лідером у сфері
                електротехніки і будівельних матеріалів в Україні.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
