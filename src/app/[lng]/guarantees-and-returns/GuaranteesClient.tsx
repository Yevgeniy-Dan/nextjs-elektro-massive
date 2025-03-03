"use client";

import { useTranslation } from "@/app/i18n/client";
import { AWS_CDN_URL } from "@/app/utils/constants";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import OptimizedImage from "@/components/shared/OptimizedImage";

interface GuaranteeReturnsProps {
  params: {
    lng: string;
  };
}

interface Section {
  title: string;
  content: string | string[];
  subsections?: Subsection[];
  conditions?: string[];
  cases?: string[];
  note?: string;
}

interface Subsection {
  title: string;
  content: string | string[];
}

const GuaranteeReturnsPageClient: React.FC<GuaranteeReturnsProps> = ({
  params: { lng },
}) => {
  const { t } = useTranslation(lng, "guaranteesReturns");

  const customLabels = {
    "guarantees-and-returns": t("breadcrumb"),
  };

  const sections = t("sections", { returnObjects: true }) as Section[];

  const renderContent = (content: string | string[] | undefined) => {
    if (!content) return null;
    if (typeof content === "string") {
      return <p className="text-base lg:text-lg">{content}</p>;
    }
    return content.map((paragraph, index) => (
      <p key={index} className="text-base lg:text-lg">
        {paragraph}
      </p>
    ));
  };

  const renderSubsections = (subsections: Subsection[] | undefined) => {
    if (!subsections) return null;
    return subsections.map((subsection, index) => (
      <div key={index}>
        <h4 className="text-base lg:text-lg font-medium my-3">
          {subsection.title}
        </h4>
        {renderContent(subsection.content)}
      </div>
    ));
  };

  const renderList = (items: string[] | undefined) => {
    if (!items) return null;
    return (
      <ul className="text-base lg:text-lg list-disc pl-5">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="py-5">
      <Breadcrumbs customLabels={customLabels} />
      <div className="flex items-start">
        <div className="w-full md:max-w-5xl bg-gray-200 text-gray-950 font-thin rounded-2xl relative">
          <h1 className="text-lg sm:text-2xl overflow-hidden border border-b-8 border-b-[#990000] p-4 font-semibold rounded-t-2xl">
            {t("title")}
          </h1>
          <div className="p-5">
            {sections &&
              sections.map((section: Section, index: number) => (
                <div key={index}>
                  <h3 className="text-base sm:text-lg xl:text-xl font-semibold py-4">
                    {section.title}
                  </h3>
                  {renderContent(section.content)}
                  {renderSubsections(section.subsections)}
                  {renderList(section.conditions)}
                  {renderList(section.cases)}
                  {section.note && (
                    <p className="text-base lg:text-lg">{section.note}</p>
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="mt-[60%] -ml-2 sm:-ml-4 md:-ml-6 lg:-ml-8">
          <OptimizedImage
            src={`${AWS_CDN_URL}shared/public/payment_delivery/Е.png`}
            alt="E sign icon"
            width={200}
            height={200}
            className="w-16 h-16 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-52 lg:h-52"
          />
        </div>
      </div>
    </div>
  );
};

export default GuaranteeReturnsPageClient;
