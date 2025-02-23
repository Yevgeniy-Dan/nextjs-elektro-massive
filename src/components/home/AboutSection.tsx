"use client";

import React from "react";
import { AWS_CDN_URL } from "@/app/utils/constants";
import ImageWithLoader from "../shared/ImageWithLoader";

const AboutSection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start my-10 pb-0  xl:pb-32 ">
      <div className="w-full lg:w-2/4 p-4 lg:mx-9 mb-8 lg:mb-0 relative">
        <p className="text-gray-700 text-base sm:text-lg text-justify max-w-prose mx-auto">
          Якість електротоварів, сантехніки та будівельних матеріалів відіграє
          ключову роль у створенні ідеального простору у будь-якому приміщенні.
          Правильне освітлення, надійна сантехніка та високоякісні будівельні
          матеріали забезпечують комфорт, безпеку та естетичну привабливість.
        </p>

        <p className="hidden lg:block text-gray-700 font-normal text-base sm:text-lg text-justify max-w-prose mx-auto mt-4 ">
          Освітлення – це не лише функціональність, але й важливий елемент
          декору, що змінює атмосферу.
        </p>

        <div className="flex lg:hidden relative mt-10 -mx-8 sm:-mx-10 md:-mx-12 h-80 sm:h-64">
          <p className="flex items-center bg-gray-200 text-gray-950 font-semibold  text-base sm:text-lg text-justify max-w-prose mx-auto w-3/5 px-4 sm:px-8 overflow-hidden ">
            Освітлення – це не лише функціональність, але й важливий елемент
            декору, що змінює атмосферу.
          </p>
          <div className="relative w-2/5 -my-2 rounded-xl">
            <ImageWithLoader
              loading="lazy"
              src={`${AWS_CDN_URL}/shared/main_page_1.jpg`}
              alt="Image 1"
              fill
              sizes="(max-width: 640px) 40vw, (max-width: 1024px) 40vw"
              className=" lg:hidden object-cover rounded-xl"
            />
          </div>
        </div>

        <p className="hidden lg:block text-gray-700 text-base sm:text-lg text-justify max-w-prose mx-auto mt-4">
          Якісні будівельні матеріали гарантують міцність і довговічність,
          дозволяючи реалізувати будь-які дизайнерські рішення.
        </p>

        <div className="flex lg:hidden relative mt-10 -mx-8 sm:-mx-10  md:-mx-12 h-80 sm:h-64">
          <div className="relative w-2/5 -my-2 rounded-xl">
            <ImageWithLoader
              loading="lazy"
              src={`${AWS_CDN_URL}/shared/main_page_2.jpg`}
              alt="Image 1"
              fill
              sizes="(max-width: 1024px) 40vw"
              className=" lg:hidden object-cover rounded-xl"
            />
          </div>
          <p className="flex items-center bg-gray-200 text-gray-950 font-semibold  text-base sm:text-lg text-justify max-w-prose mx-auto w-3/5 px-5 sm:px-12 overflow-hidden break-words">
            Якісні будівельні матеріали гарантують міцність і довговічність,
            дозволяючи реалізувати будь-які дизайнерські рішення.
          </p>
        </div>

        <p className="hidden lg:block text-gray-700 text-base sm:text-lg text-justify max-w-prose mx-auto mt-4">
          Сучасна сантехніка поєднує зручність і стиль, додаючи вишуканості
          ванній кімнаті.
        </p>

        <div className="flex lg:hidden relative mt-10 -mx-8 sm:-mx-10  md:-mx-12 h-80 sm:h-64 mb-12">
          <p className="flex items-center bg-gray-200 text-gray-950 font-semibold  text-base sm:text-lg text-justify max-w-prose mx-auto w-3/5 px-5 sm:px-12 overflow-hidden break-words">
            Сучасна сантехніка поєднує зручність і стиль, додаючи вишуканості
            ванній кімнаті.
          </p>
          <div className="relative w-2/5 -my-2 rounded-xl">
            <ImageWithLoader
              loading="lazy"
              src={`${AWS_CDN_URL}/shared/main_page_3.png`}
              alt="Image 1"
              fill
              sizes="(max-width: 1024px) 40vw"
              className=" lg:hidden object-cover rounded-xl"
            />
          </div>
        </div>

        <p className="text-gray-700 text-base sm:text-lg text-justify max-w-prose mx-auto mt-4">
          Ці три аспекти є основою для створення гармонійного, комфортного і
          стильного простору.
        </p>
      </div>
      <div className="hidden lg:block relative w-full lg:w-2/4 h-64 sm:h-80 md:h-96 lg:h-[300px] xl:h-[350px] mx-auto mb-20 md:mb-28 lg:mb-0 lg:mt-10">
        <div className="rounded-lg overflow-hidden absolute inset-0">
          <ImageWithLoader
            loading="lazy"
            src={`${AWS_CDN_URL}/shared/main_page_1.png`}
            alt="Image 1"
            fill
            sizes="(min-width: 1024px) 50vw"
            className="object-cover"
          />
        </div>
        <div className="absolute w-1/3 h-full bottom-[-70%] left-[10%] z-10 rounded-lg overflow-hidden">
          <ImageWithLoader
            loading="lazy"
            src={`${AWS_CDN_URL}/shared/main_page_2.png`}
            alt="Image 2"
            fill
            sizes="(min-width: 1024px) 33vw"
            className="object-cover"
          />
        </div>
        <div className="absolute w-1/2 h-1/2 left-[65%] top-[115%] transform -translate-x-1/2 -translate-y-1/2 z-20 rounded-lg overflow-hidden">
          <ImageWithLoader
            loading="lazy"
            src={`${AWS_CDN_URL}/shared/main_page_3.png`}
            alt="Image 3"
            fill
            sizes="(min-width: 1024px) 25vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
