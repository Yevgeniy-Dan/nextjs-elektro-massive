"use client";

import { useEffect } from "react";

import { setCookie } from "cookies-next";

import { LANG_MATCHES_KEY } from "@/app/utils/constants";

export const useLangMatches = (translatedPaths: Record<string, string>) => {
  useEffect(() => {
    setCookie(LANG_MATCHES_KEY, JSON.stringify({ ...translatedPaths }));
  }, [translatedPaths]);
};
