import Image from "next/image";
import React from "react";

const features = [
  { icon: "/collaboration.png", text: "Вигодні умови співпраці" },
  { icon: "/blueprint.png", text: "Розрахунок проекту освітлення" },
  { icon: "/idea.png", text: "Оригінальні рішення" },
  { icon: "/quality.png", text: "Гарантія якості" },
];

const WhyUsSection = () => {
  return (
    <div className="bg-gray-800 py-10 my-10 flex justify-around xl:ml-0 -ml-16 rounded-r-3xl xl:rounded-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="text-center text-white">
            <Image
              src={feature.icon}
              alt={`${feature.text} Icon`}
              className="h-16 w-16 mx-auto mb-4 invert"
              width={64}
              height={64}
            />
            <span className="text-sm sm:text-base">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUsSection;
