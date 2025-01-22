"use client";

import React from "react";

import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

import { languages } from "@/app/i18n/settings";
import { LANG_MATCHES_KEY } from "@/app/utils/constants";

export type AvailableLanguages = (typeof languages)[number];

interface LanguageTogglerProps {
  lng: string;
}

type LangMatches = {
  [key in AvailableLanguages]: string;
};

const LanguageToggler: React.FC<LanguageTogglerProps> = ({ lng }) => {
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Retrieves the translated path for the specified language from langMatches.
   * @param lang - Target language
   * @param langMatches - Object containing language matches
   * @returns The translated path or an empty string
   */
  const getSlug = (lang: string, langMatches: LangMatches) => {
    return langMatches[lang] || "";
  };

  /**
   * Handles language change.
   * Redirects the user to the translated path if it exists;
   * otherwise, generates a fallback path based on the current one.
   * @param event - Change event from the select element
   * @returns {void}
   */
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const newLang = event.target.value;
    const currentPathname = pathname;
    const pathWithoutLang = currentPathname.replace(new RegExp(`^/${lng}`), ""); // Remove the current language prefix from the path

    const langMatchesCookie = getCookie(LANG_MATCHES_KEY);
    if (langMatchesCookie) {
      try {
        const langMatches = JSON.parse(langMatchesCookie) as LangMatches;
        let translatedPath = getSlug(newLang, langMatches);

        if (translatedPath) {
          const newPath = `/${newLang}/${translatedPath}`;
          router.push(newPath);
          return;
        }
      } catch (error) {
        console.error("Error parsing langMatches cookie: ", error);
      }
    }

    // If no translation is available, create a fallback path
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
