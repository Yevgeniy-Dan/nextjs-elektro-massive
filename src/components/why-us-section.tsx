import Image from "next/image";
import React from "react";

const WhyUsSection = () => {
  return (
    <div className="bg-gray-800 py-10 my-10 flex justify-around -ml-10 rounded-r-3xl">
      <div className="text-center text-white">
        <Image
          src="/collaboration.png"
          alt="colloboration Icon"
          className="h-16 w-16 mx-auto mb-2 invert"
          width={64}
          height={64}
        />
        <span>Вигодні умови співпраці</span>
      </div>
      <div className="text-center text-white">
        <Image
          src="/blueprint.png"
          alt="Blueprint Icon"
          className="h-16 w-16 mx-auto mb-2 invert"
          width={64}
          height={64}
        />
        <span>Розрахунок проекту освітлення</span>
      </div>
      <div className="text-center text-white">
        <Image
          src="/idea.png"
          alt="Idea Icon"
          className="h-16 w-16 mx-auto mb-2 invert"
          width={64}
          height={64}
        />
        <span>Оригінальні рішення</span>
      </div>
      <div className="text-center text-white">
        <Image
          src="/quality.png"
          alt="Quality Icon"
          className="h-16 w-16 mx-auto mb-2 invert"
          width={64}
          height={64}
        />
        <span>Гарантія якості</span>
      </div>
    </div>
  );
};

export default WhyUsSection;
