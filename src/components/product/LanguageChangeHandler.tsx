"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { lngCookieName, prevLngCookieName } from "@/app/i18n/settings";
import CenteredSpinner from "../shared/CenteredSpinner";

interface LanguageChangeHandlerProps {
  productSlug: string;
  getTranslatedSlugs: (
    productSlug: string,
    prevLng: string,
    currentLng: string
  ) => Promise<{
    subcategorySlug: string;
    productTypeSlug: string;
    productSlug: string;
  } | null>;
}

export default function LanguageChangeHandler({
  productSlug,
  getTranslatedSlugs,
}: LanguageChangeHandlerProps) {
  const router = useRouter();
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  useEffect(() => {
    const handleLanguageChange = async () => {
      const currentLng = getCookie(lngCookieName);
      const prevLng = getCookie(prevLngCookieName);

      if (prevLng && currentLng && prevLng !== currentLng) {
        setIsChangingLanguage(true);

        console.log("Prev LNG:", prevLng, "Current lng:", currentLng);
        const translatedSlugs = await getTranslatedSlugs(
          productSlug,
          prevLng as string,
          currentLng as string
        );
        console.log(translatedSlugs);
        if (translatedSlugs) {
          const newPath = `/${currentLng}/${translatedSlugs.subcategorySlug}/${translatedSlugs.productTypeSlug}/${translatedSlugs.productSlug}`;
          router.push(newPath);
        } else {
          setIsChangingLanguage(false);
        }
      }
    };

    handleLanguageChange();
  }, [productSlug, getTranslatedSlugs, router]);

  if (isChangingLanguage) {
    return <CenteredSpinner />;
  }

  return null;
}
