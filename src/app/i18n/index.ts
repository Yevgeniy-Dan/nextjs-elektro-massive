import { createInstance, i18n, TFunction } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions, Language } from "./settings";

const init18next = async (
  lng: Language,
  ns: string | string[]
): Promise<i18n> => {
  const i18instance = createInstance();
  await i18instance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/app/i18n/locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, Array.isArray(ns) ? ns[0] : ns));

  return i18instance;
};

export interface useTranslationOptions {
  keyPrefix?: string;
}

export interface TranslationResult {
  t: TFunction;
  i18n: i18n;
}

export async function useTranslation(
  lng: Language,
  ns: string | string[],
  options: useTranslationOptions = {}
): Promise<TranslationResult> {
  const i18nextInstance = await init18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),
    i18n: i18nextInstance,
  };
}
