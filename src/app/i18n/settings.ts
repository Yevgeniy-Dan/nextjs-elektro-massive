export const fallbackLng = "uk";
// export const languages = [fallbackLng, "ru"];
export const languages = ["uk"];
export const defaultNS = "header";
export const lngCookieName = "i18next";
export const prevLngCookieName = "i18nextPrevLng";

export type Language = (typeof languages)[number];

type I18nextOptions = {
  supportedLngs: readonly string[];
  fallbackLng: string;
  lng: string;
  fallbackNS: string;
  defaultNS: string;
  ns: string;
};

export function getOptions(
  lng: Language = fallbackLng,
  ns: string = defaultNS
): I18nextOptions {
  return {
    //debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
