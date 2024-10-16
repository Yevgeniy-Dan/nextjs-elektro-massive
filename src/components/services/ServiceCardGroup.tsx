import React from "react";
import ServiceCard from "./ServiceCard";
import { ServiceCardData } from "@/types/serviceTypes";

interface IServiceCardGroup {
  title: string;
  cartFooterText: string;
  serviceCards: ServiceCardData[];
}

const ServiceCardGroup: React.FC<IServiceCardGroup> = ({
  title,
  cartFooterText,
  serviceCards,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-medium mb-3">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {serviceCards.map((card) => (
          <ServiceCard
            key={`${card.description}+${card.title}`}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            cartFooterText={cartFooterText}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceCardGroup;
