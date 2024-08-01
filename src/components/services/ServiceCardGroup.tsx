import React from "react";
import ServiceCard from "./ServiceCard";
import { ServiceCardData } from "@/types/serviceTypes";

interface IServiceCardGroup {
  title: string;
  serviceCards: ServiceCardData[];
}

const ServiceCardGroup: React.FC<IServiceCardGroup> = ({
  title,
  serviceCards,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-medium mb-3">{title}</h2>
      <div className="flex flex-wrap justify-center">
        {serviceCards.map((card) => (
          <ServiceCard
            key={`${card.description}+${card.title}`}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceCardGroup;
