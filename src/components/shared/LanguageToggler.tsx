"use client";

import React from "react";

import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

import { languages } from "@/app/i18n/settings";

export const LANG_MATCHES_KEY = "langMatches";

type AvailableLanguages = (typeof languages)[number];
export interface LangMatches {
  category?: {
    [K in AvailableLanguages]?: string;
  };
  subcategory?: {
    [K in AvailableLanguages]?: string;
  };
  productType?: {
    [K in AvailableLanguages]?: string;
  };
  product?: {
    [K in AvailableLanguages]?: string;
  };
}

interface LanguageTogglerProps {
  lng: string;
}

const LanguageToggler: React.FC<LanguageTogglerProps> = ({ lng }) => {
  const router = useRouter();
  const pathname = usePathname();

  const getSlugs = (lang: string, langMatches: LangMatches, limit: number) => {
    const levels: (keyof LangMatches)[] = [
      "category",
      "subcategory",
      "productType",
      "product",
    ];

    return levels
      .slice(0, limit)
      .map((level) => {
        const translations = langMatches[level];
        if (!translations) return null;
        return translations[(lang || "uk") as AvailableLanguages];
      })
      .filter((slug): slug is string => Boolean(slug))
      .join("/");
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLang = event.target.value;
    const currentPathname = pathname;
    const pathWithoutLang = currentPathname.replace(new RegExp(`^/${lng}`), "");

    const langMatchesCookie = getCookie(LANG_MATCHES_KEY);
    if (langMatchesCookie) {
      try {
        const pathParts = pathWithoutLang.split("/").filter(Boolean);
        const langMatches = JSON.parse(langMatchesCookie) as LangMatches;
        let translatedPath = getSlugs(newLang, langMatches, pathParts.length);

        if (translatedPath) {
          const newPath = `/${newLang}/${translatedPath}`;
          router.push(newPath);
          return;
        }
      } catch (error) {
        console.error("Error parsing langMatches cookie: ", error);
      }
    }

    const newPath = `/${newLang}${pathWithoutLang || "/"}`.replace(/\/+/g, "/");
    router.push(newPath);
    return;
  };

  return (
    <div className="relative flex items-center ">
      <select
        value={lng}
        onChange={handleLanguageChange}
        className="border border-white px-1 sm:px-3 py-1 sm:py-2 bg-transparent hover:bg-gray-800 hover:border-gray-300 transition-all duration-300 appearance-none outline-none"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageToggler;
