import Image from "next/image";
import React from "react";

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

        <div className="flex lg:hidden relative mt-10 -mx-8 sm:-mx-10  md:-mx-12 h-64">
          <p className="flex items-center bg-gray-200 text-gray-950 font-semibold  text-base sm:text-lg text-justify max-w-prose mx-auto w-2/5  p-6 overflow-hidden break-words">
            Освітлення – це не лише функціональність, але й важливий елемент
            декору, що змінює атмосферу.
          </p>
          <div className="relative w-3/5 -my-2 rounded-xl">
            <Image
              src="/filament-bulbs.jpg"
              alt="Image 1"
              fill
              className=" lg:hidden object-cover rounded-xl"
            />
          </div>
        </div>
        <p className="hidden lg:block text-gray-700 text-base sm:text-lg text-justify max-w-prose mx-auto mt-4">
          Якісні будівельні матеріали гарантують міцність і довговічність,
          дозволяючи реалізувати будь-які дизайнерські рішення.
        </p>

        <div className="flex lg:hidden relative mt-10 -mx-8 sm:-mx-10  md:-mx-12 h-64">
          <div className="relative w-3/5 -my-2 rounded-xl">
            <Image
              src="/build-tools.png"
              alt="Image 1"
              fill
              className=" lg:hidden object-cover rounded-xl"
            />
          </div>
          <p className="flex items-center bg-gray-200 text-gray-950 font-semibold  text-base sm:text-lg text-justify max-w-prose mx-auto w-2/5  p-6 overflow-hidden break-words">
            Якісні будівельні матеріали гарантують міцність і довговічність,
            дозволяючи реалізувати будь-які дизайнерські рішення.
          </p>
        </div>

        <p className="hidden lg:block text-gray-700 text-base sm:text-lg text-justify max-w-prose mx-auto mt-4">
          Сучасна сантехніка поєднує зручність і стиль, додаючи вишуканості
          ванній кімнаті.
        </p>

        <div className="flex lg:hidden relative mt-10 -mx-8 sm:-mx-10  md:-mx-12 h-64 mb-12">
          <p className="flex items-center bg-gray-200 text-gray-950 font-semibold  text-base sm:text-lg text-justify max-w-prose mx-auto w-2/5  p-6 overflow-hidden break-words">
            Сучасна сантехніка поєднує зручність і стиль, додаючи вишуканості
            ванній кімнаті.
          </p>
          <div className="relative w-3/5 -my-2 rounded-xl">
            <Image
              src="/faucet.png"
              alt="Image 1"
              fill
              className=" lg:hidden object-cover rounded-xl"
            />
          </div>
        </div>

        <p className="text-gray-700 text-base sm:text-lg text-justify max-w-prose mx-auto mt-4">
          Ці три аспекти є основою для створення гармонійного, комфортного і
          стильного простору.
        </p>
      </div>
      <div className="hidden lg:block relative w-full lg:w-2/4 h-64 sm:h-80 md:h-96 lg:h-[300px] xl:h-[400px] mx-auto mb-20 md:mb-28 lg:mb-0">
        <Image
          src="/filament-bulbs.jpg"
          alt="Image 1"
          fill
          className="rounded-lg object-contain"
        />
        <div className="absolute w-1/2 h-3/4 bottom-[-50%] left-[5%] z-10">
          <Image
            src="/build-tools.png"
            alt="Image 2"
            fill
            className="rounded-lg object-contain"
          />
        </div>
        <div className="absolute w-1/2 h-1/2 left-[65%] top-[115%] transform -translate-x-1/2 -translate-y-1/2 z-20">
          <Image
            src="/faucet.png"
            alt="Image 3"
            fill
            className="rounded-lg object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
