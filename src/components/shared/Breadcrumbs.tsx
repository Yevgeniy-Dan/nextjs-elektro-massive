"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { fallbackLng, Language, languages } from "@/app/i18n/settings";
import LocalizedLink from "./LocalizedLink";
import { useCookies } from "react-cookie";

interface BreadcrumbsProps {
  customLabels?: { [key: string]: string };
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ customLabels = {} }) => {
  const [cookies] = useCookies(["i18next"]);
  const lng = (cookies.i18next || fallbackLng) as Language;

  const pathname = usePathname();
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment && !languages.includes(segment));

  const handleBreadcrumbClick = (index: number, href: string) => {
    let eventAction =
      index === 0
        ? "Category"
        : index === 1
          ? "Subcategory"
          : index === 2
            ? "Product Type"
            : "Product";

    console.log("eventAction", eventAction);

    window.gtag("event", "navigation", {
      event_category: "Navigation",
      event_action: `${eventAction} Click`,
      event_label: pathSegments[index],
      page_path: href,
    });
  };

  // TODO: add lang support
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-sm mb-4 max-w-full overflow-x-auto"
    >
      <ol className="list-none p-0 inline-flex whitespace-nowrap min-w-0">
        <li className="flex items-center shrink-0">
          <LocalizedLink
            lng={lng}
            href="/"
            className="text-blue-500 hover:text-blue-600"
          >
            Головна
          </LocalizedLink>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          const label = customLabels[segment] || segment;

          return (
            <li key={segment} className="flex items-center shrink-0">
              <ChevronRight className="mx-2 h-4 w-4 text-gray-400 shrink-0" />
              {isLast ? (
                <span className="text-gray-500">{label}</span>
              ) : (
                <LocalizedLink
                  lng={lng}
                  href={href}
                  onClick={() => handleBreadcrumbClick(index, href)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  {label}
                </LocalizedLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
