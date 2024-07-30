import Image from "next/image";
import React from "react";

const AboutSection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start my-10 pb-16 lg:pb-32">
      <div className="w-full lg:w-2/4 p-4 lg:mx-9 mb-8 lg:mb-0">
        <p className="text-gray-700 text-base sm:text-lg text-justify max-w-prose mx-auto">
          Якість електротоварів, сантехніки та будівельних матеріалів відіграє
          ключову роль у створенні ідеального простору у будь-якому приміщенні.
          Правильне освітлення, надійна сантехніка та високоякісні будівельні
          матеріали забезпечують комфорт, безпеку та естетичну привабливість.
        </p>
        <p className="text-gray-700 text-base sm:text-lg text-justify max-w-prose mx-auto mt-4">
          Освітлення – це не лише функціональність, але й важливий елемент
          декору, що змінює атмосферу.
        </p>
        <p className="text-gray-700 text-base sm:text-lg text-justify max-w-prose mx-auto mt-4">
          Сучасна сантехніка поєднує зручність і стиль, додаючи вишуканості
          ванній кімнаті.
        </p>
        <p className="text-gray-700 text-base sm:text-lg text-justify max-w-prose mx-auto mt-4">
          Якісні будівельні матеріали гарантують міцність і довговічність,
          дозволяючи реалізувати будь-які дизайнерські рішення.
        </p>
        <p className="text-gray-700 text-base sm:text-lg text-justify max-w-prose mx-auto mt-4">
          Ці три аспекти є основою для створення гармонійного, комфортного і
          стильного простору.
        </p>
      </div>
      <div className="relative w-full lg:w-2/4 h-64 sm:h-80 md:h-96 lg:h-[300px] xl:h-[400px] mx-auto mb-20 md:mb-28 lg:mb-0">
        <Image
          src="/filament-bulbs.jpg"
          alt="Image 1"
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
        <div className="absolute w-1/2 h-3/4 bottom-[-50%] left-[5%] z-10">
          <Image
            src="/build-tools.png"
            alt="Image 2"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        <div className="absolute w-1/2 h-1/2 left-[65%] top-[115%] transform -translate-x-1/2 -translate-y-1/2 z-20">
          <Image
            src="/faucet.png"
            alt="Image 3"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
      </div>
      {/* 
      <div className=" relative w-full lg:w-2/4 h-64 sm:h-80 md:h-96 lg:h-[300px] xl:h-[400px]">
        <Image
          src="/filament-bulbs.jpg"
          alt="Image 1"
          layout="fill"
          objectFit="contain"
          // className="rounded-lg"
        />
        <div className="absolute w-1/2 h-3/4 -bottom-52 left-4 z-10">
          <Image
            src="/build-tools.png"
            alt="Image 2"
            layout="fill"
            objectFit="contain"
            // className="rounded-lg"
          />
        </div>
        <div className="absolute w-1/2 h-1/2 left-[65%] top-[115%]  transform -translate-x-1/2 -translate-y-1/2 z-20">
          <Image
            src="/faucet.png"
            alt="Image 3"
            layout="fill"
            objectFit="contain"
            // className="rounded-lg"
          />
        </div>
      </div> */}
      {/* <img src="filament-bulbs.jpg" alt="Image 1" className="w-full " />

        <img
          src="build-tools.png"
          alt="Image 2"
          className="w-1/2 h-3/4 object-cover  absolute -bottom-36 left-4 z-10"
        />
        <img
          src="/faucet.png"
          alt="Image 3"
          className="w-1/2 h-1/2 object-cover  absolute left-1/2 top-[100%] transform -translate-x-1 -translate-y-1/2 z-20"
        /> */}
    </div>
  );
};

export default AboutSection;
