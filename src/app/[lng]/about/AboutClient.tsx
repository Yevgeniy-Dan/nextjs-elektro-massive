"use client";

import React from "react";

import { useTranslation } from "@/app/i18n/client";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import OptimizedImage from "@/components/shared/OptimizedImage";
import { AWS_CDN_URL } from "@/app/utils/constants";
import { useLangMatches } from "@/hooks/useLangMatches";
import { AvailableLanguages } from "@/components/shared/LanguageToggler";

interface AboutPageProps {
  params: { lng: string };
  fullTranslatedPath: Record<AvailableLanguages, string>;
}

const AboutPageClient: React.FC<AboutPageProps> = ({
  params: { lng },
  fullTranslatedPath,
}) => {
  useLangMatches(fullTranslatedPath);
  const { t } = useTranslation(lng, "about");

  const customLabels = {
    about: t("breadcrumb"),
  };

  return (
    <div className="py-5">
      <Breadcrumbs customLabels={customLabels} />
      <div>
        <h1 className="text-lg md:text-xl lg:text-2xl uppercase py-5">
          {t("title")}
        </h1>

        <p className="text-base md:text-lg lg:text-xl">{t("intro")}</p>
      </div>
      <div className="flex flex-col items-start  my-10 pb-0  xl:pb-32 ">
        <div className="w-full  mb-8 relative">
          {/* ABOUT COMPANY */}
          <div className="flex flex-col md:flex-row items-center justify-between  relative mt-10  h-auto space-y-3">
            <div className="w-full md:w-1/2">
              <p className="flex flex-col items-center bg-gray-200 text-gray-950 font-thin  text-sm sm:text-lg text-justify     overflow-hidden rounded-2xl">
                <span className="block w-full text-center uppercase border border-b-8 border-b-white py-4 text-3xl font-semibold">
                  {t("sections.aboutCompany.title")}
                </span>
                <span className="px-16 py-5 sm:px-16">
                  {t("sections.aboutCompany.content")}
                </span>
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative aspect-video w-full h-full">
                <OptimizedImage
                  src={`${AWS_CDN_URL}shared/public/about/about_company.png`}
                  alt="Image 1"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className=" object-contain rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Development */}
          <div className="flex flex-col md:flex-row items-center justify-between  relative mt-10  h-auto ">
            <div className="w-full md:w-1/2  my-4 md:my-0">
              <div className="relative aspect-video w-full h-full">
                <OptimizedImage
                  src={`${AWS_CDN_URL}shared/public/about/development.jpg`}
                  alt="Image 1"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className=" object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <p className="flex flex-col items-center bg-gray-200 text-gray-950 font-thin  text-sm sm:text-lg text-justify overflow-hidden rounded-2xl">
                <span className="block w-full text-center uppercase border border-b-8 border-b-white py-4 text-3xl font-semibold">
                  {t("sections.development.title")}
                </span>
                <span className="px-16 py-5 sm:px-16">
                  {t("sections.development.content")}
                </span>
              </p>
            </div>
          </div>

          {/* Achievments */}
          <div className="flex justify-between  relative mt-10  h-auto ">
            <p className="flex flex-col items-center bg-gray-200 text-gray-950 font-thin  text-sm sm:text-lg text-justify max-w-prose  w-2/5  overflow-hidden rounded-2xl">
              <span className="block w-full text-center uppercase border border-b-8 border-b-white py-4 text-3xl font-semibold">
                {t("sections.achievements.title")}
              </span>
              <span className="px-16 py-5 sm:px-16">
                {t("sections.achievements.content")}
              </span>
            </p>
            <div className="relative w-3/5 -my-2 rounded-xl">
              <OptimizedImage
                src={`${AWS_CDN_URL}shared/public/about/achievments.jpg`}
                alt="Image 1"
                fill
                sizes="60vw"
                className=" object-cover rounded-xl"
              />
            </div>
          </div>

          {/* INNOVATIONS AND THE FUTURE */}
          <div className="flex justify-between  relative mt-10  h-auto ">
            <div className="relative w-3/5 -my-2 rounded-xl">
              <OptimizedImage
                src={`${AWS_CDN_URL}shared/public/about/innovations.jpg`}
                alt="Image 1"
                fill
                sizes="60vw"
                className=" object-cover rounded-xl"
              />
            </div>
            <p className="flex flex-col items-center bg-gray-200 text-gray-950 font-thin  text-sm sm:text-lg text-justify max-w-prose  w-2/5  overflow-hidden rounded-2xl">
              <span className="block w-full text-center uppercase border border-b-8 border-b-white py-4 text-3xl font-semibold">
                {t("sections.innovationsAndFuture.title")}
              </span>
              <span className="px-16 py-5 sm:px-16">
                {t("sections.innovationsAndFuture.content")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPageClient;
