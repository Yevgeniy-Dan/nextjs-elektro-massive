"use client";

import ServiceCardGroup from "@/components/services/ServiceCardGroup";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import serviceData from "@/data/serviceData";
import React from "react";

const ServicePage = () => {
  const customLabels = {
    services: "Послуги",
  };

  return (
    <div className="pt-4">
      <Breadcrumbs customLabels={customLabels} />
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
