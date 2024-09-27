import ServiceCardGroup from "@/components/services/ServiceCardGroup";
import serviceData from "@/data/serviceData";
import React from "react";

const ServicePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold my-8 ">Послуги</h1>
      <div className="space-y-8 mb-8">
        <ServiceCardGroup
          title="Електричні послуги"
          serviceCards={serviceData.electricalServiceCards}
        />
        <ServiceCardGroup
          title="Будівельні послуги"
          serviceCards={serviceData.futureServiceCards}
        />
        <ServiceCardGroup
          title="Сантехнічні послуги"
          serviceCards={serviceData.plumbingServiceCards}
        />
      </div>
    </div>
  );
};

export default ServicePage;
