"use client";

import { fallbackLng, Language } from "@/app/i18n/settings";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";

import { useCartStore } from "@/store/useCartStore";

export const useSingInMergeCart = () => {
  const [cookies] = useCookies(["i18next"]);
  const currentLanguage = (cookies.i18next || fallbackLng) as Language;
  const { status } = useSession();
  const { syncCartWithServer } = useCartStore();
  const hasSynced = useRef(false);

  useEffect(() => {
    if (status === "authenticated" && !hasSynced.current) {
      syncCartWithServer(currentLanguage);
      hasSynced.current = true;
    }
  }, [status, syncCartWithServer, currentLanguage]);
};
