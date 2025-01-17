"use client";

import { useEffect } from "react";

import { getCookie, setCookie } from "cookies-next";

import {
  LANG_MATCHES_KEY,
  LangMatches,
} from "@/components/shared/LanguageToggler";

type DataType = {
  attributes?: {
    langMatches?: Record<string, string>;
  } | null;
};
interface UseLanguageMatchesParams {
  data?: Array<DataType>;
  type: keyof LangMatches;
}

export const useLangMatches = ({ data, type }: UseLanguageMatchesParams) => {
  useEffect(() => {
    const entity = data?.[0].attributes;

    if (entity?.langMatches) {
      const currentMatches = getCookie(LANG_MATCHES_KEY)
        ? JSON.parse(getCookie(LANG_MATCHES_KEY) as string)
        : {};
      setCookie(
        LANG_MATCHES_KEY,
        JSON.stringify({
          ...currentMatches,
          [type]: entity.langMatches,
        })
      );
    }
  }, [data, type]);
};
