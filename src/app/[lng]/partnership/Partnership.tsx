"use client";

import { useTranslation } from "@/app/i18n/client";
import { AWS_CDN_URL } from "@/app/utils/constants";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import OptimizedImage from "@/components/shared/OptimizedImage";
import React from "react";

interface PartnershipPageProps {
  params: { lng: string };
}

const PartnershipPageClient: React.FC<PartnershipPageProps> = ({
  params: { lng },
}) => {
  const { t } = useTranslation(lng, "partnership");

  const customLabels = {
    partnership: t("breadcrumb"),
  };

  return (
    <div className="py-5">
      <Breadcrumbs customLabels={customLabels} />
      <div className="bg-secondary-gradient-elektro-massive-vertical text-white  py-10 px-6   my-4 space-y-4 rounded-none  -mx-4 sm:-ml-10 md:-ml-16 lg:ml-0 ">
        <h1 className="text-lg md:text-xl lg:text-2xl">{t("title")}</h1>

        <p className="text-base md:text-lg lg:text-xl">{t("intro.0")}</p>
        <p className="text-base md:text-lg lg:text-xl">{t("intro.1")}</p>
      </div>
      <div className="">
        <div className="py-6">
          <h2 className="text-2xl font-bold mb-4">{t("advantages.title")}</h2>
          <div className=" max-w-4xl space-y-5">
            <div className="space-y-4">
              <div className="flex items-center space-x-6">
                <OptimizedImage
                  src={`${AWS_CDN_URL}shared/public/icons/great-quality.png`}
                  alt={`great-quality Icon`}
                  className="h-16 w-16 mx-auto "
                  width={64}
                  height={64}
                />
                <p className="flex-1 text-base md:text-lg lg:text-xl text-justify ">
                  <span className="font-bold">
                    {t("advantages.items.0.title")}
                  </span>{" "}
                  {t("advantages.items.0.description")}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-6">
                <OptimizedImage
                  src={`${AWS_CDN_URL}shared/public/icons/wide-range.png`}
                  alt={`wide-range Icon`}
                  className="h-16 w-16 mx-auto "
                  width={64}
                  height={64}
                />
                <p className="flex-1 text-base md:text-lg lg:text-xl text-justify ">
                  <span className="font-bold">
                    {t("advantages.items.1.title")}
                  </span>{" "}
                  {t("advantages.items.1.description")}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-6">
                <OptimizedImage
                  src={`${AWS_CDN_URL}shared/public/icons/certified-products.png`}
                  alt={`certified-products Icon`}
                  className="h-16 w-16 mx-auto "
                  width={64}
                  height={64}
                />
                <p className="flex-1 text-base md:text-lg lg:text-xl text-justify ">
                  <span className="font-bold">
                    {t("advantages.items.2.title")}
                  </span>{" "}
                  {t("advantages.items.2.description")}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-6">
                <OptimizedImage
                  src={`${AWS_CDN_URL}shared/public/icons/innovative-solutions.png`}
                  alt={`innovative-solutions Icon`}
                  className="h-16 w-16 mx-auto "
                  width={64}
                  height={64}
                />
                <p className="flex-1 text-base md:text-lg lg:text-xl text-justify ">
                  <span className="font-bold">
                    {t("advantages.items.3.title")}
                  </span>{" "}
                  {t("advantages.items.3.description")}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-6">
                <OptimizedImage
                  src={`${AWS_CDN_URL}shared/public/icons/reliable-partnership.png`}
                  alt={`reliable-partnership Icon`}
                  className="h-16 w-16 mx-auto "
                  width={64}
                  height={64}
                />
                <p className="flex-1 text-base md:text-lg lg:text-xl text-justify ">
                  <span className="font-bold">
                    {t("advantages.items.4.title")}
                  </span>
                  {t("advantages.items.4.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6">
          <h2 className="text-2xl font-bold mb-8">
            {t("cooperationTerms.title")}
          </h2>

          <div className="max-w-4xl space-y-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-12">
                <div className="relative w-1/3 h-36 md:h-48">
                  <div className="absolute -top-4 -right-4 w-full h-full bg-purple-600 -z-10 rounded-lg"></div>
                  <OptimizedImage
                    src={`${AWS_CDN_URL}shared/public/partnership/organizations.jpeg`}
                    alt={`trade-organizations Icon`}
                    className="h-64 w-64 mx-auto rounded-lg object-cover"
                    fill
                    sizes="33.333vw"
                  />
                </div>
                <div className="w-2/3">
                  <p className="text-base md:text-lg lg:text-xl">
                    <span className="font-bold">
                      {t("cooperationTerms.items.0.title")}
                    </span>{" "}
                    {t("cooperationTerms.items.0.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-12">
                <div className="relative w-1/3 h-36 md:h-48">
                  <div className="absolute -top-4 -right-4 w-full h-full bg-purple-600 -z-10 rounded-lg"></div>
                  <OptimizedImage
                    src={`${AWS_CDN_URL}shared/public/partnership/business-owner.jpg`}
                    alt={`business-owner Icon`}
                    className="h-64 w-64 mx-auto rounded-lg object-cover"
                    fill
                    sizes="(max-width: 768px) 33vw, 50vw"
                  />
                </div>

                <div className="w-2/3">
                  <p className="text-base md:text-lg lg:text-xl">
                    <span className="font-bold">
                      {t("cooperationTerms.items.1.title")}
                    </span>{" "}
                    {t("cooperationTerms.items.1.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="max-4-xl space-y-4">
              <div className="flex items-center space-x-12">
                <div className="relative w-1/3 h-36 md:h-48">
                  <div className="absolute -top-4 -right-4 w-full h-full bg-purple-600 -z-10 rounded-lg"></div>
                  <OptimizedImage
                    src={`${AWS_CDN_URL}shared/public/partnership/designers-and-design-bureaus.jpg`}
                    alt={`designers-and-design-bureaus Icon`}
                    className="h-64 w-64 mx-auto rounded-lg object-cover"
                    fill
                    sizes="(max-width: 576px) 33vw, 192px"
                  />
                </div>

                <div className="w-2/3">
                  <p className="text-base md:text-lg lg:text-xl">
                    <span className="font-bold">
                      {t("cooperationTerms.items.2.title")}
                    </span>{" "}
                    {t("cooperationTerms.items.2.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnershipPageClient;
