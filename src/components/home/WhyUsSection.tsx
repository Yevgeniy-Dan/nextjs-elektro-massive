import React from "react";
import OptimizedImage from "../shared/OptimizedImage";

const features = [
  { icon: "/collaboration.png", text: "Вигідні умови співпраці" },
  { icon: "/blueprint.png", text: "Розрахунок проекту освітлення" },
  { icon: "/idea.png", text: "Оригінальні рішення" },
  { icon: "/quality.png", text: "Гарантія якості" },
];

const WhyUsSection = () => {
  return (
    <div className="bg-gray-800 py-10 my-10 flex justify-around rounded-none sm:rounded-r-3xl xl:rounded-3xl -mx-4 sm:-ml-10 md:-ml-16 lg:ml-0">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center  text-white"
          >
            <OptimizedImage
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
