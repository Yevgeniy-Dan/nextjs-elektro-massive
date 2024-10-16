"use client";

import { useTranslation } from "@/app/i18n/client";
import ServiceCardGroup from "@/components/services/ServiceCardGroup";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import serviceData from "@/data/serviceData";
import React, { useEffect } from "react";

interface ServicePageProps {
  params: {
    lng: string;
  };
}

const ServicePage: React.FC<ServicePageProps> = ({ params: { lng } }) => {
  const { t, i18n } = useTranslation(lng, "services");

  const customLabels = {
    services: t("breadcrumbs.services"),
  };

  return (
    <div className="pt-4">
      <Breadcrumbs customLabels={customLabels} />
      <h1 className="text-3xl font-bold my-8 ">{t("pageTitle")}</h1>
      <div className="space-y-8 mb-8">
        <ServiceCardGroup
          title={t("serviceGroups.electrical.title")}
          cartFooterText={t("serviceGroups.cardFooter")}
          serviceCards={
            t("serviceGroups.electrical.services", {
              returnObjects: true,
            }) as any[]
          }
        />
        <ServiceCardGroup
          title={t("serviceGroups.construction.title")}
          cartFooterText={t("serviceGroups.cardFooter")}
          serviceCards={
            t("serviceGroups.construction.services", {
              returnObjects: true,
            }) as any[]
          }
        />
        <ServiceCardGroup
          title={t("serviceGroups.plumbing.title")}
          cartFooterText={t("serviceGroups.cardFooter")}
          serviceCards={
            t("serviceGroups.plumbing.services", {
              returnObjects: true,
            }) as any[]
          }
        />
      </div>
    </div>
  );
};

export default ServicePage;
